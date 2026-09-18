import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface GalleryRow extends RowDataPacket {
  id: string;
  title: string;
  category: string;
  image_path: string;
  description?: string;
  sort_order: number;
}

function formatGallery(r: GalleryRow) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    imagePath: r.image_path,
    imageUrl: r.image_path,
    image_url: r.image_path,
    description: r.description || null,
    sortOrder: r.sort_order,
  };
}

export async function getAllGalleryImages(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<GalleryRow[]>(
      'SELECT * FROM gallery_images ORDER BY sort_order ASC, created_at DESC'
    );
    const data = rows.map(formatGallery);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images from MySQL',
      error: error.message,
    });
  }
}

export async function createGalleryImage(req: Request, res: Response) {
  try {
    const { title, category = 'Campus', imagePath, imageUrl, image_url, description } = req.body;
    const finalImageUrl = imagePath || imageUrl || image_url;
    if (!title || !finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Title and image are required' });
    }
    const id = `gal-${Date.now()}`;
    await executeQuery<ResultSetHeader>(
      'INSERT INTO gallery_images (id, title, category, image_path, description) VALUES (?, ?, ?, ?, ?)',
      [id, title, category, finalImageUrl, description || null]
    );
    return res.status(201).json({
      success: true,
      message: 'Gallery image added to MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add gallery image',
      error: error.message,
    });
  }
}

export async function updateGalleryImage(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Fetch existing record to preserve image if not changed
    const existing = await executeQuery<GalleryRow[]>(
      'SELECT * FROM gallery_images WHERE id = ? LIMIT 1',
      [id]
    );
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }
    const current = existing[0];

    const { title, category, imagePath, imageUrl, image_url, description } = req.body;
    const incomingImage = imagePath || imageUrl || image_url;

    const newTitle       = (title          !== undefined && title          !== null && title          !== '') ? title          : current.title;
    const newCategory    = (category       !== undefined && category       !== null && category       !== '') ? category       : current.category;
    // Preserve existing image if incoming is empty/null/undefined
    const newImagePath   = (incomingImage  !== undefined && incomingImage  !== null && incomingImage  !== '') ? incomingImage  : current.image_path;
    const newDescription = (description   !== undefined && description   !== null)                            ? description   : current.description;

    await executeQuery<ResultSetHeader>(
      `UPDATE gallery_images SET
         title       = ?,
         category    = ?,
         image_path  = ?,
         description = ?
       WHERE id = ?`,
      [newTitle, newCategory, newImagePath, newDescription, id]
    );

    return res.json({ success: true, message: 'Gallery image updated in MySQL', id });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update gallery image',
      error: error.message,
    });
  }
}

export async function deleteGalleryImage(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Gallery image deleted from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete gallery image',
      error: error.message,
    });
  }
}
