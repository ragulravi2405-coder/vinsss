import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface NotificationRow extends RowDataPacket {
  id: string;
  title: string;
  date_str: string;
  category: string;
  is_new: number | boolean;
  is_urgent: number | boolean;
  summary: string;
  full_details: string;
  issued_by: string;
  pdf_attachment_id?: string;
  pdf_title?: string;
  pdf_filename?: string;
  pdf_path?: string;
  pdf_size?: string;
  pdf_type?: string;
  external_link?: string;
  created_at?: string;
}

function formatNotification(row: NotificationRow) {
  return {
    id: row.id,
    title: row.title,
    date: row.date_str,
    category: row.category,
    isNew: Boolean(row.is_new),
    isUrgent: Boolean(row.is_urgent),
    summary: row.summary,
    fullDetails: row.full_details,
    issuedBy: row.issued_by,
    externalLink: row.external_link || null,
    pdfAttachment: row.pdf_path
      ? {
          id: row.pdf_attachment_id || `pdf-${row.id}`,
          title: row.pdf_title || row.title,
          filename: row.pdf_filename || 'document.pdf',
          path: row.pdf_path,
          fileSize: row.pdf_size || '1.5 MB',
          fileType: row.pdf_type || 'PDF',
        }
      : null,
  };
}

export async function getAllNotifications(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<NotificationRow[]>(
      'SELECT * FROM notifications ORDER BY created_at DESC'
    );
    const data = rows.map(formatNotification);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications from MySQL',
      error: error.message,
    });
  }
}

export async function getNotificationById(req: Request, res: Response) {
  try {
    const rows = await executeQuery<NotificationRow[]>(
      'SELECT * FROM notifications WHERE id = ? LIMIT 1',
      [req.params.id]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    return res.json({ success: true, data: formatNotification(rows[0]) });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching notification',
      error: error.message,
    });
  }
}

export async function createNotification(req: Request, res: Response) {
  try {
    const {
      title,
      date,
      category = 'Circulars',
      isUrgent = false,
      summary,
      fullDetails,
      issuedBy = 'Principal Office & Admissions',
      pdfAttachment,
      externalLink,
    } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Title and summary are required fields' });
    }

    const id = `notif-${Date.now()}`;
    const dateStr = date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    await executeQuery<ResultSetHeader>(
      `INSERT INTO notifications 
       (id, title, date_str, category, is_new, is_urgent, summary, full_details, issued_by, pdf_attachment_id, pdf_title, pdf_filename, pdf_path, pdf_size, pdf_type, external_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        dateStr,
        category,
        1,
        isUrgent ? 1 : 0,
        summary,
        fullDetails || summary,
        issuedBy,
        pdfAttachment?.id || null,
        pdfAttachment?.title || null,
        pdfAttachment?.filename || null,
        pdfAttachment?.path || null,
        pdfAttachment?.fileSize || null,
        pdfAttachment?.fileType || 'PDF',
        externalLink || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Notification created successfully in MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message,
    });
  }
}

export async function updateNotification(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Fetch existing record to preserve fields not changed
    const existing = await executeQuery<NotificationRow[]>(
      'SELECT * FROM notifications WHERE id = ? LIMIT 1',
      [id]
    );
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    const current = existing[0];

    const { title, date, category, isUrgent, summary, fullDetails, issuedBy, pdfAttachment, externalLink } = req.body;

    const newTitle       = (title       !== undefined && title       !== null && title       !== '') ? title       : current.title;
    const newDate        = (date        !== undefined && date        !== null && date        !== '') ? date        : current.date_str;
    const newCategory    = (category    !== undefined && category    !== null && category    !== '') ? category    : current.category;
    const newIsUrgent    =  isUrgent    !== undefined                                                ? (isUrgent ? 1 : 0) : current.is_urgent;
    const newSummary     = (summary     !== undefined && summary     !== null && summary     !== '') ? summary     : current.summary;
    const newFullDetails = (fullDetails !== undefined && fullDetails !== null && fullDetails !== '') ? fullDetails : current.full_details;
    const newIssuedBy    = (issuedBy    !== undefined && issuedBy    !== null && issuedBy    !== '') ? issuedBy    : current.issued_by;
    const newExternalLink = (externalLink !== undefined && externalLink !== null)                    ? externalLink : current.external_link;

    // PDF attachment: preserve existing if no new attachment provided
    const newPdfId       = pdfAttachment ? (pdfAttachment.id       || current.pdf_attachment_id) : current.pdf_attachment_id;
    const newPdfTitle    = pdfAttachment ? (pdfAttachment.title    || current.pdf_title)          : current.pdf_title;
    const newPdfFilename = pdfAttachment ? (pdfAttachment.filename || current.pdf_filename)        : current.pdf_filename;
    // Preserve existing pdf path if not changed
    const newPdfPath     = pdfAttachment
      ? ((pdfAttachment.path !== undefined && pdfAttachment.path !== null && pdfAttachment.path !== '') ? pdfAttachment.path : current.pdf_path)
      : current.pdf_path;
    const newPdfSize     = pdfAttachment ? (pdfAttachment.fileSize || current.pdf_size)           : current.pdf_size;
    const newPdfType     = pdfAttachment ? (pdfAttachment.fileType || current.pdf_type)           : current.pdf_type;

    await executeQuery<ResultSetHeader>(
      `UPDATE notifications SET
         title             = ?,
         date_str          = ?,
         category          = ?,
         is_urgent         = ?,
         summary           = ?,
         full_details      = ?,
         issued_by         = ?,
         pdf_attachment_id = ?,
         pdf_title         = ?,
         pdf_filename      = ?,
         pdf_path          = ?,
         pdf_size          = ?,
         pdf_type          = ?,
         external_link     = ?
       WHERE id = ?`,
      [
        newTitle, newDate, newCategory, newIsUrgent,
        newSummary, newFullDetails, newIssuedBy,
        newPdfId, newPdfTitle, newPdfFilename, newPdfPath, newPdfSize, newPdfType,
        newExternalLink,
        id,
      ]
    );

    return res.json({ success: true, message: 'Notification updated successfully in MySQL', id });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message,
    });
  }
}

export async function deleteNotification(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Notification deleted successfully from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message,
    });
  }
}
