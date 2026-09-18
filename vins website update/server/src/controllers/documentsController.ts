import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface DocumentRow extends RowDataPacket {
  id: string;
  title: string;
  filename: string;
  path: string;
  file_size: string;
  file_type: string;
  category: string;
  description?: string;
  created_at: string;
}

function formatDocument(r: DocumentRow) {
  return {
    id: r.id,
    title: r.title,
    filename: r.filename,
    path: r.path,
    fileSize: r.file_size,
    fileType: r.file_type,
    category: r.category,
    description: r.description || null,
  };
}

export async function getAllDocuments(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<DocumentRow[]>(
      'SELECT * FROM documents ORDER BY created_at DESC'
    );
    const data = rows.map(formatDocument);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch documents from MySQL',
      error: error.message,
    });
  }
}

export async function createDocument(req: Request, res: Response) {
  try {
    const { title, filename, path, fileSize = '1.5 MB', fileType = 'PDF', category = 'Official Documents', description } = req.body;
    if (!title || !path) {
      return res.status(400).json({ success: false, message: 'Title and path are required' });
    }
    const id = `doc-${Date.now()}`;
    const fname = filename || `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;

    await executeQuery<ResultSetHeader>(
      `INSERT INTO documents (id, title, filename, path, file_size, file_type, category, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, fname, path, fileSize, fileType, category, description || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Document saved to MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to save document',
      error: error.message,
    });
  }
}

export async function updateDocument(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Fetch existing record to preserve path/file if not changed
    const existing = await executeQuery<DocumentRow[]>(
      'SELECT * FROM documents WHERE id = ? LIMIT 1',
      [id]
    );
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    const current = existing[0];

    const { title, filename, path, fileSize, fileType, category, description } = req.body;

    const newTitle       = (title    !== undefined && title    !== null && title    !== '') ? title    : current.title;
    const newFilename    = (filename !== undefined && filename !== null && filename !== '') ? filename : current.filename;
    // Preserve existing path if incoming is empty/null/undefined (file path = document URL)
    const newPath        = (path     !== undefined && path     !== null && path     !== '') ? path     : current.path;
    const newFileSize    = (fileSize !== undefined && fileSize !== null && fileSize !== '') ? fileSize : current.file_size;
    const newFileType    = (fileType !== undefined && fileType !== null && fileType !== '') ? fileType : current.file_type;
    const newCategory    = (category !== undefined && category !== null && category !== '') ? category : current.category;
    const newDescription = (description !== undefined && description !== null)              ? description : current.description;

    await executeQuery<ResultSetHeader>(
      `UPDATE documents SET
         title       = ?,
         filename    = ?,
         path        = ?,
         file_size   = ?,
         file_type   = ?,
         category    = ?,
         description = ?
       WHERE id = ?`,
      [newTitle, newFilename, newPath, newFileSize, newFileType, newCategory, newDescription, id]
    );

    return res.json({ success: true, message: 'Document updated in MySQL', id });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update document',
      error: error.message,
    });
  }
}

export async function deleteDocument(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM documents WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Document deleted from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete document',
      error: error.message,
    });
  }
}
