import { DocumentItem } from '../types';

export interface CollegeNotification {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Exams' | 'Placements' | 'Events' | 'Circulars' | 'Scholarships';
  isNew?: boolean;
  isUrgent?: boolean;
  summary: string;
  fullDetails: string;
  issuedBy: string;
  pdfAttachment?: DocumentItem;
  externalLink?: string;
}

export const NOTIFICATIONS_DATA: CollegeNotification[] = [
  {
    id: 'notif-1',
    title: 'Admissions Open 2027-28: B.E. / M.E. / MBA Admissions Live',
    date: 'August 12, 2027',
    category: 'Admissions',
    isNew: true,
    isUrgent: true,
    summary: 'Applications invited for 10 UG Engineering Branches, 3 PG Research Specializations, and Master of Business Administration (MBA). Anna University Counseling Code: 4982.',
    fullDetails: 'VINS Christian College of Engineering, Chunkankadai, Nagercoil announces open admissions for the academic year 2027-28 under Management and Government Quota (TNEA Code: 4982). Candidates can submit applications online or download printable forms from the college website.',
    issuedBy: 'Admissions Directorate, VINS College',
    pdfAttachment: {
      id: 'doc-prospectus',
      title: 'VINS Official Prospectus & Admission Rules 2027-28',
      filename: 'prospectus.pdf',
      path: 'src/assets/images/documents/prospectus.pdf',
      fileSize: '3.4 MB',
      fileType: 'PDF',
      description: 'Official prospectus detailing eligibility criteria, fee structure, scholarships, and course curriculum.'
    }
  },
  {
    id: 'notif-2',
    title: 'Azentra Global, Cognizant & TCS Mega On-Campus Placement Drive for 2027 Batch',
    date: 'August 10, 2027',
    category: 'Placements',
    isNew: true,
    isUrgent: true,
    summary: 'Azentra Global, Cognizant (GenC), and TCS Digital placement recruitment registration is now active for final year B.E., M.E., and MBA students.',
    fullDetails: 'The Training & Placement Cell requests all eligible final year CSE, ECE, EEE, Mechanical, IT, Civil, and MBA students to register on the placement portal by August 18, 2027. Mock aptitude tests and technical interview coaching start on August 15.',
    issuedBy: 'Directorate of Training & Placement',
    pdfAttachment: {
      id: 'doc-placement-schedule',
      title: 'Azentra Global Placement Drive Schedule & Eligibility',
      filename: 'placement-schedule-2027.pdf',
      path: 'src/assets/images/documents/mandatory-disclosure.pdf',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      description: 'Detailed company eligibility criteria, salary package ranges, and interview venue schedule.'
    }
  },
  {
    id: 'notif-3',
    title: 'Anna University End Semester Autonomous Examinations Schedule',
    date: 'August 08, 2026',
    category: 'Exams',
    isNew: true,
    summary: 'Timetable and hall ticket download guidelines for UG & PG End Semester Theory and Practical Examinations.',
    fullDetails: 'Controller of Examinations releases the official schedule for November/December 2026 Anna University examinations. Students must clear fee dues and collect hall tickets from respective HOD offices before August 22.',
    issuedBy: 'Controller of Examinations, Anna University / VINS',
    pdfAttachment: {
      id: 'doc-exam-timetable',
      title: 'End-Semester Exam Timetable & Seating Plan',
      filename: 'exam-timetable.pdf',
      path: 'src/assets/images/documents/aicte-eoa-2025-26.pdf',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      description: 'Department-wise date sheet for all 14 degree programs.'
    }
  },
  {
    id: 'notif-4',
    title: 'CYBERTRON & MECHSPARK 2026 National Level Technical Symposium',
    date: 'August 05, 2026',
    category: 'Events',
    isNew: true,
    summary: 'Registration open for national level technical fest featuring paper presentations, AI hackathons, CAD modeling, and bot races.',
    fullDetails: 'The Departments of CSE, IT & Mechanical Engineering proudly host CYBERTRON & MECHSPARK 2026 on September 15-16, 2026. Cash prizes worth ₹1,500,000 to be awarded. E-certificates for all registered delegates.',
    issuedBy: 'Symposium Organizing Committee',
    pdfAttachment: {
      id: 'doc-symposium-brochure',
      title: 'CYBERTRON & MECHSPARK Official Event Poster & Guidelines',
      filename: 'symposium-brochure.pdf',
      path: 'src/assets/images/documents/prospectus.pdf',
      fileSize: '4.2 MB',
      fileType: 'PDF',
      description: 'Event rules, submission guidelines, abstract deadline, and online registration QR code.'
    }
  },
  {
    id: 'notif-5',
    title: 'First Generation Graduate & Government Merit Scholarship Applications',
    date: 'August 01, 2026',
    category: 'Scholarships',
    isNew: false,
    summary: 'Eligible students can submit Tamil Nadu State Govt First Graduate & BC/MBC/SC/ST scholarship renewal forms.',
    fullDetails: 'Students seeking Government Scholarship assistance (First Generation Graduate fee waiver, Post-Matric Scholarship, Single Parent Award) are instructed to submit income certificates and Aadhar linked bank passbook copies to the college accounts section.',
    issuedBy: 'Scholarship & Welfare Desk',
    pdfAttachment: {
      id: 'doc-scholarship-form',
      title: 'Scholarship Application Form & Checklist',
      filename: 'scholarship-form.docx',
      path: 'src/assets/images/documents/scholarship-form.docx',
      fileSize: '480 KB',
      fileType: 'DOCX',
      description: 'Document checklist and application form for Government & VINS Trust Scholarships.'
    }
  },
  {
    id: 'notif-6',
    title: 'IEEE International Conference Paper Submission Deadline Extended',
    date: 'July 25, 2026',
    category: 'Events',
    isNew: false,
    summary: 'International Conference on Smart Grids, AI & Sustainable Engineering extends paper submission date to Sept 5, 2026.',
    fullDetails: 'All accepted papers will be published in IEEE Xplore digital library and indexed in Scopus. Faculty, researchers, and postgraduate M.E. scholars are encouraged to submit original research manuscripts.',
    issuedBy: 'R&D Cell & IEEE Student Branch',
    pdfAttachment: {
      id: 'doc-ieee-call-for-papers',
      title: 'IEEE Conference Call for Papers & Formatting Template',
      filename: 'ieee-call-for-papers.pdf',
      path: 'src/assets/images/documents/nirf-2025.pdf',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      description: 'IEEE manuscript guidelines, track themes, and submission email details.'
    }
  },
  {
    id: 'notif-7',
    title: 'NSS & Youth Red Cross Campus Blood Donation Drive Announcement',
    date: 'July 20, 2026',
    category: 'Circulars',
    isNew: false,
    summary: 'Voluntary blood donation camp in association with Government Medical College Hospital Nagercoil on Aug 25.',
    fullDetails: 'The NSS and YRC units of VINS Christian College of Engineering organize a grand Blood Donation Drive at the college Indoor Sports Complex. Donors will receive donor certificates and refreshment packages.',
    issuedBy: 'NSS & YRC Program Officers',
    pdfAttachment: {
      id: 'doc-nss-circular',
      title: 'Blood Donation Camp Official Circular',
      filename: 'blood-donation-circular.pdf',
      path: 'src/assets/images/documents/mandatory-disclosure.pdf',
      fileSize: '820 KB',
      fileType: 'PDF',
      description: 'Event circular and donor health eligibility criteria.'
    }
  }
];
