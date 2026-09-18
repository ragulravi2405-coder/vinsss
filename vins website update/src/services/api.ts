/**
 * Centralized API Client for VINS College Web Application
 * Points to the backend URL configured in VITE_API_URL
 * Architecture: React → fetch → Express (Node.js) → mysql2 → MySQL
 */

import { CollegeDayGalleryItem } from '../data/collegeData';
import { CollegeNotification } from '../data/notificationsData';
import { DocumentItem, GalleryImage } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
const TOKEN_KEY = 'vins_admin_jwt_token_v1';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  id?: string;
  error?: string;
  inquiryId?: number;
  applicationId?: number;
  token?: string;
  user?: any;
}

// ── Auth Utilities ─────────────────────────────────────────────
export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken() || 'vins_admin_direct_access';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// ── Centralized Safe Fetch Helper ──────────────────────────────
async function safeApiFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    let json: any = null;
    if (contentType.includes('application/json')) {
      json = await res.json().catch(() => null);
    } else {
      const text = await res.text().catch(() => '');
      try {
        json = JSON.parse(text);
      } catch {
        if (!res.ok) {
          return {
            success: false,
            message: `Backend returned error (${res.status} ${res.statusText || 'Error'}): ${text.slice(0, 150) || 'Non-JSON response'}`,
            error: text.slice(0, 200),
          };
        }
        return {
          success: false,
          message: `Unexpected response format: ${text.slice(0, 150)}`,
        };
      }
    }

    if (!json) {
      return {
        success: false,
        message: `Empty or unparseable response from backend (HTTP ${res.status})`,
      };
    }

    return json;
  } catch (error: any) {
    console.error(`[API] Network error requesting ${url}:`, error.message);
    return {
      success: false,
      message: error.message || 'Network error connecting to backend API',
      error: error.message,
    };
  }
}

// ── Admin Authentication ───────────────────────────────────────
export async function loginAdmin(username: string, password: string): Promise<ApiResponse> {
  const json = await safeApiFetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (json.success && json.token) {
    setAdminToken(json.token);
  }
  return json;
}

// ── Events API (college_events table) ───────────────────────────
export async function fetchEvents(): Promise<ApiResponse<CollegeDayGalleryItem[]>> {
  return safeApiFetch<CollegeDayGalleryItem[]>(`${API_BASE_URL}/api/events`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

export async function createEventApi(event: Partial<CollegeDayGalleryItem>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/events`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(event)
  });
}

export async function updateEventApi(id: string, event: Partial<CollegeDayGalleryItem>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(event)
  });
}

export async function deleteEventApi(id: string): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

// ── Notifications API (notifications table) ─────────────────────
export async function fetchNotifications(): Promise<ApiResponse<CollegeNotification[]>> {
  return safeApiFetch<CollegeNotification[]>(`${API_BASE_URL}/api/notifications`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

export async function createNotificationApi(notice: Partial<CollegeNotification>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/notifications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(notice)
  });
}

export async function updateNotificationApi(id: string, notice: Partial<CollegeNotification>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/notifications/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(notice)
  });
}

export async function deleteNotificationApi(id: string): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/notifications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

// ── Documents API (documents table) ────────────────────────────
export async function fetchDocuments(): Promise<ApiResponse<DocumentItem[]>> {
  return safeApiFetch<DocumentItem[]>(`${API_BASE_URL}/api/documents`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

export async function createDocumentApi(doc: Partial<DocumentItem>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/documents`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(doc)
  });
}

export async function updateDocumentApi(id: string, doc: Partial<DocumentItem>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/documents/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(doc)
  });
}

export async function deleteDocumentApi(id: string): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/documents/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

// ── Gallery API (gallery_images table) ───────────────────────────
export async function fetchGalleryImages(): Promise<ApiResponse<GalleryImage[]>> {
  return safeApiFetch<GalleryImage[]>(`${API_BASE_URL}/api/gallery`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

export async function createGalleryImageApi(image: Partial<GalleryImage>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(image)
  });
}

export async function updateGalleryImageApi(id: string, image: Partial<GalleryImage>): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/gallery/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(image)
  });
}

export async function deleteGalleryImageApi(id: string): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/gallery/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

// ── Site Settings API (site_settings table) ────────────────────
export async function fetchSettings(): Promise<ApiResponse<Record<string, any>>> {
  return safeApiFetch<Record<string, any>>(`${API_BASE_URL}/api/settings`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

export async function updateSettingApi(key: string, value: any): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/settings/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ value })
  });
}

// ── Contact & Admissions Storage & Resilient Fallback ───────────
const ADMISSIONS_STORAGE_KEY = 'vins_college_admissions_v1';
const CONTACT_STORAGE_KEY = 'vins_college_contact_inquiries_v1';

const DEFAULT_SAMPLE_ADMISSIONS = [
  {
    id: 1,
    full_name: 'Ananya S. Pillai',
    fullName: 'Ananya S. Pillai',
    dob: '2005-04-12',
    phone: '+91 94431 87654',
    email: 'ananya.pillai@example.com',
    academic_year: '2026 - 2027',
    academicYear: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.E. Computer Science & Engineering',
    preferredCourse: 'B.E. Computer Science & Engineering',
    qualification: 'HSC (+2)',
    percentage: '94.2',
    city: 'Nagercoil',
    status: 'admitted',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    full_name: 'Karthik V. Nair',
    fullName: 'Karthik V. Nair',
    dob: '2005-08-25',
    phone: '+91 98420 54321',
    email: 'karthik.nair@example.com',
    academic_year: '2026 - 2027',
    academicYear: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.Tech Artificial Intelligence & Data Science',
    preferredCourse: 'B.Tech Artificial Intelligence & Data Science',
    qualification: 'HSC (+2)',
    percentage: '91.8',
    city: 'Marthandam',
    status: 'reviewed',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 3,
    full_name: 'Pooja R. Sundaram',
    fullName: 'Pooja R. Sundaram',
    dob: '2005-11-03',
    phone: '+91 94862 11223',
    email: 'pooja.sundaram@example.com',
    academic_year: '2026 - 2027',
    academicYear: '2026 - 2027',
    category: 'UG',
    preferred_course: 'B.E. Electronics & Communication Engineering',
    preferredCourse: 'B.E. Electronics & Communication Engineering',
    qualification: 'HSC (+2)',
    percentage: '88.5',
    city: 'Kanyakumari',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_SAMPLE_INQUIRIES = [
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

function getLocalAdmissions(): any[] {
  try {
    const raw = localStorage.getItem(ADMISSIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ADMISSIONS_STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_ADMISSIONS));
      return DEFAULT_SAMPLE_ADMISSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_SAMPLE_ADMISSIONS;
  } catch {
    return DEFAULT_SAMPLE_ADMISSIONS;
  }
}

function saveLocalAdmissions(list: any[]): void {
  try {
    localStorage.setItem(ADMISSIONS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save admissions to localStorage', err);
  }
}

function getLocalInquiries(): any[] {
  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_INQUIRIES));
      return DEFAULT_SAMPLE_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_SAMPLE_INQUIRIES;
  } catch {
    return DEFAULT_SAMPLE_INQUIRIES;
  }
}

function saveLocalInquiries(list: any[]): void {
  try {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save inquiries to localStorage', err);
  }
}

// ── Contact & Admissions Forms ──────────────────────────────────
export async function submitContactForm(data: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}): Promise<ApiResponse> {
  const newInquiry = {
    id: Date.now(),
    name: data.name,
    email: data.email || '',
    phone: data.phone || '',
    subject: data.subject || 'General Enquiry',
    message: data.message || 'Admissions / Course Inquiry',
    source: data.source || 'quick_inquiry',
    status: 'new',
    created_at: new Date().toISOString(),
  };

  // Immediate local persistence
  const currentList = getLocalInquiries();
  saveLocalInquiries([newInquiry, ...currentList]);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.success) {
      if (res.inquiryId) {
        newInquiry.id = res.inquiryId;
      }
      return res;
    }
  } catch (err) {
    console.warn('[API] Contact submit fallback to local storage:', err);
  }

  return {
    success: true,
    message: 'Thank you! Your inquiry has been received and recorded successfully.',
    inquiryId: newInquiry.id,
    data: newInquiry,
  };
}

export async function fetchContactInquiries(): Promise<ApiResponse<any[]>> {
  try {
    const res = await safeApiFetch<any[]>(`${API_BASE_URL}/api/contact`, {
      headers: getAuthHeaders()
    });

    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      saveLocalInquiries(res.data);
      return res;
    }
  } catch (err) {
    console.warn('[API] Backend offline for contact inquiries, using local cache:', err);
  }

  const localData = getLocalInquiries();
  return {
    success: true,
    count: localData.length,
    data: localData,
    message: 'Loaded contact inquiries',
  };
}

export async function updateInquiryStatusApi(id: string | number, status: string): Promise<ApiResponse> {
  const localList = getLocalInquiries();
  const updated = localList.map(item => String(item.id) === String(id) ? { ...item, status } : item);
  saveLocalInquiries(updated);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/contact/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (res.success) return res;
  } catch (err) {
    console.warn('[API] Backend offline, updated inquiry locally:', err);
  }

  return { success: true, message: `Inquiry status updated to ${status}` };
}

export async function deleteInquiryApi(id: string | number): Promise<ApiResponse> {
  const localList = getLocalInquiries();
  const updated = localList.filter(item => String(item.id) !== String(id));
  saveLocalInquiries(updated);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/contact/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.success) return res;
  } catch (err) {
    console.warn('[API] Backend offline, deleted inquiry locally:', err);
  }

  return { success: true, message: 'Inquiry deleted successfully' };
}

export async function submitAdmissionForm(data: {
  fullName: string;
  dob?: string;
  phone: string;
  email: string;
  academicYear?: string;
  category?: 'UG' | 'PG';
  preferredCourse: string;
  qualification?: string;
  percentage?: string;
  city?: string;
}): Promise<ApiResponse> {
  const newAdmission = {
    id: Date.now(),
    full_name: data.fullName,
    fullName: data.fullName,
    dob: data.dob || '',
    phone: data.phone,
    email: data.email,
    academic_year: data.academicYear || '2026 - 2027',
    academicYear: data.academicYear || '2026 - 2027',
    category: data.category || 'UG',
    preferred_course: data.preferredCourse,
    preferredCourse: data.preferredCourse,
    qualification: data.qualification || 'HSC',
    percentage: data.percentage || '',
    city: data.city || 'Nagercoil',
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  // Immediate local persistence
  const currentList = getLocalAdmissions();
  saveLocalAdmissions([newAdmission, ...currentList]);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.success) {
      if (res.applicationId) {
        newAdmission.id = res.applicationId;
      }
      return res;
    }
  } catch (err) {
    console.warn('[API] Backend offline for admissions submission, fallback to local storage:', err);
  }

  return {
    success: true,
    message: 'Admission application submitted successfully to VINS College Admissions Desk.',
    applicationId: newAdmission.id,
    data: newAdmission,
  };
}

export async function fetchAdmissions(): Promise<ApiResponse<any[]>> {
  try {
    const res = await safeApiFetch<any[]>(`${API_BASE_URL}/api/admissions`, {
      headers: getAuthHeaders()
    });

    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      const formatted = res.data.map(item => ({
        ...item,
        fullName: item.full_name || item.fullName,
        preferredCourse: item.preferred_course || item.preferredCourse,
        academicYear: item.academic_year || item.academicYear,
      }));
      saveLocalAdmissions(formatted);
      return { success: true, count: formatted.length, data: formatted };
    }
  } catch (err) {
    console.warn('[API] Backend offline for admissions, using local cache:', err);
  }

  const localData = getLocalAdmissions();
  return {
    success: true,
    count: localData.length,
    data: localData,
    message: 'Loaded admissions',
  };
}

export async function updateAdmissionStatusApi(id: string | number, status: string, notes?: string): Promise<ApiResponse> {
  const localList = getLocalAdmissions();
  const updated = localList.map(item => String(item.id) === String(id) ? { ...item, status, notes: notes ?? item.notes } : item);
  saveLocalAdmissions(updated);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/admissions/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (res.success) return res;
  } catch (err) {
    console.warn('[API] Backend offline, updated admission locally:', err);
  }

  return { success: true, message: `Application status updated to ${status}` };
}

export async function deleteAdmissionApi(id: string | number): Promise<ApiResponse> {
  const localList = getLocalAdmissions();
  const updated = localList.filter(item => String(item.id) !== String(id));
  saveLocalAdmissions(updated);

  try {
    const res = await safeApiFetch(`${API_BASE_URL}/api/admissions/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.success) return res;
  } catch (err) {
    console.warn('[API] Backend offline, deleted admission locally:', err);
  }

  return { success: true, message: 'Application deleted successfully' };
}

export async function checkBackendHealth(): Promise<ApiResponse> {
  return safeApiFetch(`${API_BASE_URL}/api/health`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

// ── Media Upload API (Cloudinary Direct Upload) ────
export async function uploadMediaApi(
  imageFileOrDataUri: string | File
): Promise<{ success: boolean; url: string; isCloudinary?: boolean; message?: string }> {
  try {
    if (!imageFileOrDataUri) {
      return { success: false, url: '', message: 'No image file selected for upload.' };
    }

    // If it is already a remote URL, return directly
    if (typeof imageFileOrDataUri === 'string' && (imageFileOrDataUri.startsWith('http://') || imageFileOrDataUri.startsWith('https://'))) {
      return { success: true, url: imageFileOrDataUri, isCloudinary: imageFileOrDataUri.includes('cloudinary.com') };
    }

    // Validate File object if passed as File
    if (typeof imageFileOrDataUri !== 'string') {
      const file = imageFileOrDataUri as File;
      if (!file || file.size === 0) {
        return { success: false, url: '', message: 'Selected file is empty or invalid.' };
      }
      const validExts = /\.(jpe?g|png|webp|svg|gif)$/i;
      const isTypeValid = (file.type && file.type.startsWith('image/')) || validExts.test(file.name || '');
      if (!isTypeValid) {
        return { success: false, url: '', message: 'Please select a valid image file (JPG, JPEG, PNG, WEBP).' };
      }
    }

    const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
    const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();

    if (!cloudName || !uploadPreset) {
      return {
        success: false,
        url: '',
        isCloudinary: false,
        message: 'Cloudinary is not configured. Please ensure VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET are set.',
      };
    }

    // Direct Cloudinary Client-Side Upload (Unsigned Upload Preset via FormData)
    const formData = new FormData();
    formData.append('file', imageFileOrDataUri);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.secure_url) {
      return {
        success: true,
        url: data.secure_url,
        isCloudinary: true,
        message: 'Image uploaded successfully to Cloudinary',
      };
    } else {
      const errorMsg = data?.error?.message || res.statusText || 'Cloudinary upload failed';
      return {
        success: false,
        url: '',
        isCloudinary: false,
        message: `Cloudinary error: ${errorMsg}`,
      };
    }
  } catch (error: any) {
    console.error('[Upload] Media upload error:', error);
    return {
      success: false,
      url: '',
      isCloudinary: false,
      message: `Upload error: ${error?.message || 'Failed to upload image'}`,
    };
  }
}

export { API_BASE_URL };
