export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

export interface NotificationRecord {
  id: string;
  title: string;
  date_str: string;
  category: 'Admissions' | 'Exams' | 'Placements' | 'Events' | 'Circulars' | 'Scholarships';
  is_new: boolean | number;
  is_urgent: boolean | number;
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
  updated_at?: string;
}

export interface ContactInquiryRecord {
  id?: number;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  source?: 'footer' | 'contact_page' | 'quick_inquiry';
  status?: 'new' | 'in_progress' | 'contacted' | 'closed';
  created_at?: string;
}

export interface AdmissionApplicationRecord {
  id?: number;
  full_name: string;
  dob?: string;
  phone: string;
  email: string;
  academic_year?: string;
  category: 'UG' | 'PG';
  preferred_course: string;
  qualification?: string;
  percentage?: string;
  city?: string;
  status?: 'pending' | 'reviewed' | 'admitted' | 'rejected';
  notes?: string;
  created_at?: string;
}

export interface GalleryImageRecord {
  id: string;
  title: string;
  category: string;
  image_path: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CollegeEventRecord {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date_str: string;
  image_path: string;
  description?: string;
  chief_guest?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  filename: string;
  path: string;
  file_size?: string;
  file_type?: string;
  category?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUserRecord {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  created_at: string;
}
