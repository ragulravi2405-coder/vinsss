import React, { useState } from 'react';
import { 
  ShieldCheck, Image as ImageIcon, FileText, Calendar, Layout, 
  Layers, Upload, Plus, Trash2, Edit3, Eye, CheckCircle2, 
  AlertCircle, Lock, Unlock, RefreshCw, Sparkles, Download, 
  ExternalLink, Search, Filter, FolderOpen, ArrowRight, X,
  Megaphone, HardDrive, Info, Palette, Sliders, ToggleLeft, ToggleRight,
  Globe, Trophy, Award, Bell, GraduationCap, Check
} from 'lucide-react';
import { useAdminData, KNOWN_MEDIA_ASSETS, AvailableMediaAsset } from '../context/AdminDataContext';
import { DocumentItem, GalleryImage, CustomNavButton, NavigationTab } from '../types';
import { CollegeDayGalleryItem } from '../data/collegeData';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { EditImageModal, ImageEditPayload } from '../components/admin/EditImageModal';
import { 
  loginAdmin, uploadMediaApi, fetchAdmissions, fetchContactInquiries,
  updateAdmissionStatusApi, deleteAdmissionApi, updateInquiryStatusApi, deleteInquiryApi
} from '../services/api';

export const AdminPortalPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    customNavButtons,
    addCustomNavButton,
    deleteCustomNavButton,
    updateCustomNavButton,
    toggleCustomNavButton,
    siteTheme,
    updateSiteTheme,
    siteBanner,
    updateSiteBanner,
    runningTickerTitle,
    setRunningTickerTitle,
    galleryImages,
    addGalleryImage,
    deleteGalleryImage,
    updateGalleryImage,
    documents,
    addDocument,
    deleteDocument,
    updateDocument,
    events,
    addEvent,
    deleteEvent,
    updateEvent,
    heroSlides,
    addHeroSlide,
    deleteHeroSlide,
    updateHeroSlide,
    notifications,
    addNotification,
    deleteNotification,
    departments,
    updateDepartmentImage,
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    deleteMediaAsset,
    refreshData,
    resetAllToDefaults
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<
    'buttons' | 'banner' | 'gallery' | 'events' | 'slides' | 'departments' | 'documents' | 'notifications' | 'media' | 'admissions' | 'contact'
  >('buttons');

  const [passcode, setPasscode] = useState('');
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [admissionsLoading, setAdmissionsLoading] = useState(false);
  const [admissionsError, setAdmissionsError] = useState<string | null>(null);
  const [contactInquiries, setContactInquiries] = useState<any[]>([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [admissionSearch, setAdmissionSearch] = useState('');
  const [admissionStatusFilter, setAdmissionStatusFilter] = useState('all');
  const [authError, setAuthError] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [selectedDocPreview, setSelectedDocPreview] = useState<DocumentItem | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<((path: string) => void) | null>(null);
  const [editingImageItem, setEditingImageItem] = useState<{
    data: ImageEditPayload;
    type: 'gallery' | 'event' | 'slide' | 'media';
  } | null>(null);

  // Custom Navigation Button Form State
  const [navButtonForm, setNavButtonForm] = useState({
    label: '',
    actionType: 'tab' as 'tab' | 'url' | 'anchor',
    targetTab: 'admissions' as NavigationTab,
    targetUrl: '',
    targetAnchor: '',
    location: 'navbar' as 'navbar' | 'topbar' | 'footer',
    badge: 'NEW',
    iconName: 'Sparkles',
    buttonStyle: 'accent' as 'solid' | 'outline' | 'accent',
    openInNewTab: false
  });

  // Theme & Banner Quick Form States
  const [themeForm, setThemeForm] = useState({
    tneaCode: siteTheme?.tneaCode || '4982',
    tickerTitle: runningTickerTitle || 'LIVE CIRCULARS'
  });

  const [bannerForm, setBannerForm] = useState({
    enabled: siteBanner?.enabled ?? true,
    message: siteBanner?.message || 'Admissions Open 2026-27 for B.E / B.Tech / MBA / MCA courses. Counselling Code: 4982',
    type: siteBanner?.type || 'announcement' as 'announcement' | 'info' | 'alert',
    linkText: siteBanner?.linkText || 'Apply Now',
    linkUrl: siteBanner?.linkUrl || '#admissions'
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Cultural Dance',
    description: '',
    imagePath: '',
    previewUrl: ''
  });

  // Document / PDF Form State
  const [docForm, setDocForm] = useState({
    title: '',
    filename: '',
    path: '',
    category: 'Circulars & Notices',
    fileSize: '1.2 MB',
    fileType: 'PDF' as 'PDF' | 'DOCX',
    description: ''
  });

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    subtitle: '',
    category: 'Cultural Dance',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    imagePath: '',
    description: '',
    chiefGuest: ''
  });

  // Hero Slide Form State
  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    visualUrl: ''
  });

  // Notification Form State
  const [notifForm, setNotifForm] = useState({
    title: '',
    category: 'Circulars' as 'Admissions' | 'Exams' | 'Placements' | 'Events' | 'Circulars' | 'Scholarships',
    isUrgent: false,
    summary: '',
    fullDetails: '',
    issuedBy: 'Principal Office & Admissions',
    attachDocId: ''
  });

  // Department Image Edit Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || 'be-cse');
  const [deptImageForm, setDeptImageForm] = useState({
    bannerPath: '',
    courseImage: '',
    lab1: '',
    lab2: '',
    lab3: '',
    hod: ''
  });

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = passcode.trim() || 'vins2026';
    if (code === 'vins2026' || code === 'admin' || code === '4982' || code === 'admin123') {
      setIsAdminLoggedIn(true);
      setAuthError('');
      try {
        await loginAdmin('admin', code === 'admin' ? 'admin123' : code);
      } catch (err) {
        console.warn('Backend login notice:', err);
      }
      showToast('Admin access granted! Full editing powers active.');
    } else {
      const res = await loginAdmin('admin', code);
      if (res.success) {
        setIsAdminLoggedIn(true);
        setAuthError('');
        showToast('Admin access granted! Authenticated with MySQL.');
      } else {
        setAuthError('Incorrect passcode. Try "vins2026" or "4982".');
      }
    }
  };

  // Fetch admissions when Admissions tab is active
  React.useEffect(() => {
    if (activeTab === 'admissions') {
      setAdmissionsLoading(true);
      setAdmissionsError(null);
      fetchAdmissions()
        .then((res) => {
          if (res.data) {
            setAdmissions(res.data);
          }
        })
        .catch((err) => console.warn('Admissions fetch notice:', err.message))
        .finally(() => setAdmissionsLoading(false));
    }
  }, [activeTab]);

  // Fetch contact inquiries when Contact tab is active
  React.useEffect(() => {
    if (activeTab === 'contact') {
      setContactLoading(true);
      setContactError(null);
      fetchContactInquiries()
        .then((res) => {
          if (res.data) {
            setContactInquiries(res.data);
          }
        })
        .catch((err) => console.warn('Contact inquiries fetch notice:', err.message))
        .finally(() => setContactLoading(false));
    }
  }, [activeTab]);

  const handleUpdateAdmissionStatus = async (id: number | string, newStatus: string) => {
    setAdmissions((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, status: newStatus } : item))
    );
    showToast(`Application #${id} marked as ${newStatus.toUpperCase()}`);
    await updateAdmissionStatusApi(id, newStatus);
  };

  const handleDeleteAdmission = async (id: number | string) => {
    if (!window.confirm('Are you sure you want to remove this admission application record?')) return;
    setAdmissions((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast(`Application #${id} deleted`);
    await deleteAdmissionApi(id);
  };

  const handleUpdateInquiryStatus = async (id: number | string, newStatus: string) => {
    setContactInquiries((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, status: newStatus } : item))
    );
    showToast(`Inquiry #${id} marked as ${newStatus.toUpperCase()}`);
    await updateInquiryStatusApi(id, newStatus);
  };

  const handleDeleteInquiry = async (id: number | string) => {
    if (!window.confirm('Are you sure you want to remove this contact inquiry record?')) return;
    setContactInquiries((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast(`Inquiry #${id} deleted`);
    await deleteInquiryApi(id);
  };

  // Generic File Uploader for Images -> Cloudinary / Live URL / Base64 Fallback
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP, SVG).');
      return;
    }

    try {
      showToast(`Uploading ${file.name}...`);
      const uploadRes = await uploadMediaApi(file);

      if (!uploadRes.success) {
        showToast(uploadRes.message || 'Image upload failed. Please check preset settings.');
        return;
      }

      const finalUrl = uploadRes.url;
      onComplete(finalUrl);

      // Also register into available media library
      addMediaAsset({
        id: `upload-${Date.now()}`,
        name: file.name,
        path: finalUrl,
        category: 'campus'
      });

      if (uploadRes.isCloudinary) {
        showToast(`☁️ Cloudinary Upload Complete: ${file.name}`);
      } else {
        showToast(`Uploaded image: ${file.name}`);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      showToast('Image upload failed. Please try again.');
    }
  };

  // Generic File Uploader for PDFs -> Base64 Data URL
  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isDoc = file.name.endsWith('.docx') || file.name.endsWith('.doc');

    if (!isPdf && !isDoc) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setDocForm({
        ...docForm,
        filename: file.name,
        path: dataUrl,
        fileSize: sizeFormatted,
        fileType: isPdf ? 'PDF' : 'DOCX',
        title: docForm.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      });
      showToast(`PDF file loaded: ${file.name} (${sizeFormatted})`);
    };
    reader.readAsDataURL(file);
  };

  // Submit Handlers for Custom Nav & Action Buttons
  const handleAddCustomNavButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navButtonForm.label.trim()) {
      alert('Please enter a button label (e.g., "Fee Pay", "Alumni Cell", "NIRF 2026").');
      return;
    }

    addCustomNavButton({
      label: navButtonForm.label.trim(),
      actionType: navButtonForm.actionType,
      targetTab: navButtonForm.actionType === 'tab' ? navButtonForm.targetTab : undefined,
      targetUrl: navButtonForm.actionType === 'url' ? navButtonForm.targetUrl : undefined,
      targetAnchor: navButtonForm.targetAnchor || undefined,
      location: navButtonForm.location,
      badge: navButtonForm.badge.trim() || undefined,
      iconName: navButtonForm.iconName,
      buttonStyle: navButtonForm.buttonStyle,
      openInNewTab: navButtonForm.openInNewTab,
      isActive: true
    });

    setNavButtonForm({
      label: '',
      actionType: 'tab',
      targetTab: 'admissions',
      targetUrl: '',
      targetAnchor: '',
      location: 'navbar',
      badge: 'NEW',
      iconName: 'Sparkles',
      buttonStyle: 'accent',
      openInNewTab: false
    });

    showToast(`New button added instantly! Visible on site now.`);
  };

  const handleSaveThemeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteTheme({
      tneaCode: themeForm.tneaCode
    });
    setRunningTickerTitle(themeForm.tickerTitle);
    showToast('Theme & live ticker title updated across the website!');
  };

  const handleSaveBannerSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteBanner({
      enabled: bannerForm.enabled,
      message: bannerForm.message,
      type: bannerForm.type,
      linkText: bannerForm.linkText,
      linkUrl: bannerForm.linkUrl
    });
    showToast('Top announcement banner published live!');
  };

  // Submit Handlers
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imagePath) {
      alert('Please provide a title and select or upload an image.');
      return;
    }
    addGalleryImage({
      title: galleryForm.title,
      category: galleryForm.category,
      description: galleryForm.description,
      imagePath: galleryForm.imagePath
    });
    setGalleryForm({ title: '', category: 'Cultural Dance', description: '', imagePath: '', previewUrl: '' });
    showToast('Gallery image added successfully!');
  };

  const handleSaveEditedImage = (updated: ImageEditPayload) => {
    if (!editingImageItem) return;

    if (editingImageItem.type === 'gallery') {
      updateGalleryImage({
        id: updated.id,
        title: updated.title,
        category: updated.category || 'Cultural Dance',
        description: updated.description,
        imagePath: updated.imagePath
      });
      showToast(`Gallery image "${updated.title}" updated successfully!`);
    } else if (editingImageItem.type === 'event') {
      updateEvent({
        id: updated.id,
        title: updated.title,
        subtitle: updated.subtitle || 'College Celebration',
        category: updated.category || 'Cultural Dance',
        date: updated.date || new Date().toLocaleDateString(),
        imagePath: updated.imagePath,
        description: updated.description || '',
        chiefGuest: updated.chiefGuest
      });
      showToast(`Event "${updated.title}" updated successfully!`);
    } else if (editingImageItem.type === 'slide') {
      const slideId = parseInt(updated.id, 10) || Number(updated.id);
      updateHeroSlide({
        id: slideId,
        title: updated.title,
        subtitle: updated.subtitle || '',
        imagePath: updated.imagePath,
        visualUrl: updated.imagePath
      });
      showToast(`Hero slide "${updated.title}" updated successfully!`);
    } else if (editingImageItem.type === 'media') {
      updateMediaAsset({
        id: updated.id,
        name: updated.title,
        path: updated.imagePath,
        category: (updated.category as any) || 'campus'
      });
      showToast(`Media asset "${updated.title}" updated successfully!`);
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title || !docForm.path) {
      alert('Please enter document title and select/upload a PDF file.');
      return;
    }
    addDocument({
      title: docForm.title,
      filename: docForm.filename || 'college-document.pdf',
      path: docForm.path,
      category: docForm.category,
      fileSize: docForm.fileSize,
      fileType: docForm.fileType,
      description: docForm.description || 'Uploaded official college document.'
    });
    setDocForm({
      title: '',
      filename: '',
      path: '',
      category: 'Circulars & Notices',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      description: ''
    });
    showToast('PDF Document saved and published!');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.imagePath) {
      alert('Please enter event title and select/upload an event image.');
      return;
    }
    addEvent({
      title: eventForm.title,
      subtitle: eventForm.subtitle || 'College Day Celebration Event',
      category: eventForm.category,
      date: eventForm.date,
      imagePath: eventForm.imagePath,
      description: eventForm.description,
      chiefGuest: eventForm.chiefGuest
    });
    setEventForm({
      title: '',
      subtitle: '',
      category: 'Cultural Dance',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      imagePath: '',
      description: '',
      chiefGuest: ''
    });
    showToast('Event & photo added to College Events Gallery!');
  };

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.title || !slideForm.visualUrl) {
      alert('Please enter slide title and slide photo URL/upload.');
      return;
    }
    addHeroSlide({
      title: slideForm.title,
      subtitle: slideForm.subtitle || 'VINS Christian College of Engineering, Nagercoil',
      visualUrl: slideForm.visualUrl,
      imagePath: slideForm.visualUrl
    });
    setSlideForm({ title: '', subtitle: '', visualUrl: '' });
    showToast('Hero slide added to Homepage carousel!');
  };

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifForm.title || !notifForm.summary) {
      alert('Please provide announcement title and summary text.');
      return;
    }

    const attachedDoc = documents.find(d => d.id === notifForm.attachDocId);

    addNotification({
      title: notifForm.title,
      category: notifForm.category,
      isUrgent: notifForm.isUrgent,
      summary: notifForm.summary,
      fullDetails: notifForm.fullDetails || notifForm.summary,
      issuedBy: notifForm.issuedBy,
      pdfAttachment: attachedDoc
    });

    setNotifForm({
      title: '',
      category: 'Circulars',
      isUrgent: false,
      summary: '',
      fullDetails: '',
      issuedBy: 'Principal Office & Admissions',
      attachDocId: ''
    });

    showToast('Live announcement & circular broadcasted!');
  };

  const handleSaveDeptImages = (e: React.FormEvent) => {
    e.preventDefault();
    const dept = departments.find(d => d.id === selectedDeptId);
    if (!dept) return;

    updateDepartmentImage(selectedDeptId, {
      bannerPath: deptImageForm.bannerPath || dept.bannerPath,
      courseImage: deptImageForm.courseImage || dept.courseImage,
      labPaths: {
        lab1: deptImageForm.lab1 || dept.labPaths.lab1,
        lab2: deptImageForm.lab2 || dept.labPaths.lab2,
        lab3: deptImageForm.lab3 || dept.labPaths.lab3,
        hod: deptImageForm.hod || dept.labPaths.hod,
      }
    });

    showToast(`Updated images for ${dept.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A2540] pb-24 font-sans">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2540] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm font-bold">{successToast}</span>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <DocumentViewerModal
          document={selectedDocPreview}
          isOpen={true}
          onClose={() => setSelectedDocPreview(null)}
        />
      )}

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <div className="fixed inset-0 z-50 bg-[#0A2540]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-[#0A2540] overflow-hidden animate-fade-in">
            <div className="px-6 py-4 bg-[#0A2540] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-white" />
                <h3 className="font-bold text-base text-white font-playfair">Select College Media Asset</h3>
              </div>
              <button 
                onClick={() => setMediaPickerTarget(null)}
                className="p-1 text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white border-b-2 border-[#0A2540]/15 flex items-center justify-between text-xs font-bold text-[#0A2540]">
              <span>Choose from existing high-res photos already in the portal:</span>
              <span className="bg-[#0A2540] text-white px-3 py-1 rounded-full text-[11px]">{mediaAssets.length} Assets Available</span>
            </div>
            <div className="p-4 overflow-y-auto max-h-[55vh] grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    mediaPickerTarget(asset.path);
                    setMediaPickerTarget(null);
                    showToast(`Selected asset: ${asset.name}`);
                  }}
                  className="bg-white border-2 border-[#0A2540]/20 hover:border-[#0A2540] rounded-2xl p-2 cursor-pointer group space-y-1.5 transition-all shadow-xs"
                >
                  <div className="aspect-video bg-white rounded-xl overflow-hidden border border-[#0A2540]/20">
                    <img src={asset.path} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <p className="text-xs font-bold text-[#0A2540] truncate">{asset.name}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t-2 border-[#0A2540]/15 text-right">
              <button
                onClick={() => setMediaPickerTarget(null)}
                className="px-5 py-2 bg-[#0A2540] text-white rounded-full font-bold text-xs cursor-pointer shadow-md hover:bg-[#0A2540]/90"
              >
                Close Picker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Image & Description Edit Modal */}
      {editingImageItem && (
        <EditImageModal
          isOpen={true}
          onClose={() => setEditingImageItem(null)}
          initialData={editingImageItem.data}
          onSave={handleSaveEditedImage}
          type={editingImageItem.type}
          onPickExisting={(cb) => setMediaPickerTarget(() => cb)}
          categories={
            editingImageItem.type === 'gallery'
              ? ['Cultural Dance', 'Ceremony', 'Campus', 'Awards', 'Workshop', 'Seminar', 'Sports', 'General']
              : editingImageItem.type === 'event'
              ? ['Cultural Dance', 'Ceremony', 'Awards', 'Workshop', 'Seminar', 'Campus', 'Finale']
              : ['slides', 'events', 'courses', 'placement', 'people', 'logo', 'campus']
          }
        />
      )}

      {/* Top Banner Header */}
      <div className="bg-[#0A2540] text-white py-8 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0A2540] border border-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#0A2540]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-playfair">
                    VINS Administration Content Portal
                  </h1>
                  <span className="px-3 py-0.5 text-[10px] font-black uppercase bg-white text-[#0A2540] rounded-full">
                    Authority
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-0.5 font-medium">
                  Direct management of Gallery, Documents/PDFs, Events, Department Labs, and Circulars.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {isAdminLoggedIn ? (
                <>
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0A2540] text-xs font-bold shadow-md">
                    <Unlock className="w-3.5 h-3.5 text-[#0A2540]" />
                    <span>Logged In (Super Admin)</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all gallery images, documents, and slides back to official college defaults?')) {
                        resetAllToDefaults();
                        showToast('Reset to default official college records.');
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0A2540] border border-white/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Reset modified data to factory defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      showToast('Logged out of Admin Portal.');
                    }}
                    className="px-4 py-2 rounded-full bg-white text-[#0A2540] hover:bg-white/90 text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    Lock Console
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/90 font-medium">Quick Access PIN: <strong className="text-white bg-white/20 px-2 py-0.5 rounded-full">vins2026</strong></span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* If Not Logged In, Show Friendly Unlock Screen with Default Option */}
        {!isAdminLoggedIn ? (
          <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border-2 border-[#0A2540] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-[#0A2540] text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Admin Console Authorization</h2>
              <p className="text-xs text-[#0A2540]/80 font-medium">
                Authorized staff and web administrators can manage all gallery photos, PDF documents, news circulars, and departmental lab images.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left">
                <label className="block text-xs font-bold text-[#0A2540] mb-1.5">
                  Admin Passcode / PIN
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. vins2026)"
                  className="w-full bg-white border-2 border-[#0A2540]/30 rounded-2xl px-4 py-3 text-sm font-bold text-[#0A2540] placeholder-[#0A2540]/50 focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              {authError && (
                <p className="text-xs font-bold text-[#0A2540] text-left flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#0A2540]" />
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-extrabold rounded-full text-sm uppercase tracking-wider transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-white" />
                <span>Unlock Full Admin Editor</span>
              </button>
            </form>

            <div className="pt-2 border-t-2 border-[#0A2540]/15 text-xs text-[#0A2540]/70 font-medium">
              <span>Admin PIN default is preset for administrators. Click unlock to proceed.</span>
            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="space-y-8">
            
            {/* Quick Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-[#0A2540]/20 scrollbar-none">
              <button
                onClick={() => setActiveTab('buttons')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'buttons'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Sparkles className="w-4 h-4 text-current" />
                <span>Nav Buttons ({customNavButtons.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('banner')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'banner'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Megaphone className="w-4 h-4 text-current" />
                <span>Top Banner &amp; Code</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-current" />
                <span>Gallery Images ({galleryImages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'documents'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <FileText className="w-4 h-4 text-current" />
                <span>PDF Documents ({documents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Calendar className="w-4 h-4 text-current" />
                <span>Events ({events.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('slides')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'slides'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Layout className="w-4 h-4 text-current" />
                <span>Carousel Slides ({heroSlides.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('departments')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'departments'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Layers className="w-4 h-4 text-current" />
                <span>Dept Photos ({departments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Megaphone className="w-4 h-4 text-current" />
                <span>Circulars ({notifications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'media'
                    ? 'bg-[#363538] text-[#f7f6f4] shadow-md border border-[#dedcd7]/30'
                    : 'bg-white/80 text-[#54524e] hover:bg-[#ebe9e4] border border-[#dedcd7]'
                }`}
              >
                <HardDrive className="w-4 h-4" />
                <span>Media Explorer ({mediaAssets.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('admissions')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'admissions'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-current" />
                <span>Admissions ({admissions?.length ?? 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                <Bell className="w-4 h-4 text-current" />
                <span>Contact Inquiries ({contactInquiries?.length ?? 0})</span>
              </button>
            </div>

            {/* TAB: ADMISSION APPLICATIONS */}
            {activeTab === 'admissions' && (
              <div className="space-y-5">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#0A2540] flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#0A2540]" />
                      Admission Applications
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Read from <code className="bg-slate-100 px-1 rounded">vins_college.admission_applications</code></p>
                  </div>
                  <button
                    onClick={() => {
                      setAdmissionsLoading(true);
                      setAdmissionsError(null);
                      fetchAdmissions()
                        .then(res => { if (res.success && res.data) setAdmissions(res.data); else setAdmissionsError(res.message || 'Error'); })
                        .catch(err => setAdmissionsError(err.message))
                        .finally(() => setAdmissionsLoading(false));
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0A2540] text-white rounded-full text-xs font-bold hover:bg-[#0A2540]/90 transition-all cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone or course..."
                      value={admissionSearch}
                      onChange={e => setAdmissionSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>
                  <select
                    value={admissionStatusFilter}
                    onChange={e => setAdmissionStatusFilter(e.target.value)}
                    className="px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A2540] cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="admitted">Admitted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Loading / Error */}
                {admissionsLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-[#0A2540]">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">Loading admission records from MySQL...</span>
                    </div>
                  </div>
                )}
                {admissionsError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-xs text-red-700 font-medium">{admissionsError}</p>
                  </div>
                )}

                {!admissionsLoading && !admissionsError && (() => {
                  const filtered = admissions.filter(item => {
                    const matchSearch = !admissionSearch ||
                      (item.full_name || '').toLowerCase().includes(admissionSearch.toLowerCase()) ||
                      (item.email || '').toLowerCase().includes(admissionSearch.toLowerCase()) ||
                      (item.phone || '').includes(admissionSearch) ||
                      (item.preferred_course || '').toLowerCase().includes(admissionSearch.toLowerCase());
                    const matchStatus = admissionStatusFilter === 'all' || item.status === admissionStatusFilter;
                    return matchSearch && matchStatus;
                  });
                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-5 py-3 bg-[#0A2540]/5 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0A2540]">
                          {filtered.length} of {admissions.length} Application{admissions.length !== 1 ? 's' : ''}
                        </span>
                        {admissions.length === 0 && (
                          <span className="text-xs text-slate-400">No records yet in admission_applications</span>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">#</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Full Name</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Email</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Phone</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Course</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Category</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Qual.</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">%</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">City</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Acad. Year</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Status</th>
                              <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Submitted</th>
                              <th className="text-right py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filtered.length === 0 ? (
                              <tr>
                                <td colSpan={13} className="text-center py-10 text-slate-400 text-xs">
                                  {admissions.length === 0 ? 'No admission applications found in the database.' : 'No records match your search/filter.'}
                                </td>
                              </tr>
                            ) : (
                              filtered.map((item, idx) => {
                                const statusColors: Record<string, string> = {
                                  pending: 'bg-amber-100 text-amber-800 border-amber-300',
                                  reviewed: 'bg-blue-100 text-blue-800 border-blue-300',
                                  admitted: 'bg-green-100 text-green-800 border-green-300',
                                  rejected: 'bg-red-100 text-red-800 border-red-300'
                                };
                                const statusColor = statusColors[item.status] || 'bg-slate-100 text-slate-700 border-slate-300';
                                const submittedDate = item.created_at
                                  ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                  : '—';
                                return (
                                  <tr key={item.id ?? idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-bold text-slate-400">{item.id}</td>
                                    <td className="py-3 px-4 font-semibold text-[#0A2540] whitespace-nowrap">{item.full_name || item.fullName || '—'}</td>
                                    <td className="py-3 px-4 text-slate-600">{item.email || '—'}</td>
                                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{item.phone || '—'}</td>
                                    <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">{item.preferred_course || item.preferredCourse || '—'}</td>
                                    <td className="py-3 px-4">
                                      <span className="px-2 py-0.5 bg-[#0A2540]/10 text-[#0A2540] rounded-full font-bold text-[10px]">{item.category || '—'}</span>
                                    </td>
                                    <td className="py-3 px-4 text-slate-600">{item.qualification || '—'}</td>
                                    <td className="py-3 px-4 font-bold text-slate-700">{item.percentage ? `${item.percentage}%` : '—'}</td>
                                    <td className="py-3 px-4 text-slate-600">{item.city || '—'}</td>
                                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{item.academic_year || item.academicYear || '—'}</td>
                                    <td className="py-3 px-4">
                                      <select
                                        value={item.status || 'pending'}
                                        onChange={(e) => handleUpdateAdmissionStatus(item.id, e.target.value)}
                                        className={`px-2 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border cursor-pointer focus:outline-none ${statusColor}`}
                                      >
                                        <option value="pending">PENDING</option>
                                        <option value="reviewed">REVIEWED</option>
                                        <option value="admitted">ADMITTED</option>
                                        <option value="rejected">REJECTED</option>
                                      </select>
                                    </td>
                                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{submittedDate}</td>
                                    <td className="py-3 px-4 text-right">
                                      <button
                                        onClick={() => handleDeleteAdmission(item.id)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Delete Application"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB: CONTACT INQUIRIES */}
            {activeTab === 'contact' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#0A2540] flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#0A2540]" />
                      Contact Inquiries
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Read from <code className="bg-slate-100 px-1 rounded">vins_college.contact_inquiries</code></p>
                  </div>
                  <button
                    onClick={() => {
                      setContactLoading(true);
                      setContactError(null);
                      fetchContactInquiries()
                        .then(res => { if (res.data) setContactInquiries(res.data); })
                        .catch(err => console.warn('Refresh notice:', err.message))
                        .finally(() => setContactLoading(false));
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0A2540] text-white rounded-full text-xs font-bold hover:bg-[#0A2540]/90 transition-all cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                </div>

                {contactLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-[#0A2540]">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">Loading contact inquiries...</span>
                    </div>
                  </div>
                )}
                {contactError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-xs text-red-700 font-medium">{contactError}</p>
                  </div>
                )}
                {!contactLoading && !contactError && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-3 bg-[#0A2540]/5 border-b border-slate-200">
                      <span className="text-xs font-bold text-[#0A2540]">
                        {contactInquiries.length} Inquir{contactInquiries.length !== 1 ? 'ies' : 'y'} in Database
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">#</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Name</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Email</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Phone</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Subject</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Message</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Source</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Status</th>
                            <th className="text-left py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Received</th>
                            <th className="text-right py-3 px-4 font-bold text-[#0A2540] uppercase tracking-wide text-[10px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contactInquiries.length === 0 ? (
                            <tr>
                              <td colSpan={10} className="text-center py-10 text-slate-400 text-xs">
                                No contact inquiries found in the database yet.
                              </td>
                            </tr>
                          ) : (
                            contactInquiries.map((item, idx) => {
                              const statusColors: Record<string, string> = {
                                new: 'bg-blue-100 text-blue-800 border-blue-300',
                                in_progress: 'bg-amber-100 text-amber-800 border-amber-300',
                                contacted: 'bg-purple-100 text-purple-800 border-purple-300',
                                closed: 'bg-green-100 text-green-800 border-green-300'
                              };
                              const statusColor = statusColors[item.status] || 'bg-slate-100 text-slate-700 border-slate-300';
                              const receivedDate = item.created_at
                                ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                : '—';
                              return (
                                <tr key={item.id ?? idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="py-3 px-4 font-bold text-slate-400">{item.id}</td>
                                  <td className="py-3 px-4 font-semibold text-[#0A2540] whitespace-nowrap">{item.name || '—'}</td>
                                  <td className="py-3 px-4 text-slate-600">{item.email || '—'}</td>
                                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{item.phone || '—'}</td>
                                  <td className="py-3 px-4 text-slate-700 font-medium">{item.subject || '—'}</td>
                                  <td className="py-3 px-4 text-slate-600 max-w-[200px]">
                                    <span className="line-clamp-2">{item.message || '—'}</span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold text-[10px]">{item.source || '—'}</span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <select
                                      value={item.status || 'new'}
                                      onChange={(e) => handleUpdateInquiryStatus(item.id, e.target.value)}
                                      className={`px-2 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border cursor-pointer focus:outline-none ${statusColor}`}
                                    >
                                      <option value="new">NEW</option>
                                      <option value="in_progress">IN PROGRESS</option>
                                      <option value="contacted">CONTACTED</option>
                                      <option value="closed">CLOSED</option>
                                    </select>
                                  </td>
                                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{receivedDate}</td>
                                  <td className="py-3 px-4 text-right">
                                    <button
                                      onClick={() => handleDeleteInquiry(item.id)}
                                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                      title="Delete Inquiry"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'buttons' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form to Create New Custom Button */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Add New Live Navigation / Action Button
                    </h3>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Instant Live Update
                    </span>
                  </div>

                  <form onSubmit={handleAddCustomNavButton} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Button Label / Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={navButtonForm.label}
                        onChange={(e) => setNavButtonForm({ ...navButtonForm, label: e.target.value })}
                        placeholder="e.g. Fee Payment, Alumni Cell, NIRF 2026, Scholarships"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Placement Location
                        </label>
                        <select
                          value={navButtonForm.location}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, location: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="navbar">Main Navbar (Prominent)</option>
                          <option value="topbar">Top Header Bar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Button Style
                        </label>
                        <select
                          value={navButtonForm.buttonStyle}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, buttonStyle: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="accent">Gold Accent (Highlight)</option>
                          <option value="solid">Executive Navy Solid</option>
                          <option value="outline">Clean Slate Outline</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Action Type
                        </label>
                        <select
                          value={navButtonForm.actionType}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, actionType: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="tab">Open College Page Tab</option>
                          <option value="url">External / Custom URL Link</option>
                          <option value="anchor">Scroll to Page Section</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Icon Style
                        </label>
                        <select
                          value={navButtonForm.iconName}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, iconName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="Sparkles">✨ Sparkles / Star</option>
                          <option value="GraduationCap">🎓 Graduation Cap</option>
                          <option value="Trophy">🏆 Trophy / Placement</option>
                          <option value="Award">🎖️ Award / Accreditation</option>
                          <option value="Bell">🔔 Notification Bell</option>
                          <option value="Globe">🌐 Globe / Web Portal</option>
                          <option value="FileText">📄 Document / Circular</option>
                        </select>
                      </div>
                    </div>

                    {navButtonForm.actionType === 'tab' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Destination Page Tab
                        </label>
                        <select
                          value={navButtonForm.targetTab}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, targetTab: e.target.value as NavigationTab })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="admissions">Admissions & Online Form</option>
                          <option value="placement">Placement & Career Cell</option>
                          <option value="department">Engineering Departments</option>
                          <option value="facilities">Campus Facilities & Labs</option>
                          <option value="campus">Campus Life & Events</option>
                          <option value="naac">NAAC Accreditation & SSR</option>
                          <option value="iqac">IQAC Quality Assurance</option>
                          <option value="notifications">Circulars & Announcements</option>
                          <option value="contact">Contact & Enquiry</option>
                          <option value="about">About VINS College</option>
                        </select>
                      </div>
                    )}

                    {navButtonForm.actionType === 'url' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          External / Portal URL Link <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={navButtonForm.targetUrl}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, targetUrl: e.target.value })}
                          placeholder="https://vinsengineeringcollege.org/login.php or payment gateway URL"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#363538]"
                        />
                        <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs font-medium text-slate-700">
                          <input
                            type="checkbox"
                            checked={navButtonForm.openInNewTab}
                            onChange={(e) => setNavButtonForm({ ...navButtonForm, openInNewTab: e.target.checked })}
                            className="rounded text-[#363538]"
                          />
                          <span>Open in new browser tab</span>
                        </label>
                      </div>
                    )}

                    {navButtonForm.actionType === 'anchor' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Section Anchor ID
                        </label>
                        <input
                          type="text"
                          value={navButtonForm.targetAnchor}
                          onChange={(e) => setNavButtonForm({ ...navButtonForm, targetAnchor: e.target.value })}
                          placeholder="e.g. online-form, scholarships, vision, fees"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#363538]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Optional Badge Text (e.g., NEW, 2026, APPLY)
                      </label>
                      <input
                        type="text"
                        value={navButtonForm.badge}
                        onChange={(e) => setNavButtonForm({ ...navButtonForm, badge: e.target.value })}
                        placeholder="e.g. NEW, LIVE, 2026"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-[#363538]"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Create Button & Publish Instantly</span>
                    </button>
                  </form>
                </div>

                {/* Existing Custom Buttons List */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-[#363538]">
                        Active Navigation & Action Buttons ({customNavButtons.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Any button created here renders immediately in the header and navbar. Toggle or remove anytime.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {customNavButtons.map((btn) => (
                      <div
                        key={btn.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          btn.isActive 
                            ? 'bg-white border-slate-300 shadow-xs' 
                            : 'bg-slate-100 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold flex items-center gap-1.5 ${
                              btn.buttonStyle === 'accent'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : btn.buttonStyle === 'solid'
                                ? 'bg-[#363538] text-white'
                                : 'bg-slate-100 text-slate-800 border border-slate-300'
                            }`}>
                              <span>{btn.label}</span>
                              {btn.badge && (
                                <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded text-[9px] font-black uppercase">
                                  {btn.badge}
                                </span>
                              )}
                            </span>

                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              Location: {btn.location}
                            </span>

                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                              {btn.actionType === 'tab' ? `Tab: ${btn.targetTab}` : btn.actionType === 'url' ? `Link: ${btn.targetUrl}` : `Section: ${btn.targetAnchor}`}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 truncate">
                            {btn.actionType === 'url' ? btn.targetUrl : `Direct internal route to ${btn.targetTab || 'home'}`}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              toggleCustomNavButton(btn.id);
                              showToast(`Button "${btn.label}" ${btn.isActive ? 'hidden' : 'activated'}.`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              btn.isActive
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {btn.isActive ? 'Active (Live)' : 'Hidden'}
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete button "${btn.label}"?`)) {
                                deleteCustomNavButton(btn.id);
                                showToast(`Deleted button "${btn.label}"`);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {customNavButtons.length === 0 && (
                      <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
                        <Sparkles className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm font-bold text-slate-700">No custom navigation buttons yet</p>
                        <p className="text-xs text-slate-500 mt-1">Use the form on the left to add any button instantly.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: SITE TNEA CODE, TICKER & LIVE BANNER MANAGER */}
            {activeTab === 'banner' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* TNEA Code & Marquee Ticker Settings */}
                <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        TNEA Counselling Code & Ticker Headline
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Configure official government counselling identification code and the marquee news ticker title.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveThemeSettings} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        TNEA Counselling Code
                      </label>
                      <input
                        type="text"
                        value={themeForm.tneaCode}
                        onChange={(e) => setThemeForm({ ...themeForm, tneaCode: e.target.value })}
                        placeholder="e.g. 4982"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#363538]"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">Displayed in header badge and admissions announcements.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Running Marquee Ticker Headline
                      </label>
                      <input
                        type="text"
                        value={themeForm.tickerTitle}
                        onChange={(e) => setThemeForm({ ...themeForm, tickerTitle: e.target.value })}
                        placeholder="e.g. LIVE CIRCULARS"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Save Code & Ticker Headline</span>
                    </button>
                  </form>
                </div>

                {/* Top Site Announcement Banner */}
                <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-amber-500" />
                        Top Announcement / Alert Banner
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Prominently display admissions alerts, urgent notices, or circulars right across the top of all pages.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveBannerSettings} className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Enable Banner Broadcast</span>
                        <span className="text-[11px] text-slate-500">Show or hide banner on live site</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bannerForm.enabled}
                          onChange={(e) => setBannerForm({ ...bannerForm, enabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Banner Category / Alert Type
                      </label>
                      <select
                        value={bannerForm.type}
                        onChange={(e) => setBannerForm({ ...bannerForm, type: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                      >
                        <option value="announcement">Announcement (Warm Amber Highlight)</option>
                        <option value="alert">Urgent Alert (Red Urgent Notice)</option>
                        <option value="info">General Info (Navy Academic)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Banner Message Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={bannerForm.message}
                        onChange={(e) => setBannerForm({ ...bannerForm, message: e.target.value })}
                        placeholder="e.g. Admissions Open 2026-27 for Engineering, MBA & MCA. Counselling Code: 4982"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Action Button Text
                        </label>
                        <input
                          type="text"
                          value={bannerForm.linkText}
                          onChange={(e) => setBannerForm({ ...bannerForm, linkText: e.target.value })}
                          placeholder="e.g. Apply Now, View Notice"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Action Link Target
                        </label>
                        <input
                          type="text"
                          value={bannerForm.linkUrl}
                          onChange={(e) => setBannerForm({ ...bannerForm, linkUrl: e.target.value })}
                          placeholder="e.g. #admissions, https://..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#363538]"
                    >
                      <Megaphone className="w-4 h-4 text-amber-400" />
                      <span>Update Announcement Banner</span>
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* TAB 1: GALLERY IMAGES MANAGER */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form to Add New Gallery Image */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Add New Gallery Image
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Live Upload</span>
                  </div>

                  <form onSubmit={handleAddGallery} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Image Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Annual Day Dance Fest or Robotics Lab Demo"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      >
                        <option value="Cultural Dance">Cultural Dance</option>
                        <option value="Ceremony">Ceremony & Inauguration</option>
                        <option value="Campus">Campus Life & Scenery</option>
                        <option value="Awards">Awards & Medals</option>
                        <option value="Workshop">Workshop & Labs</option>
                        <option value="Seminar">Seminar & Keynote</option>
                        <option value="Sports">Sports & Athletics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Description / Caption
                      </label>
                      <textarea
                        rows={2}
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        placeholder="e.g. Students performing during the annual cultural fest celebration..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    {/* Image Source: Upload from Device OR Pick from Media */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Choose Image Source *
                      </label>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, (url) => setGalleryForm(prev => ({ ...prev, imagePath: url, previewUrl: url })))}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget((path) => setGalleryForm(prev => ({ ...prev, imagePath: path, previewUrl: path })))}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-sky-600" />
                          <span>Pick Existing</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        value={galleryForm.imagePath}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imagePath: e.target.value, previewUrl: e.target.value })}
                        placeholder="Or enter Image URL / path..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    {/* Image Preview Box */}
                    {galleryForm.imagePath && (
                      <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 block">Live Preview:</span>
                        <div className="w-full h-36 rounded-lg overflow-hidden bg-black/10">
                          <img 
                            src={galleryForm.imagePath} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save & Publish to Gallery</span>
                    </button>
                  </form>
                </div>

                {/* Existing Gallery Photos List */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#363538]">
                      Published Gallery Items ({galleryImages.length})
                    </h3>
                    <span className="text-xs text-slate-500">Connected to Home & Campus views</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                    {galleryImages.map((img) => (
                      <div 
                        key={img.id}
                        className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#363538] transition-all flex flex-col justify-between space-y-2 group"
                      >
                        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-100">
                          <img 
                            src={img.imagePath} 
                            alt={img.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#363538]/90 text-white uppercase">
                            {img.category}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{img.title}</h4>
                          {img.description && (
                            <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{img.description}</p>
                          )}
                          <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{img.imagePath}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingImageItem({
                                type: 'gallery',
                                data: {
                                  id: img.id,
                                  title: img.title,
                                  category: img.category,
                                  description: img.description || '',
                                  imagePath: img.imagePath
                                }
                              });
                            }}
                            className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete gallery image "${img.title}"?`)) {
                                deleteGalleryImage(img.id);
                                showToast('Deleted gallery image');
                              }
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PDF & DOCUMENT UPLOADER */}
            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form to Upload PDF */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-600" />
                      Upload Official College PDF
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Direct PDF</span>
                  </div>

                  <form onSubmit={handleAddDocument} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Document Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={docForm.title}
                        onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                        placeholder="e.g. College Prospectus 2027-28 or AICTE Approval"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={docForm.category}
                          onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                        >
                          <option value="Prospectus & Admissions">Prospectus & Admissions</option>
                          <option value="Circulars & Notices">Circulars & Notices</option>
                          <option value="AICTE & Approvals">AICTE & Approvals</option>
                          <option value="NIRF & Ranking">NIRF & Ranking</option>
                          <option value="Mandatory Disclosures">Mandatory Disclosures</option>
                          <option value="Scholarship Forms">Scholarship Forms</option>
                          <option value="Academic Curriculum">Academic Curriculum</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          File Type
                        </label>
                        <select
                          value={docForm.fileType}
                          onChange={(e) => setDocForm({ ...docForm, fileType: e.target.value as 'PDF' | 'DOCX' })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                        >
                          <option value="PDF">PDF File (.pdf)</option>
                          <option value="DOCX">Word Document (.docx)</option>
                        </select>
                      </div>
                    </div>

                    {/* PDF File Upload Input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Upload PDF Document *
                      </label>

                      <label className="border-2 border-dashed border-slate-300 hover:border-[#363538] bg-slate-50 hover:bg-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                        <Upload className="w-8 h-8 text-sky-600 mb-2" />
                        <span className="text-xs font-bold text-slate-800">
                          {docForm.filename ? `Selected: ${docForm.filename}` : 'Click or Drag & Drop PDF here'}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1">
                          Supports real PDF files with instant embedded browser viewing!
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.doc,application/pdf"
                          onChange={handlePdfFileUpload}
                          className="hidden"
                        />
                      </label>

                      {docForm.path && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            {docForm.filename} ({docForm.fileSize})
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedDocPreview({
                              id: 'temp-preview',
                              title: docForm.title || 'Document Preview',
                              filename: docForm.filename || 'doc.pdf',
                              path: docForm.path,
                              fileSize: docForm.fileSize,
                              fileType: docForm.fileType,
                              description: docForm.description
                            })}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700"
                          >
                            Test Preview
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Description / Summary
                      </label>
                      <textarea
                        rows={2}
                        value={docForm.description}
                        onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
                        placeholder="Brief summary of what this document contains..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Publish PDF Document</span>
                    </button>
                  </form>
                </div>

                {/* Published Documents List */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#363538]">
                      Published PDF Documents ({documents.length})
                    </h3>
                    <span className="text-xs text-slate-500">Accessible across Admissions & Circulars</span>
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#363538] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700">
                                {doc.fileSize}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{doc.description}</p>
                            <span className="text-[10px] font-mono text-slate-400 truncate block mt-0.5">{doc.filename}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => setSelectedDocPreview(doc)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-[#363538] hover:text-white text-slate-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Remove document "${doc.title}"?`)) {
                                deleteDocument(doc.id);
                                showToast('Document deleted');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: CAMPUS EVENTS & COLLEGE DAY */}
            {activeTab === 'events' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Add Event Form */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Add Event & Fest Photos
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Campus Events</span>
                  </div>

                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        placeholder="e.g. Annual Cultural Extravaganza 2027"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={eventForm.category}
                          onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                        >
                          <option value="Cultural Dance">Cultural Dance</option>
                          <option value="Ceremony">Ceremony & Inauguration</option>
                          <option value="Awards">Awards & Medals</option>
                          <option value="Workshop">Workshop & Hackathon</option>
                          <option value="Seminar">Seminar & Guest Lecture</option>
                          <option value="Campus">Campus & Sports</option>
                          <option value="Finale">Grand Finale</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Event Date
                        </label>
                        <input
                          type="text"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          placeholder="e.g. April 12, 2027"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Chief Guest / Dignitary (Optional)
                      </label>
                      <input
                        type="text"
                        value={eventForm.chiefGuest}
                        onChange={(e) => setEventForm({ ...eventForm, chiefGuest: e.target.value })}
                        placeholder="e.g. Dr. R. Velraj, Vice Chancellor"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    {/* Image Selection / Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Event Photo *
                      </label>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, (url) => setEventForm(prev => ({ ...prev, imagePath: url })))}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget((path) => setEventForm(prev => ({ ...prev, imagePath: path })))}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-sky-600" />
                          <span>Pick from Assets</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        value={eventForm.imagePath}
                        onChange={(e) => setEventForm({ ...eventForm, imagePath: e.target.value })}
                        placeholder="Image URL or path..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    {eventForm.imagePath && (
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={eventForm.imagePath} alt="Event Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Add to Campus Events</span>
                    </button>
                  </form>
                </div>

                {/* Published Events */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#363538]">
                      College Events & Celebrations ({events.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                    {events.map((evt) => (
                      <div 
                        key={evt.id}
                        className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#363538] transition-all flex flex-col justify-between space-y-2 group"
                      >
                        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-100">
                          <img 
                            src={evt.imagePath} 
                            alt={evt.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#363538]/90 text-white uppercase">
                            {evt.category}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{evt.title}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold">{evt.date}</span>
                          {evt.chiefGuest && (
                            <p className="text-[10px] text-purple-700 font-medium truncate mt-0.5">Guest: {evt.chiefGuest}</p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingImageItem({
                                type: 'event',
                                data: {
                                  id: evt.id,
                                  title: evt.title,
                                  subtitle: evt.subtitle || 'College Event',
                                  category: evt.category,
                                  date: evt.date,
                                  chiefGuest: evt.chiefGuest || '',
                                  description: evt.description || '',
                                  imagePath: evt.imagePath
                                }
                              });
                            }}
                            className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Remove event "${evt.title}"?`)) {
                                deleteEvent(evt.id);
                                showToast('Event removed');
                              }
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: HERO CAROUSEL SLIDES */}
            {activeTab === 'slides' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Add Slide */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <Layout className="w-4 h-4 text-emerald-600" />
                      Add / Edit Hero Slide
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Homepage Carousel</span>
                  </div>

                  <form onSubmit={handleAddSlide} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Slide Headline *
                      </label>
                      <input
                        type="text"
                        required
                        value={slideForm.title}
                        onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                        placeholder="e.g. Modern Engineering Campus at Chunkankadai"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Slide Subtitle / Description
                      </label>
                      <input
                        type="text"
                        value={slideForm.subtitle}
                        onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                        placeholder="e.g. State of the art computing, robotics and sports arenas"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Slide Photo *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, (url) => setSlideForm(prev => ({ ...prev, visualUrl: url })))}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget((path) => setSlideForm(prev => ({ ...prev, visualUrl: path })))}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-sky-600" />
                          <span>Pick from Assets</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        value={slideForm.visualUrl}
                        onChange={(e) => setSlideForm({ ...slideForm, visualUrl: e.target.value })}
                        placeholder="Image URL or path..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    {slideForm.visualUrl && (
                      <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={slideForm.visualUrl} alt="Slide Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Slide to Carousel</span>
                    </button>
                  </form>
                </div>

                {/* Slides List */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#363538]">
                      Active Hero Slides ({heroSlides.length})
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {heroSlides.map((slide, idx) => (
                      <div 
                        key={slide.id}
                        className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#363538] transition-all flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-xs flex items-center justify-center text-slate-700 shrink-0">
                            {idx + 1}
                          </span>
                          <div className="w-20 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            <img src={slide.visualUrl} alt={slide.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{slide.title}</h4>
                            <p className="text-[11px] text-slate-500 truncate">{slide.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingImageItem({
                                type: 'slide',
                                data: {
                                  id: String(slide.id),
                                  title: slide.title,
                                  subtitle: slide.subtitle,
                                  imagePath: slide.visualUrl
                                }
                              });
                            }}
                            className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Slide"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (heroSlides.length <= 1) {
                                alert('At least one hero slide must remain.');
                                return;
                              }
                              deleteHeroSlide(slide.id);
                              showToast('Slide removed');
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: DEPARTMENT & LAB PHOTOS MANAGER */}
            {activeTab === 'departments' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="font-bold text-lg text-[#363538] flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-600" />
                      Department Media & Lab Photo Power Console
                    </h3>
                    <p className="text-xs text-slate-500">
                      Upload and update Department Banners, HOD portraits, Course thumbnails, and Lab facilities across all 14 degrees.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-700">Select Department:</label>
                    <select
                      value={selectedDeptId}
                      onChange={(e) => setSelectedDeptId(e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#363538]"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.degree} - {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {(() => {
                  const currentDept = departments.find(d => d.id === selectedDeptId);
                  if (!currentDept) return null;

                  return (
                    <form onSubmit={handleSaveDeptImages} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Course Card Thumbnail */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-800 block">1. Course Card Thumbnail</span>
                          <div className="w-full h-36 bg-slate-200 rounded-lg overflow-hidden">
                            <img 
                              src={deptImageForm.courseImage || currentDept.courseImage || '/images/course img/cse.jpg'} 
                              alt="Course Card" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 text-center py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                              Upload New
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageFileUpload(e, (url) => setDeptImageForm(prev => ({ ...prev, courseImage: url })))}
                                className="hidden" 
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget((path) => setDeptImageForm(prev => ({ ...prev, courseImage: path })))}
                              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                            >
                              Pick
                            </button>
                          </div>
                        </div>

                        {/* Department Banner Image */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-800 block">2. Department Header Banner</span>
                          <div className="w-full h-36 bg-slate-200 rounded-lg overflow-hidden">
                            <img 
                              src={deptImageForm.bannerPath || currentDept.bannerPath} 
                              alt="Department Banner" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 text-center py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                              Upload New
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageFileUpload(e, (url) => setDeptImageForm(prev => ({ ...prev, bannerPath: url })))}
                                className="hidden" 
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget((path) => setDeptImageForm(prev => ({ ...prev, bannerPath: path })))}
                              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                            >
                              Pick
                            </button>
                          </div>
                        </div>

                        {/* Lab 1 Facility Photo */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-800 block">3. Primary Research Lab (Lab 1)</span>
                          <div className="w-full h-32 bg-slate-200 rounded-lg overflow-hidden">
                            <img 
                              src={deptImageForm.lab1 || currentDept.labPaths.lab1} 
                              alt="Lab 1" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 text-center py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                              Upload Lab 1
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageFileUpload(e, (url) => setDeptImageForm(prev => ({ ...prev, lab1: url })))}
                                className="hidden" 
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget((path) => setDeptImageForm(prev => ({ ...prev, lab1: path })))}
                              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                            >
                              Pick
                            </button>
                          </div>
                        </div>

                        {/* Lab 2 Facility Photo */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-800 block">4. Advanced Computing / Hardware (Lab 2)</span>
                          <div className="w-full h-32 bg-slate-200 rounded-lg overflow-hidden">
                            <img 
                              src={deptImageForm.lab2 || currentDept.labPaths.lab2} 
                              alt="Lab 2" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 text-center py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                              Upload Lab 2
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageFileUpload(e, (url) => setDeptImageForm(prev => ({ ...prev, lab2: url })))}
                                className="hidden" 
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget((path) => setDeptImageForm(prev => ({ ...prev, lab2: path })))}
                              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                            >
                              Pick
                            </button>
                          </div>
                        </div>

                      </div>

                      <div className="text-right pt-4 border-t border-slate-200">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer inline-flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Save & Apply Department Photos</span>
                        </button>
                      </div>
                    </form>
                  );
                })()}

              </div>
            )}

            {/* TAB 6: FLASH NEWS & ANNOUNCEMENTS */}
            {activeTab === 'notifications' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form to Add Notification */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-[#363538] flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-amber-600" />
                      Broadcast Live Flash News
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Ticker & Circulars</span>
                  </div>

                  <form onSubmit={handleAddNotification} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Announcement Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={notifForm.title}
                        onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                        placeholder="e.g. Anna University Practical Exam Hall Tickets Released"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={notifForm.category}
                          onChange={(e) => setNotifForm({ ...notifForm, category: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                        >
                          <option value="Admissions">Admissions</option>
                          <option value="Exams">Exams</option>
                          <option value="Placements">Placements</option>
                          <option value="Circulars">Circulars</option>
                          <option value="Events">Events</option>
                          <option value="Scholarships">Scholarships</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifForm.isUrgent}
                            onChange={(e) => setNotifForm({ ...notifForm, isUrgent: e.target.checked })}
                            className="w-4 h-4 text-red-600 rounded"
                          />
                          <span className="text-xs font-bold text-red-600 uppercase">Mark Urgent Alert</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Attach Uploaded PDF Circular (Optional)
                      </label>
                      <select
                        value={notifForm.attachDocId}
                        onChange={(e) => setNotifForm({ ...notifForm, attachDocId: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      >
                        <option value="">-- No PDF Attachment --</option>
                        {documents.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.title} ({d.fileSize})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Summary Text *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={notifForm.summary}
                        onChange={(e) => setNotifForm({ ...notifForm, summary: e.target.value })}
                        placeholder="Brief circular text shown on marquee and live news..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#363538] focus:outline-none focus:border-[#363538]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#363538] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Megaphone className="w-4 h-4" />
                      <span>Broadcast Live Announcement</span>
                    </button>
                  </form>
                </div>

                {/* Existing Circulars */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#363538]">
                      Active Live Announcements ({notifications.length})
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div 
                        key={n.id}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#363538] transition-all flex flex-col justify-between space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              n.isUrgent ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-200 text-slate-800'
                            }`}>
                              {n.category}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold">{n.date}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm(`Remove notice "${n.title}"?`)) {
                                deleteNotification(n.id);
                                showToast('Notice deleted');
                              }
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{n.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{n.summary}</p>

                        {n.pdfAttachment && (
                          <div className="pt-2 flex items-center gap-2 text-xs text-slate-700 font-semibold">
                            <FileText className="w-3.5 h-3.5 text-red-600" />
                            <span>Attached: {n.pdfAttachment.title}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 7: MEDIA EXPLORER */}
            {activeTab === 'media' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="font-bold text-lg text-[#363538] flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-sky-600" />
                      All Connected College Media Assets ({mediaAssets.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      All official high-res imagery pre-connected to the portal. Click any asset to copy its path or preview.
                    </p>
                  </div>

                  <label className="px-4 py-2 bg-[#363538] hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Asset to Library</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, () => {})}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto p-1">
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="bg-slate-50 rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between space-y-2 hover:border-[#363538] hover:shadow-md transition-all group"
                    >
                      <div className="w-full h-28 bg-slate-200 rounded-lg overflow-hidden">
                        <img 
                          src={asset.path} 
                          alt={asset.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">{asset.category}</span>
                        <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1">{asset.name}</h4>
                        <span className="text-[9px] font-mono text-slate-500 truncate block">{asset.path}</span>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        <button
                          onClick={() => {
                            setEditingImageItem({
                              type: 'media',
                              data: {
                                id: asset.id,
                                title: asset.name,
                                category: asset.category,
                                imagePath: asset.path
                              }
                            });
                          }}
                          className="flex-1 py-1 bg-white hover:bg-sky-50 border border-slate-300 text-sky-700 text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer"
                          title="Edit Image Details"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(asset.path);
                            showToast(`Copied path: ${asset.path}`);
                          }}
                          className="flex-1 py-1 bg-white hover:bg-slate-200 border border-slate-300 text-slate-800 text-[10px] font-bold rounded cursor-pointer"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove media asset "${asset.name}"?`)) {
                              deleteMediaAsset(asset.id);
                              showToast('Media asset removed');
                            }
                          }}
                          className="p-1 bg-white hover:bg-red-50 border border-slate-300 text-red-600 rounded cursor-pointer"
                          title="Delete Asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Edit Image Modal */}
      {editingImageItem && (
        <EditImageModal
          isOpen={!!editingImageItem}
          onClose={() => setEditingImageItem(null)}
          initialData={editingImageItem.data}
          type={editingImageItem.type}
          onSave={handleSaveEditedImage}
          onPickExisting={(callback) => setMediaPickerTarget(() => callback)}
        />
      )}

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <DocumentViewerModal
          document={selectedDocPreview}
          onClose={() => setSelectedDocPreview(null)}
        />
      )}

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-[#363538]">Pick from Known Media Assets</h3>
              <button 
                onClick={() => setMediaPickerTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    mediaPickerTarget(asset.path);
                    setMediaPickerTarget(null);
                  }}
                  className="group rounded-xl overflow-hidden border border-slate-200 hover:border-sky-500 cursor-pointer p-1.5 transition-all bg-slate-50 hover:bg-sky-50"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
                    <img src={asset.path} alt={asset.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 truncate mt-1">{asset.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
