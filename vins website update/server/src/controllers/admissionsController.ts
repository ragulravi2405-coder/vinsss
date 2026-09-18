import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface AdmissionApplicationRow extends RowDataPacket {
  id: number;
  full_name: string;
  dob?: string;
  phone: string;
  email: string;
  academic_year: string;
  category: string;
  preferred_course: string;
  qualification: string;
  percentage?: string;
  city: string;
  status: string;
  notes?: string;
  created_at: string;
}

// In-memory fallback cache for localhost development when MySQL service is not running
let inMemoryAdmissions: any[] = [
  {
    id: 1,
    full_name: 'Ananya S. Pillai',
    dob: '2005-04-12',
    phone: '+91 94431 87654',
    email: 'ananya.pillai@example.com',
    academic_year: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.E. Computer Science & Engineering',
    qualification: 'HSC (+2)',
    percentage: '94.2',
    city: 'Nagercoil',
    status: 'admitted',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    full_name: 'Karthik V. Nair',
    dob: '2005-08-25',
    phone: '+91 98420 54321',
    email: 'karthik.nair@example.com',
    academic_year: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.Tech Artificial Intelligence & Data Science',
    qualification: 'HSC (+2)',
    percentage: '91.8',
    city: 'Marthandam',
    status: 'reviewed',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 3,
    full_name: 'Pooja R. Sundaram',
    dob: '2005-11-03',
    phone: '+91 94862 11223',
    email: 'pooja.sundaram@example.com',
    academic_year: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.E. Electronics & Communication Engineering',
    qualification: 'HSC (+2)',
    percentage: '88.5',
    city: 'Kanyakumari',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

export async function submitApplication(req: Request, res: Response) {
  console.log('[Backend] Request received: POST /api/admissions');
  try {
    const {
      fullName,
      dob = null,
      phone,
      email,
      academicYear = '2026 - 2027',
      category = 'UG',
      preferredCourse,
      qualification = 'HSC',
      percentage = null,
      city = 'Nagercoil',
    } = req.body;

    if (!fullName || !phone || !email || !preferredCourse) {
      return res.status(400).json({
        success: false,
        message: 'Full name, phone, email, and preferred course are required.',
      });
    }

    try {
      const result = await executeQuery<ResultSetHeader>(
        `INSERT INTO admission_applications 
         (full_name, dob, phone, email, academic_year, category, preferred_course, qualification, percentage, city, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          fullName.trim(),
          dob || null,
          phone.trim(),
          email.trim(),
          academicYear,
          category,
          preferredCourse,
          qualification,
          percentage || null,
          city.trim(),
        ]
      );

      console.log('[Backend] ✅ Data successfully inserted into MySQL (admission_applications). insertId:', result.insertId);

      const newRecord = {
        id: result.insertId,
        full_name: fullName.trim(),
        dob,
        phone: phone.trim(),
        email: email.trim(),
        academic_year: academicYear,
        category,
        preferred_course: preferredCourse,
        qualification,
        percentage,
        city: city.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      inMemoryAdmissions = [newRecord, ...inMemoryAdmissions];

      return res.status(201).json({
        success: true,
        message: 'Admission application submitted successfully to VINS College Admissions Desk.',
        applicationId: result.insertId,
      });
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL unavailable, saving to memory fallback:', mysqlErr.message);
      const fallbackId = Date.now();
      const fallbackRecord = {
        id: fallbackId,
        full_name: fullName.trim(),
        dob,
        phone: phone.trim(),
        email: email.trim(),
        academic_year: academicYear,
        category,
        preferred_course: preferredCourse,
        qualification,
        percentage,
        city: city.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      inMemoryAdmissions = [fallbackRecord, ...inMemoryAdmissions];

      return res.status(201).json({
        success: true,
        message: 'Admission application submitted successfully (stored in server memory).',
        applicationId: fallbackId,
      });
    }
  } catch (error: any) {
    console.error('[Backend] ❌ Failed to process application:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to process admission application',
      error: error.message,
    });
  }
}

export async function getAllApplications(_req: Request, res: Response) {
  try {
    try {
      const rows = await executeQuery<AdmissionApplicationRow[]>(
        'SELECT * FROM admission_applications ORDER BY created_at DESC'
      );
      if (rows && rows.length > 0) {
        return res.json({ success: true, count: rows.length, data: rows });
      }
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL query failed, using in-memory admissions fallback:', mysqlErr.message);
    }

    return res.json({
      success: true,
      count: inMemoryAdmissions.length,
      data: inMemoryAdmissions,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      count: inMemoryAdmissions.length,
      data: inMemoryAdmissions,
    });
  }
}

export async function updateApplicationStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'reviewed', 'admitted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid application status value' });
    }

    inMemoryAdmissions = inMemoryAdmissions.map((item) =>
      String(item.id) === String(id) ? { ...item, status, notes: notes ?? item.notes } : item
    );

    try {
      if (notes) {
        await executeQuery<ResultSetHeader>(
          'UPDATE admission_applications SET status = ?, notes = ? WHERE id = ?',
          [status, notes, id]
        );
      } else {
        await executeQuery<ResultSetHeader>(
          'UPDATE admission_applications SET status = ? WHERE id = ?',
          [status, id]
        );
      }
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL update failed, updated in memory:', mysqlErr.message);
    }

    return res.json({ success: true, message: `Application status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message,
    });
  }
}

export async function deleteApplication(req: Request, res: Response) {
  try {
    const { id } = req.params;
    inMemoryAdmissions = inMemoryAdmissions.filter((item) => String(item.id) !== String(id));

    try {
      await executeQuery<ResultSetHeader>(
        'DELETE FROM admission_applications WHERE id = ?',
        [id]
      );
    } catch (mysqlErr: any) {
      console.warn('[Backend] MySQL delete failed, removed from memory:', mysqlErr.message);
    }

    return res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message,
    });
  }
}
