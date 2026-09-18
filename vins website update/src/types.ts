export type NavigationTab = 
  | 'home' 
  | 'about' 
  | 'admissions' 
  | 'department' 
  | 'placement' 
  | 'facilities' 
  | 'campus' 
  | 'naac' 
  | 'iqac' 
  | 'committees' 
  | 'contact'
  | 'notifications'
  | 'admin';

export interface StaffMember {
  name: string;
  designation: string;
  qualification?: string;
}

export interface RankHolder {
  name: string;
  degree: string;
  cgpa: string;
  rank: string;
}

export interface DepartmentItem {
  id: string;
  name: string;
  shortName?: string;
  degree: 'B.E.' | 'M.E.' | 'MBA';
  category: 'UG' | 'PG' | 'Management';
  description: string;
  bannerPath: string;
  courseImage?: string;
  hodName: string;
  hodQualification: string;
  hodEmail: string;
  intake: number;
  durationYears: number;
  vision?: string;
  mission?: string;
  profileText?: string;
  staffMembers?: StaffMember[];
  rankHolders?: RankHolder[];
  labPaths: {
    lab1: string;
    lab2: string;
    lab3: string;
    hod: string;
  };
  labsList: string[];
  overviewText: string;
  placementPercentage: number;
  topRecruiters: string[];
  activities: string[];
  symposiums: string[];
  curriculumHighlights: string[];
}

export interface StatsCounter {
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
  assetPath: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  imagePath: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imagePath: string;
  description?: string;
}

export interface IQACMember {
  sNo: number;
  name: string;
  designation: string;
  position: string;
}

export interface NAACCriteria {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  keyIndicators: string[];
}

export interface PlacementYearStat {
  year: string;
  placedPercentage: number;
  offersCount: number;
  highestCTC: number; // in LPA
  averageCTC: number; // in LPA
}

export interface FacilityItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  bannerPath: string;
  highlights: string[];
}

export interface CampusClub {
  id: string;
  name: string;
  shortName: string;
  description: string;
  bannerPath: string;
  activities: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  filename: string;
  path: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX';
  category?: string;
  description: string;
}

export type ThemePreset = 'navy-gold' | 'slate-silver' | 'emerald-gold' | 'crimson-amber';

export interface SiteThemeConfig {
  themeId: ThemePreset;
  primaryColor: string;
  accentColor: string;
  tneaCode: string;
  phonePrimary: string;
  emailPrimary: string;
  collegeMotto: string;
  bannerTitle: string;
}

export interface CustomNavButton {
  id: string;
  label: string;
  actionType: 'tab' | 'url' | 'anchor';
  targetTab?: NavigationTab;
  targetUrl?: string;
  targetAnchor?: string;
  location: 'navbar' | 'topbar' | 'footer' | 'hero';
  badge?: string;
  iconName?: string;
  isActive: boolean;
  openInNewTab?: boolean;
  buttonStyle?: 'solid' | 'outline' | 'accent' | 'subtle';
}

export interface SiteBannerAnnouncement {
  isActive?: boolean;
  enabled?: boolean;
  headline?: string;
  message: string;
  badge?: string;
  buttonText?: string;
  buttonTab?: NavigationTab;
  buttonUrl?: string;
  linkText?: string;
  linkUrl?: string;
  type: 'info' | 'urgent' | 'admissions' | 'event' | 'announcement' | 'alert';
}

