import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  GALLERY_IMAGES as INITIAL_GALLERY_IMAGES, 
  COLLEGE_DAY_GALLERY as INITIAL_COLLEGE_DAY_GALLERY,
  DOCUMENTS_LIST as INITIAL_DOCUMENTS_LIST,
  HERO_SLIDES as INITIAL_HERO_SLIDES,
  CollegeDayGalleryItem
} from '../data/collegeData';
import { DEPARTMENTS_DATA as INITIAL_DEPARTMENTS_DATA } from '../data/departmentsData';
import { NOTIFICATIONS_DATA as INITIAL_NOTIFICATIONS_DATA, CollegeNotification } from '../data/notificationsData';
import { GalleryImage, DocumentItem, DepartmentItem, CustomNavButton, SiteThemeConfig, SiteBannerAnnouncement, ThemePreset } from '../types';
import {
  fetchEvents,
  createEventApi,
  updateEventApi,
  deleteEventApi,
  fetchNotifications,
  createNotificationApi,
  updateNotificationApi,
  deleteNotificationApi,
  fetchDocuments,
  createDocumentApi,
  updateDocumentApi,
  deleteDocumentApi,
  fetchGalleryImages,
  createGalleryImageApi,
  updateGalleryImageApi,
  deleteGalleryImageApi,
  fetchSettings,
  updateSettingApi,
  clearAdminToken
} from '../services/api';

export interface HeroSlideItem {
  id: number;
  title: string;
  subtitle: string;
  imagePath?: string;
  visualUrl: string;
}

export interface AvailableMediaAsset {
  id: string;
  name: string;
  path: string;
  category: 'slides' | 'events' | 'courses' | 'placement' | 'people' | 'logo' | 'campus';
}

export const INITIAL_CUSTOM_NAV_BUTTONS: CustomNavButton[] = [
  {
    id: 'btn-circulars',
    label: 'Live Circulars',
    actionType: 'tab',
    targetTab: 'notifications',
    location: 'topbar',
    badge: 'LIVE',
    iconName: 'Bell',
    isActive: true,
    buttonStyle: 'subtle'
  }
];

export const INITIAL_THEME_CONFIG: SiteThemeConfig = {
  themeId: 'navy-gold',
  primaryColor: '#0a192f',
  accentColor: '#d97706',
  tneaCode: '4982',
  phonePrimary: '+91 4652 259680',
  emailPrimary: 'info@vinsengineeringcollege.org',
  collegeMotto: 'Excellence in Education, Character for Life',
  bannerTitle: 'ADMISSIONS OPEN 2027-2028 | Anna University Code: 4982'
};

export const INITIAL_SITE_BANNER: SiteBannerAnnouncement = {
  isActive: true,
  headline: 'Academic Year 2027 - 2028 Admissions Open!',
  message: 'Apply for B.E. / B.Tech / M.E. / MBA degree programs. Anna University Counselling Code: 4982.',
  badge: 'ADMISSIONS 2027-28',
  buttonText: 'Apply Online',
  buttonTab: 'admissions',
  type: 'admissions'
};

export const KNOWN_MEDIA_ASSETS: AvailableMediaAsset[] = [
  // Slides & Campus Backgrounds
  { id: 'bg-windows', name: 'VINS Campus Landscape (Windows / Desktop BG)', path: '/images/clg photo/vins colleg bg windows  img.png', category: 'slides' },
  { id: 'bg-mobile', name: 'VINS Campus Portrait (Mobile View BG)', path: '/images/clg photo/vins clg bg mobile view img.png', category: 'slides' },
  { id: 'slide-3', name: 'Hero Slide 3 - Engineering Complex', path: '/images/slide images/3.jpg', category: 'slides' },
  { id: 'slide-4', name: 'Hero Slide 4 - Central Library', path: '/images/slide images/4.jpg', category: 'slides' },
  { id: 'slide-5', name: 'Hero Slide 5 - Placement Arena', path: '/images/slide images/5.jpg', category: 'slides' },
  { id: 'slide-6', name: 'Hero Slide 6 - Computing Center', path: '/images/slide images/6.jpg', category: 'slides' },
  { id: 'slide-7', name: 'Hero Slide 7 - Campus Life', path: '/images/slide images/7.jpg', category: 'slides' },
  { id: 'slide-8', name: 'Hero Slide 8 - Smart Classrooms', path: '/images/slide images/8.jpg', category: 'slides' },
  { id: 'slide-10', name: 'Hero Slide 10 - Tech Fest & Events', path: '/images/slide images/10.jpg', category: 'slides' },

  // College Events Gallery
  { id: 'evt-h1', name: 'Stage Inauguration & Lamp Lighting', path: '/images/college events and news galeery/h1.jpg', category: 'events' },
  { id: 'evt-h2', name: 'Chief Guest Dignitary Honor', path: '/images/college events and news galeery/h2.jpg', category: 'events' },
  { id: 'evt-h3', name: 'Classical & Cultural Dance Fest', path: '/images/college events and news galeery/h3.jpg', category: 'events' },
  { id: 'evt-h4', name: 'Hillside Walkway & Campus Scenery', path: '/images/college events and news galeery/h4.jpg', category: 'events' },
  { id: 'evt-h5', name: 'Academic Quadrangle Architecture', path: '/images/college events and news galeery/h5.jpg', category: 'events' },
  { id: 'evt-h6', name: 'Library Garden Walkway', path: '/images/college events and news galeery/h6.jpg', category: 'events' },
  { id: 'evt-h8', name: 'Conference Auditorium Complex', path: '/images/college events and news galeery/h8.jpg', category: 'events' },
  { id: 'evt-h9', name: 'Campus Aerial Panorama', path: '/images/college events and news galeery/h9.jpg', category: 'events' },
  { id: 'evt-h10', name: 'AI & GPU Computing Lab', path: '/images/college events and news galeery/h10.jpg', category: 'events' },
  { id: 'evt-h11', name: 'Robotics Workshop & Lab', path: '/images/college events and news galeery/h11.jpg', category: 'events' },
  { id: 'evt-h12', name: 'Symposium Keynote Session', path: '/images/college events and news galeery/h12.jpg', category: 'events' },
  { id: 'evt-h13', name: 'Placement Orientation Drive', path: '/images/college events and news galeery/h13.jpg', category: 'events' },
  { id: 'evt-h14', name: 'NSS Social Service Gathering', path: '/images/college events and news galeery/h14.jpg', category: 'events' },
  { id: 'evt-h15', name: 'Sports Championship Presentation', path: '/images/college events and news galeery/h15.jpg', category: 'events' },
  { id: 'evt-1-1', name: 'Event Ceremony Lighting', path: '/images/college events and news galeery/1 (1).jpg', category: 'events' },
  { id: 'evt-1-2', name: 'Guest Felicitation Session', path: '/images/college events and news galeery/1 (2).jpg', category: 'events' },
  { id: 'evt-2-1', name: 'Student Dance Performance', path: '/images/college events and news galeery/2 (1).jpg', category: 'events' },
  { id: 'evt-3-1', name: 'Gold Medal Award Distribution', path: '/images/college events and news galeery/3 (1).jpg', category: 'events' },
  { id: 'evt-4-1', name: 'Technical Workshop Session', path: '/images/college events and news galeery/4 (1).jpg', category: 'events' },
  { id: 'evt-5-1', name: 'Campus Gathering Quadrangle', path: '/images/college events and news galeery/5 (1).jpg', category: 'events' },
  { id: 'evt-6-1', name: 'Evening Stage Drama & Music', path: '/images/college events and news galeery/6 (1).jpg', category: 'events' },
  { id: 'evt-7-1', name: 'Industry Expert Guest Lecture', path: '/images/college events and news galeery/7 (1).jpg', category: 'events' },
  { id: 'evt-8-1', name: 'Championship Trophy Celebration', path: '/images/college events and news galeery/8 (1).jpg', category: 'events' },

  // Course / Department Images
  { id: 'crs-cse', name: 'Computer Science & Engineering', path: '/images/course img/cse.jpg', category: 'courses' },
  { id: 'crs-aids', name: 'AI & Data Science', path: '/images/course img/aids.jpg', category: 'courses' },
  { id: 'crs-aiml', name: 'AI & Machine Learning', path: '/images/course img/aiml.jpg', category: 'courses' },
  { id: 'crs-cyber', name: 'Cybersecurity Engineering', path: '/images/course img/cyber.jpg', category: 'courses' },
  { id: 'crs-ece', name: 'Electronics & Communication', path: '/images/course img/ece.jpg', category: 'courses' },
  { id: 'crs-eee', name: 'Electrical & Electronics', path: '/images/course img/eee.jpg', category: 'courses' },
  { id: 'crs-mech', name: 'Mechanical Engineering', path: '/images/course img/mech.jpg', category: 'courses' },
  { id: 'crs-civil', name: 'Civil Engineering', path: '/images/course img/civil.jpg', category: 'courses' },
  { id: 'crs-agri', name: 'Agricultural Engineering', path: '/images/course img/agri.jpg', category: 'courses' },
  { id: 'crs-it', name: 'Information Technology', path: '/images/course img/it.jpg', category: 'courses' },
  { id: 'crs-mba', name: 'Master of Business Administration', path: '/images/course img/mba.jpg', category: 'courses' },
  { id: 'crs-me-cse', name: 'M.E. Computer Science', path: '/images/course img/me cse.jpg', category: 'courses' },
  { id: 'crs-me-comm', name: 'M.E. Communication Systems', path: '/images/course img/me communicationn.jpg', category: 'courses' },
  { id: 'crs-me-const', name: 'M.E. Construction Management', path: '/images/course img/me construction.jpg', category: 'courses' },

  // Key People & Branding
  { id: 'ppl-chair', name: 'Founder Chairman Nanjil M. Vincent', path: '/images/chairman and pricipal img/chairman img.jpg', category: 'people' },
  { id: 'ppl-princ', name: 'Principal Dr. J.A. Alex Rajju Balan', path: '/images/chairman and pricipal img/principal img.jpg', category: 'people' },
  { id: 'logo-crest', name: 'VINS Official Emblem Crest (PNG)', path: '/images/logo/vins logo.png', category: 'logo' },
  { id: 'logo-spell', name: 'VINS College Spell Logo', path: '/images/logo/vins spell logo.png', category: 'logo' },
  { id: 'logo-naac', name: 'NAAC Accreditation Badge', path: '/images/logo/naac.png', category: 'logo' },
  { id: 'logo-nirf', name: 'NIRF Ranking Emblem', path: '/images/logo/nirf.jpeg', category: 'logo' },
  { id: 'bg-campus', name: 'VINS Main Campus Panorama Background', path: '/images/college events and news galeery/h9.jpg', category: 'campus' },
];

interface AdminDataContextType {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (status: boolean) => void;
  
  // Custom Navigation & Action Buttons
  customNavButtons: CustomNavButton[];
  addCustomNavButton: (btn: Omit<CustomNavButton, 'id'> & { id?: string }) => void;
  deleteCustomNavButton: (id: string) => void;
  updateCustomNavButton: (btn: CustomNavButton) => void;
  toggleCustomNavButton: (id: string) => void;

  // Site Theme & Branding Palette
  siteTheme: SiteThemeConfig;
  updateSiteTheme: (theme: Partial<SiteThemeConfig>) => void;
  setThemePreset: (preset: ThemePreset) => void;

  // Top Announcement Banner
  siteBanner: SiteBannerAnnouncement;
  updateSiteBanner: (banner: Partial<SiteBannerAnnouncement>) => void;

  // Running Marquee Ticker Headline
  runningTickerTitle: string;
  setRunningTickerTitle: (title: string) => void;

  // Gallery Management
  galleryImages: GalleryImage[];
  addGalleryImage: (image: Omit<GalleryImage, 'id'> & { id?: string }) => void;
  deleteGalleryImage: (id: string) => void;
  updateGalleryImage: (image: GalleryImage) => void;

  // Documents & PDF Management
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id'> & { id?: string }) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (doc: DocumentItem) => void;

  // Campus Events & College Day
  events: CollegeDayGalleryItem[];
  addEvent: (event: Omit<CollegeDayGalleryItem, 'id'> & { id?: string }) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: CollegeDayGalleryItem) => void;

  // Hero Slides
  heroSlides: HeroSlideItem[];
  addHeroSlide: (slide: Omit<HeroSlideItem, 'id'> & { id?: number }) => void;
  deleteHeroSlide: (id: number) => void;
  updateHeroSlide: (slide: HeroSlideItem) => void;

  // Notifications & Flash News
  notifications: CollegeNotification[];
  addNotification: (notice: Omit<CollegeNotification, 'id'> & { id?: string }) => void;
  deleteNotification: (id: string) => void;
  updateNotification: (notice: CollegeNotification) => void;

  // Department custom images
  departments: DepartmentItem[];
  updateDepartmentImage: (deptId: string, updates: Partial<{
    bannerPath: string;
    courseImage: string;
    labPaths: { lab1: string; lab2: string; lab3: string; hod: string };
  }>) => void;

  // Media Library
  mediaAssets: AvailableMediaAsset[];
  addMediaAsset: (asset: AvailableMediaAsset) => void;
  updateMediaAsset: (asset: AvailableMediaAsset) => void;
  deleteMediaAsset: (id: string) => void;

  // Global Refresh from MySQL
  refreshData: () => Promise<void>;

  // Reset to Factory Defaults
  resetAllToDefaults: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  IS_AUTH: 'vins_admin_is_auth_v1',
  GALLERY: 'vins_admin_gallery_v1',
  DOCUMENTS: 'vins_admin_documents_v1',
  EVENTS: 'vins_admin_events_v1',
  SLIDES: 'vins_admin_slides_v1',
  NOTIFICATIONS: 'vins_admin_notifications_v1',
  DEPARTMENTS: 'vins_admin_departments_v1',
  MEDIA: 'vins_admin_media_v1',
  NAV_BUTTONS: 'vins_admin_nav_buttons_v1',
  SITE_THEME: 'vins_admin_site_theme_v1',
  SITE_BANNER: 'vins_admin_site_banner_v1',
  TICKER_TITLE: 'vins_admin_ticker_title_v1',
};

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedInState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_AUTH) === 'true';
  });

  const setIsAdminLoggedIn = (status: boolean) => {
    setIsAdminLoggedInState(status);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, status ? 'true' : 'false');
    if (!status) {
      clearAdminToken();
    }
  };

  // Custom Navigation Buttons
  const [customNavButtons, setCustomNavButtons] = useState<CustomNavButton[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NAV_BUTTONS);
      if (saved) {
        const parsed: CustomNavButton[] = JSON.parse(saved);
        return parsed.filter(b => 
          b.id !== 'btn-alumni-portal' && 
          b.label.toLowerCase() !== 'alumni portal' &&
          b.id !== 'btn-online-fee' &&
          !b.label.toLowerCase().includes('online fee') &&
          b.id !== 'btn-counselling' &&
          !b.label.toLowerCase().includes('tnea code')
        );
      }
    } catch {}
    return INITIAL_CUSTOM_NAV_BUTTONS;
  });

  // Site Theme Configuration
  const [siteTheme, setSiteTheme] = useState<SiteThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_THEME);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_THEME_CONFIG;
  });

  // Site Announcement Banner
  const [siteBanner, setSiteBanner] = useState<SiteBannerAnnouncement>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_BANNER);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SITE_BANNER;
  });

  // Running Marquee Ticker Title
  const [runningTickerTitle, setRunningTickerTitleState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKER_TITLE);
      if (saved && saved !== 'LIVE ANNOUNCEMENTS & CIRCULARS' && saved !== 'ANNOUNCEMENT') return saved;
    } catch {}
    return 'LIVE CIRCULARS';
  });

  // Gallery
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GALLERY_IMAGES;
  });

  // Documents
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DOCUMENTS_LIST;
  });

  // Events
  const [events, setEvents] = useState<CollegeDayGalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COLLEGE_DAY_GALLERY;
  });

  // Slides
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SLIDES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_HERO_SLIDES;
  });

  // Notifications
  const [notifications, setNotifications] = useState<CollegeNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS_DATA;
  });

  // Departments
  const [departments, setDepartments] = useState<DepartmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEPARTMENTS_DATA;
  });

  // Media Library
  const [mediaAssets, setMediaAssets] = useState<AvailableMediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (saved) return JSON.parse(saved);
    } catch {}
    return KNOWN_MEDIA_ASSETS;
  });

  // ── Sync from MySQL Backend on Mount & on Demand ─────────────
  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch Events from MySQL (always apply — even if empty array)
      const eventsRes = await fetchEvents();
      if (eventsRes.success && eventsRes.data) {
        setEvents(eventsRes.data);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventsRes.data));
      }

      // 2. Fetch Notifications from MySQL
      const notifRes = await fetchNotifications();
      if (notifRes.success && notifRes.data) {
        setNotifications(notifRes.data);
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifRes.data));
      }

      // 3. Fetch Documents from MySQL
      const docRes = await fetchDocuments();
      if (docRes.success && docRes.data) {
        setDocuments(docRes.data);
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docRes.data));
      }

      // 4. Fetch Gallery from MySQL
      const galRes = await fetchGalleryImages();
      if (galRes.success && galRes.data) {
        setGalleryImages(galRes.data);
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galRes.data));
      }

      // 5. Fetch Site Settings from MySQL
      const settingsRes = await fetchSettings();
      if (settingsRes.success && settingsRes.data) {
        if (settingsRes.data.site_theme) {
          const loadedTheme = typeof settingsRes.data.site_theme === 'string' 
            ? JSON.parse(settingsRes.data.site_theme) 
            : settingsRes.data.site_theme;
          setSiteTheme(loadedTheme);
          localStorage.setItem(STORAGE_KEYS.SITE_THEME, JSON.stringify(loadedTheme));
        }
        if (settingsRes.data.site_banner) {
          const loadedBanner = typeof settingsRes.data.site_banner === 'string' 
            ? JSON.parse(settingsRes.data.site_banner) 
            : settingsRes.data.site_banner;
          setSiteBanner(loadedBanner);
          localStorage.setItem(STORAGE_KEYS.SITE_BANNER, JSON.stringify(loadedBanner));
        }
        if (settingsRes.data.ticker_title) {
          const loadedTicker = typeof settingsRes.data.ticker_title === 'string' 
            ? settingsRes.data.ticker_title.replace(/^"|"$/g, '') 
            : settingsRes.data.ticker_title;
          setRunningTickerTitleState(loadedTicker);
          localStorage.setItem(STORAGE_KEYS.TICKER_TITLE, loadedTicker);
        }
      }
    } catch (err) {
      console.warn('[AdminDataContext] Failed to fetch data from MySQL backend, using local/cached state:', err);
    }
  }, []);

  // ── Helper: re-fetch a single entity collection from MySQL ─────
  const _refreshEvents = useCallback(async () => {
    const res = await fetchEvents();
    if (res.success && res.data) {
      setEvents(res.data);
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(res.data));
    }
  }, []);

  const _refreshNotifications = useCallback(async () => {
    const res = await fetchNotifications();
    if (res.success && res.data) {
      setNotifications(res.data);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(res.data));
    }
  }, []);

  const _refreshDocuments = useCallback(async () => {
    const res = await fetchDocuments();
    if (res.success && res.data) {
      setDocuments(res.data);
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(res.data));
    }
  }, []);

  const _refreshGallery = useCallback(async () => {
    const res = await fetchGalleryImages();
    if (res.success && res.data) {
      setGalleryImages(res.data);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(res.data));
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Local storage persistence helpers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NAV_BUTTONS, JSON.stringify(customNavButtons));
  }, [customNavButtons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_THEME, JSON.stringify(siteTheme));
  }, [siteTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_BANNER, JSON.stringify(siteBanner));
  }, [siteBanner]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  // ── Actions for Custom Nav Buttons ───────────────────────────
  const addCustomNavButton = (btn: Omit<CustomNavButton, 'id'> & { id?: string }) => {
    const newBtn: CustomNavButton = {
      id: btn.id || `btn-${Date.now()}`,
      label: btn.label,
      actionType: btn.actionType || 'tab',
      targetTab: btn.targetTab || 'admissions',
      targetUrl: btn.targetUrl,
      targetAnchor: btn.targetAnchor,
      location: btn.location || 'navbar',
      badge: btn.badge,
      iconName: btn.iconName || 'Sparkles',
      isActive: btn.isActive ?? true,
      openInNewTab: btn.openInNewTab,
      buttonStyle: btn.buttonStyle || 'solid'
    };
    setCustomNavButtons(prev => [newBtn, ...prev]);
  };

  const deleteCustomNavButton = (id: string) => {
    setCustomNavButtons(prev => prev.filter(b => b.id !== id));
  };

  const updateCustomNavButton = (btn: CustomNavButton) => {
    setCustomNavButtons(prev => prev.map(b => b.id === btn.id ? btn : b));
  };

  const toggleCustomNavButton = (id: string) => {
    setCustomNavButtons(prev => prev.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  // ── Actions for Site Theme & Branding ─────────────────────────
  const updateSiteTheme = async (updates: Partial<SiteThemeConfig>) => {
    const merged = { ...siteTheme, ...updates };
    setSiteTheme(merged);
    try {
      await updateSettingApi('site_theme', merged);
    } catch (e) {
      console.error('Failed to sync site_theme to MySQL:', e);
    }
  };

  const setThemePreset = async (preset: ThemePreset) => {
    let primary = '#0a192f';
    let accent = '#d97706';

    if (preset === 'navy-gold') {
      primary = '#0a192f';
      accent = '#d97706';
    } else if (preset === 'slate-silver') {
      primary = '#0f172a';
      accent = '#2563eb';
    } else if (preset === 'emerald-gold') {
      primary = '#064e3b';
      accent = '#eab308';
    } else if (preset === 'crimson-amber') {
      primary = '#450a0a';
      accent = '#f59e0b';
    }

    const newTheme: SiteThemeConfig = {
      ...siteTheme,
      themeId: preset,
      primaryColor: primary,
      accentColor: accent
    };

    setSiteTheme(newTheme);
    try {
      await updateSettingApi('site_theme', newTheme);
    } catch (e) {
      console.error('Failed to sync site_theme preset to MySQL:', e);
    }
  };

  // ── Actions for Site Banner ───────────────────────────────────
  const updateSiteBanner = async (updates: Partial<SiteBannerAnnouncement>) => {
    const merged = { ...siteBanner, ...updates };
    setSiteBanner(merged);
    try {
      await updateSettingApi('site_banner', merged);
    } catch (e) {
      console.error('Failed to sync site_banner to MySQL:', e);
    }
  };

  const setRunningTickerTitle = async (title: string) => {
    setRunningTickerTitleState(title);
    localStorage.setItem(STORAGE_KEYS.TICKER_TITLE, title);
    try {
      await updateSettingApi('ticker_title', title);
    } catch (e) {
      console.error('Failed to sync ticker_title to MySQL:', e);
    }
  };

  // ── Actions for Gallery ───────────────────────────────────────
  const addGalleryImage = async (image: Omit<GalleryImage, 'id'> & { id?: string }) => {
    const newImage: GalleryImage = {
      id: image.id || `gal-${Date.now()}`,
      title: image.title,
      category: image.category || 'Campus',
      imagePath: image.imagePath
    };
    setGalleryImages(prev => [newImage, ...prev]);
    try {
      const res = await createGalleryImageApi(newImage);
      if (res.success && res.id) {
        newImage.id = res.id;
      }
      await _refreshGallery();
    } catch (e) {
      console.error('Failed to sync gallery image to MySQL:', e);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
    try {
      await deleteGalleryImageApi(id);
    } catch (e) {
      console.error('Failed to delete gallery image from MySQL:', e);
    }
  };

  const updateGalleryImage = async (image: GalleryImage) => {
    // Optimistic local update
    setGalleryImages(prev => prev.map(img => img.id === image.id ? image : img));
    try {
      const res = await updateGalleryImageApi(image.id, image);
      if (res.success) {
        // Re-fetch from MySQL so public website reflects the actual DB state
        await _refreshGallery();
      } else {
        console.error('Gallery update API error:', res.message);
      }
    } catch (e) {
      console.error('Failed to update gallery image in MySQL:', e);
    }
  };

  // ── Actions for Documents ─────────────────────────────────────
  const addDocument = async (doc: Omit<DocumentItem, 'id'> & { id?: string }) => {
    const newDoc: DocumentItem = {
      id: doc.id || `doc-${Date.now()}`,
      title: doc.title,
      filename: doc.filename || `${doc.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      path: doc.path,
      fileSize: doc.fileSize || '1.5 MB',
      fileType: doc.fileType || 'PDF',
      category: doc.category || 'Official Documents',
      description: doc.description || 'Official college document uploaded by administration.'
    };
    setDocuments(prev => [newDoc, ...prev]);
    try {
      const res = await createDocumentApi(newDoc);
      if (res.success && res.id) {
        newDoc.id = res.id;
      }
    } catch (e) {
      console.error('Failed to sync document to MySQL:', e);
    }
  };

  const deleteDocument = async (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    try {
      await deleteDocumentApi(id);
    } catch (e) {
      console.error('Failed to delete document from MySQL:', e);
    }
  };

  const updateDocument = async (doc: DocumentItem) => {
    // Optimistic local update
    setDocuments(prev => prev.map(d => d.id === doc.id ? doc : d));
    try {
      const res = await updateDocumentApi(doc.id, doc);
      if (res.success) {
        // Re-fetch from MySQL so public website reflects the actual DB state
        await _refreshDocuments();
      } else {
        console.error('Document update API error:', res.message);
      }
    } catch (e) {
      console.error('Failed to update document in MySQL:', e);
    }
  };

  // ── Actions for Campus Events ─────────────────────────────────
  const addEvent = async (event: Omit<CollegeDayGalleryItem, 'id'> & { id?: string }) => {
    const newEvent: CollegeDayGalleryItem = {
      id: event.id || `evt-${Date.now()}`,
      title: event.title,
      subtitle: event.subtitle || 'College Campus Event',
      category: event.category || 'Ceremony',
      date: event.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      imagePath: event.imagePath,
      description: event.description || '',
      chiefGuest: event.chiefGuest
    };
    setEvents(prev => [newEvent, ...prev]);
    try {
      const res = await createEventApi(newEvent);
      if (res.success && res.id) {
        newEvent.id = res.id;
      }
    } catch (e) {
      console.error('Failed to sync event to MySQL:', e);
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    try {
      await deleteEventApi(id);
    } catch (e) {
      console.error('Failed to delete event from MySQL:', e);
    }
  };

  const updateEvent = async (event: CollegeDayGalleryItem) => {
    // Optimistic local update
    setEvents(prev => prev.map(e => e.id === event.id ? event : e));
    try {
      const res = await updateEventApi(event.id, event);
      if (res.success) {
        // Re-fetch from MySQL so public website reflects the actual DB state
        await _refreshEvents();
      } else {
        console.error('Event update API error:', res.message);
      }
    } catch (e) {
      console.error('Failed to update event in MySQL:', e);
    }
  };

  // ── Actions for Hero Slides ───────────────────────────────────
  const addHeroSlide = (slide: Omit<HeroSlideItem, 'id'> & { id?: number }) => {
    const newSlide: HeroSlideItem = {
      id: slide.id || Date.now(),
      title: slide.title,
      subtitle: slide.subtitle,
      imagePath: slide.imagePath || slide.visualUrl,
      visualUrl: slide.visualUrl
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const deleteHeroSlide = (id: number) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const updateHeroSlide = (slide: HeroSlideItem) => {
    setHeroSlides(prev => prev.map(s => s.id === slide.id ? slide : s));
  };

  // ── Actions for Notifications ─────────────────────────────────
  const addNotification = async (notice: Omit<CollegeNotification, 'id'> & { id?: string }) => {
    const newNotice: CollegeNotification = {
      id: notice.id || `notif-${Date.now()}`,
      title: notice.title,
      date: notice.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: notice.category || 'Circulars',
      isNew: true,
      isUrgent: !!notice.isUrgent,
      summary: notice.summary,
      fullDetails: notice.fullDetails || notice.summary,
      issuedBy: notice.issuedBy || 'Principal Office & Administration',
      pdfAttachment: notice.pdfAttachment,
      externalLink: notice.externalLink
    };
    setNotifications(prev => [newNotice, ...prev]);
    try {
      const res = await createNotificationApi(newNotice);
      if (res.success && res.id) {
        newNotice.id = res.id;
      }
    } catch (e) {
      console.error('Failed to sync notification to MySQL:', e);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await deleteNotificationApi(id);
    } catch (e) {
      console.error('Failed to delete notification from MySQL:', e);
    }
  };

  const updateNotification = async (notice: CollegeNotification) => {
    // Optimistic local update
    setNotifications(prev => prev.map(n => n.id === notice.id ? notice : n));
    try {
      const res = await updateNotificationApi(notice.id, notice);
      if (res.success) {
        // Re-fetch from MySQL so public website reflects the actual DB state
        await _refreshNotifications();
      } else {
        console.error('Notification update API error:', res.message);
      }
    } catch (e) {
      console.error('Failed to update notification in MySQL:', e);
    }
  };

  // ── Actions for Department Images ─────────────────────────────
  const updateDepartmentImage = (deptId: string, updates: Partial<{
    bannerPath: string;
    courseImage: string;
    labPaths: { lab1: string; lab2: string; lab3: string; hod: string };
  }>) => {
    setDepartments(prev => prev.map(dept => {
      if (dept.id === deptId) {
        return {
          ...dept,
          bannerPath: updates.bannerPath || dept.bannerPath,
          courseImage: updates.courseImage || dept.courseImage,
          labPaths: updates.labPaths ? { ...dept.labPaths, ...updates.labPaths } : dept.labPaths
        };
      }
      return dept;
    }));
  };

  // ── Media Library Actions ─────────────────────────────────────
  const addMediaAsset = (asset: AvailableMediaAsset) => {
    setMediaAssets(prev => [asset, ...prev.filter(a => a.path !== asset.path)]);
  };

  const updateMediaAsset = (asset: AvailableMediaAsset) => {
    setMediaAssets(prev => prev.map(a => a.id === asset.id ? asset : a));
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets(prev => prev.filter(a => a.id !== id));
  };

  // ── Reset to Defaults ─────────────────────────────────────────
  const resetAllToDefaults = () => {
    setGalleryImages(INITIAL_GALLERY_IMAGES);
    setDocuments(INITIAL_DOCUMENTS_LIST);
    setEvents(INITIAL_COLLEGE_DAY_GALLERY);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setNotifications(INITIAL_NOTIFICATIONS_DATA);
    setDepartments(INITIAL_DEPARTMENTS_DATA);
    setMediaAssets(KNOWN_MEDIA_ASSETS);
    setCustomNavButtons(INITIAL_CUSTOM_NAV_BUTTONS);
    setSiteTheme(INITIAL_THEME_CONFIG);
    setSiteBanner(INITIAL_SITE_BANNER);
    setRunningTickerTitleState('LIVE CIRCULARS');

    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.SLIDES);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.DEPARTMENTS);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    localStorage.removeItem(STORAGE_KEYS.NAV_BUTTONS);
    localStorage.removeItem(STORAGE_KEYS.SITE_THEME);
    localStorage.removeItem(STORAGE_KEYS.SITE_BANNER);
    localStorage.removeItem(STORAGE_KEYS.TICKER_TITLE);
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        customNavButtons,
        addCustomNavButton,
        deleteCustomNavButton,
        updateCustomNavButton,
        toggleCustomNavButton,
        siteTheme,
        updateSiteTheme,
        setThemePreset,
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
        updateNotification,
        departments,
        updateDepartmentImage,
        mediaAssets,
        addMediaAsset,
        updateMediaAsset,
        deleteMediaAsset,
        refreshData,
        resetAllToDefaults
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
