import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface ContactInquiryRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

// In-memory fallback cache for localhost development when MySQL is offline
let inMemoryInquiries: any[] = [
  {
    id: 1,
    name: 'Rajesh Kumar M',
    email: 'rajesh.k@example.com',
    phone: '+91 94432 09876',
    subject: 'Hostel and Transport Facility Enquiry',
    message: 'Wanted details regarding bus routes from Thiruvananthapuram and hostel accommodation fees.',
    source: 'contact_page',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 2,
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@example.com',
    phone: '+91 98401 22334',
    subject: 'First Graduate Scholarship Eligibility',
    message: 'Is First Graduate concession applicable for B.E CSE under government quota? Please guide us.',
    source: 'footer',
    status: 'in_progress',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 3,
    name: 'Stephan Paul',
    email: 'stephan.p@example.com',
    phone: '+91 97890 33445',
    subject: 'Direct Lateral Entry Admission 2026',
    message: 'Completed Diploma in Mechanical Engineering with 87%. Seeking direct 2nd year B.E admission.',
    source: 'quick_inquiry',
    status: 'new',
    created_at: new Date().toISOString(),
  },
];

export async function submitContactInquiry(req: Request, res: Response) {
  console.log('[Backend] Request received: POST /api/contact');
  try {
    const {
      name,
      email = '',
      phone = '',
      subject = 'General Inquiry',
      message = 'Admissions / Course Inquiry',
      source = 'quick_inquiry',
    } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name and at least one contact method (email or phone) are required.',
      });
    }

    try {
      const result = await executeQuery<ResultSetHeader>(
        `INSERT INTO contact_inquiries (name, email, phone, subject, message, source, status)
         VALUES (?, ?, ?, ?, ?, ?, 'new')`,
        [name.trim(), email.trim(), phone.trim(), subject.trim(), message.trim(), source]
      );

      console.log('[Backend] ✅ Data successfully inserted into MySQL (contact_inquiries). insertId:', result.insertId);

      const newRecord = {
        id: result.insertId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        source,
        status: 'new',
        created_at: new Date().toISOString(),
      };
      inMemoryInquiries = [newRecord, ...inMemoryInquiries];

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your inquiry has been submitted and stored in MySQL successfully.',
        inquiryId: result.insertId,
      });
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL unavailable, saving contact inquiry to memory fallback:', mysqlErr.message);
      const fallbackId = Date.now();
      const fallbackRecord = {
        id: fallbackId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        source,
        status: 'new',
        created_at: new Date().toISOString(),
      };
      inMemoryInquiries = [fallbackRecord, ...inMemoryInquiries];

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your inquiry has been submitted successfully (saved in server memory).',
        inquiryId: fallbackId,
      });
    }
  } catch (error: any) {
    console.error('[Backend] ❌ Failed to process contact inquiry:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to process inquiry',
      error: error.message,
    });
  }
}

export async function getAllInquiries(_req: Request, res: Response) {
  try {
    try {
      const rows = await executeQuery<ContactInquiryRow[]>(
        'SELECT * FROM contact_inquiries ORDER BY created_at DESC'
      );
      if (rows && rows.length > 0) {
        return res.json({ success: true, count: rows.length, data: rows });
      }
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL query failed, using in-memory inquiries fallback:', mysqlErr.message);
    }

    return res.json({
      success: true,
      count: inMemoryInquiries.length,
      data: inMemoryInquiries,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      count: inMemoryInquiries.length,
      data: inMemoryInquiries,
    });
  }
}

export async function updateInquiryStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in_progress', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    inMemoryInquiries = inMemoryInquiries.map((item) =>
      String(item.id) === String(id) ? { ...item, status } : item
    );

    try {
      await executeQuery<ResultSetHeader>(
        'UPDATE contact_inquiries SET status = ? WHERE id = ?',
        [status, id]
      );
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL update failed, updated in memory:', mysqlErr.message);
    }

    return res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status',
      error: error.message,
    });
  }
}

export async function deleteInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    inMemoryInquiries = inMemoryInquiries.filter((item) => String(item.id) !== String(id));

    try {
      await executeQuery<ResultSetHeader>(
        'DELETE FROM contact_inquiries WHERE id = ?',
        [id]
      );
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL delete failed, removed from memory:', mysqlErr.message);
    }

    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry',
      error: error.message,
    });
  }
}
