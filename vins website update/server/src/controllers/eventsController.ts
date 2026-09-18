import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface EventRow extends RowDataPacket {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date_str: string;
  image_path: string;
  description?: string;
  chief_guest?: string;
  created_at: string;
}

function formatEvent(r: EventRow) {
  return {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle || null,
    category: r.category,
    date: r.date_str,
    imagePath: r.image_path,
    description: r.description || null,
    chiefGuest: r.chief_guest || null,
  };
}

export async function getAllEvents(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<EventRow[]>(
      'SELECT * FROM college_events ORDER BY created_at DESC'
    );
    const data = rows.map(formatEvent);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch events from MySQL',
      error: error.message,
    });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const rows = await executeQuery<EventRow[]>(
      'SELECT * FROM college_events WHERE id = ? LIMIT 1',
      [req.params.id]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    return res.json({ success: true, data: formatEvent(rows[0]) });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch event', error: error.message });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const { title, subtitle, category = 'Ceremony', date, imagePath, description, chiefGuest } = req.body;
    if (!title || !imagePath) {
      return res.status(400).json({ success: false, message: 'Title and imagePath are required' });
    }
    const id = `evt-${Date.now()}`;
    const dateStr = date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    await executeQuery<ResultSetHeader>(
      `INSERT INTO college_events (id, title, subtitle, category, date_str, image_path, description, chief_guest)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, subtitle || null, category, dateStr, imagePath, description || null, chiefGuest || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Event created successfully in MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // First, fetch existing record so we can preserve fields not sent
    const existing = await executeQuery<EventRow[]>(
      'SELECT * FROM college_events WHERE id = ? LIMIT 1',
      [id]
    );
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const current = existing[0];

    const { title, subtitle, category, date, imagePath, description, chiefGuest } = req.body;

    // Use incoming value if defined and non-empty; fall back to existing DB value
    const newTitle       = (title       !== undefined && title       !== null && title       !== '') ? title       : current.title;
    const newSubtitle    = (subtitle    !== undefined && subtitle    !== null)                        ? subtitle    : current.subtitle;
    const newCategory    = (category    !== undefined && category    !== null && category    !== '') ? category    : current.category;
    const newDateStr     = (date        !== undefined && date        !== null && date        !== '') ? date        : current.date_str;
    // For imagePath: preserve existing if incoming is empty/null/undefined
    const newImagePath   = (imagePath   !== undefined && imagePath   !== null && imagePath   !== '') ? imagePath   : current.image_path;
    const newDescription = (description !== undefined && description !== null)                        ? description : current.description;
    const newChiefGuest  = (chiefGuest  !== undefined && chiefGuest  !== null)                        ? chiefGuest  : current.chief_guest;

    await executeQuery<ResultSetHeader>(
      `UPDATE college_events SET
         title       = ?,
         subtitle    = ?,
         category    = ?,
         date_str    = ?,
         image_path  = ?,
         description = ?,
         chief_guest = ?,
         updated_at  = NOW()
       WHERE id = ?`,
      [newTitle, newSubtitle, newCategory, newDateStr, newImagePath, newDescription, newChiefGuest, id]
    );

    return res.json({ success: true, message: 'Event updated in MySQL', id });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message,
    });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM college_events WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Event deleted from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message,
    });
  }
}
