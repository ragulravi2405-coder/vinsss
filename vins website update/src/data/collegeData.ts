import {
  StatsCounter,
  FeatureCard,
  EventItem,
  GalleryImage,
  IQACMember,
  NAACCriteria,
  PlacementYearStat,
  FacilityItem,
  CampusClub,
  DocumentItem
} from '../types';

export const COLLEGE_INFO = {
  name: 'VINS Christian College of Engineering',
  subTitle: 'Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai',
  code: '4982',
  location: 'Nagercoil · Tamil Nadu',
  fullAddress: 'Vins Nagar, Chunkankadai, Nagercoil - 629 807, Kanyakumari District, Tamil Nadu, India',
  phone1: '+91 9787747072',
  phone2: '+91 9787747071',
  helplineCell1: '9787747072',
  helplineCell2: '9787455000',
  helplineCell3: '9787747740',
  helpline: '+91 9787747072 / +91 9787747071',
  email: 'vinsengg@gmail.com',
  infoEmail: 'vinsengg@gmail.com',
  establishedYear: 2004,
  womensCollegeEst: 2009,
  nearestAirport: 'Trivandrum International Airport (TRV - 65 km)',
  nearestRailway: 'Nagercoil Junction (NCJ - 6 km)',
  openingHours: {
    weekdays: 'Mon - Fri : 9.00 am - 5.00 pm',
    saturday: 'SAT : 9.00 am - 12.00 pm',
    sunday: 'Sun : Closed'
  },
  heroHeading: 'Engineering minds, building the future.',
  heroIntro: 'VINS Christian College of Engineering provides world-class technical education, cutting-edge laboratory infrastructure, and holistic ethical values to empower future leaders in technology and innovation.'
};

export const UG_COURSES_LIST = [
  {
    id: 'be-civil',
    name: 'BE Civil Engineering',
    establishmentYear: 2013,
    sanctionedIntake: 60,
    durationYears: '4 Years'
  },
  {
    id: 'be-eee',
    name: 'BE Electrical & Electronics Engineering',
    establishmentYear: 2004,
    sanctionedIntake: 30,
    durationYears: '4 Years'
  },
  {
    id: 'be-ece',
    name: 'BE Electronics & Communication Engineering',
    establishmentYear: 2004,
    sanctionedIntake: 60,
    durationYears: '4 Years'
  },
  {
    id: 'be-mech',
    name: 'BE Mechanical Engineering',
    establishmentYear: 2004,
    sanctionedIntake: 90,
    durationYears: '4 Years'
  },
  {
    id: 'be-cse',
    name: 'BE Computer Science Engineering',
    establishmentYear: 2004,
    sanctionedIntake: 60,
    durationYears: '4 Years'
  },
  {
    id: 'be-cse-aiml',
    name: 'BE Computer Science & Engineering (Artificial Intelligence and Machine Learning)',
    establishmentYear: 2023,
    sanctionedIntake: 30,
    durationYears: '4 Years'
  },
  {
    id: 'be-cse-cyber',
    name: 'BE Computer Science & Engineering (Cybersecurity)',
    establishmentYear: 2023,
    sanctionedIntake: 30,
    durationYears: '4 Years'
  },
  {
    id: 'btech-aids',
    name: 'B.Tech Artificial Intelligence and Data Science',
    establishmentYear: 2023,
    sanctionedIntake: 60,
    durationYears: '4 Years'
  }
];

export const PG_COURSES_LIST = [
  {
    id: 'me-construction',
    name: 'ME Construction Engineering & Management',
    establishmentYear: 2014,
    sanctionedIntake: 24,
    durationYears: '2 Years'
  },
  {
    id: 'me-cse',
    name: 'ME Computer Science Engineering',
    establishmentYear: 2010,
    sanctionedIntake: 18,
    durationYears: '2 Years'
  },
  {
    id: 'me-comm',
    name: 'ME Communication Systems',
    establishmentYear: 2013,
    sanctionedIntake: 12,
    durationYears: '2 Years'
  },
  {
    id: 'mba',
    name: 'MBA Master of Business Administration',
    establishmentYear: 2006,
    sanctionedIntake: 60,
    durationYears: '2 Years'
  }
];

export const ELIGIBILITY_CRITERIA_DATA = {
  ugHsc: [
    { community: 'General Category', minMarks: '45.00%' },
    { community: 'Backward Class including Backward Class Muslim (BC / BCM)', minMarks: '40.00%' },
    { community: 'MBC & DNC', minMarks: '40.00%' },
    { community: 'SC / SCA / ST', minMarks: '40.00%' }
  ],
  ugDiploma: [
    { community: 'OC Candidates', minMarks: 'Not less than 50% marks in aggregate in all semesters put together' },
    { community: 'BC / BCM / MBC & DNC / SC / SCA / ST Candidates', minMarks: 'Not less than 45% marks in aggregate in all semesters put together' }
  ],
  mbaPatterns: [
    '10+2+3 years pattern',
    '10+3 years Diploma* + 3 years pattern',
    'B.E / B.Tech / B.Arch / B.Pharm',
    '10+2 + AMIE** (or) 10+3 years Diploma* + AMIE*'
  ],
  mePrograms: [
    {
      program: 'M.E. – Computer Science and Engineering',
      qualifyingDegree: 'B.E / B.Tech in Electronics and Communication Engineering, Information Technology, Computer Science and Engineering, Software Engineering, Computer and Communication Engineering'
    },
    {
      program: 'M.E. – Communication Systems',
      qualifyingDegree: 'B.E / B.Tech in Electronics and Communication Engineering'
    },
    {
      program: 'M.E. – Construction Engineering & Management',
      qualifyingDegree: 'B.E / B.Tech in Civil Engineering, Civil and Structural Engineering'
    }
  ]
};

export const STATS_COUNTERS: StatsCounter[] = [
  { label: 'Happy Students', value: 5000, suffix: '+', iconName: 'Users' },
  { label: 'Our Programs', value: 14, suffix: ' (UG, PG, MBA)', iconName: 'GraduationCap' },
  { label: 'Our Teachers', value: 200, suffix: '+', iconName: 'Award' },
  { label: 'Awards Won', value: 55, suffix: '+', iconName: 'Trophy' }
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Qualified Teachers',
    desc: 'Experienced doctorate faculty dedicated to student academic excellence and research mentorship.',
    icon: 'UserCheck',
    assetPath: 'src/assets/images/features-icons/feature1.jpg'
  },
  {
    title: 'Professional Learning',
    desc: 'Hands-on project work, cloud certification bootcamps, and real-world industrial training.',
    icon: 'BookOpen',
    assetPath: 'src/assets/images/features-icons/feature2.jpg'
  },
  {
    title: 'Graduation Degree',
    desc: 'Anna University affiliated B.E., M.E., and MBA degrees with global industry recognition.',
    icon: 'Award',
    assetPath: 'src/assets/images/features-icons/feature3.jpg'
  },
  {
    title: 'Innovative Learning',
    desc: 'Smart classrooms, e-learning NPTEL digital labs, and GPU-powered AI studio spaces.',
    icon: 'Cpu',
    assetPath: 'src/assets/images/features-icons/feature4.jpg'
  },
  {
    title: 'Job Fair & Placement',
    desc: 'Annual mega placement drives with 50+ visiting MNCs and "One Person - One Job" policy.',
    icon: 'Briefcase',
    assetPath: 'src/assets/images/features-icons/feature5.jpg'
  },
  {
    title: 'Well Equipped Labs',
    desc: 'State-of-the-art CNC machining, VLSI Cadence design, NVIDIA AI GPU labs, and Total Station survey instruments.',
    icon: 'FlaskConical',
    assetPath: 'src/assets/images/features-icons/feature6.jpg'
  },
  {
    title: 'Transportation',
    desc: 'Fleet of 35+ comfortable college buses connecting Nagercoil, Kanyakumari, Marthandam, and Trivandrum borders.',
    icon: 'Bus',
    assetPath: 'src/assets/images/features-icons/feature7.jpg'
  },
  {
    title: 'Celebrations & Cultural',
    desc: 'Vibrant student fests, Pongal celebrations, Christmas carols, and inter-collegiate cultural meets.',
    icon: 'PartyPopper',
    assetPath: 'src/assets/images/features-icons/feature8.jpg'
  },
  {
    title: 'College Day',
    desc: 'Annual graduation ceremony and honors evening recognizing academic rank holders and achievers.',
    icon: 'Calendar',
    assetPath: 'src/assets/images/features-icons/feature9.jpg'
  },
  {
    title: 'Sports Day',
    desc: 'Inter-college tournaments for athletics, cricket, volleyball, basketball, and indoor games.',
    icon: 'Trophy',
    assetPath: 'src/assets/images/features-icons/feature10.jpg'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'VINS Christian College of Engineering Campus Panorama',
    subtitle: 'Scenic 25-acre hillside campus at Chunkankadai, Nagercoil with modern engineering infrastructure',
    imagePath: '/images/college events and news galeery/h9.jpg',
    visualUrl: '/images/college events and news galeery/h9.jpg'
  },
  {
    id: 2,
    title: 'Main Academic Quadrangle & Engineering Complex',
    subtitle: 'State-of-the-art technical infrastructure, well-equipped laboratories and lush green environment',
    imagePath: '/images/college events and news galeery/h5.jpg',
    visualUrl: '/images/college events and news galeery/h5.jpg'
  },
  {
    id: 3,
    title: 'Inspiring Architectural Campus at Chunkankadai',
    subtitle: 'Spread across green hills with modern engineering blocks and sports arenas',
    imagePath: '/images/slide images/3.jpg',
    visualUrl: '/images/slide images/3.jpg'
  },
  {
    id: 4,
    title: 'Central Library & Digital Knowledge Hub',
    subtitle: 'Over 45,000 volumes, IEEE e-journals, and NPTEL online course access',
    imagePath: '/images/slide images/4.jpg',
    visualUrl: '/images/slide images/4.jpg'
  },
  {
    id: 5,
    title: 'Annual Placement Drives & Career Success',
    subtitle: 'TCS, Cognizant, Wipro, Infosys, Nokia, and L&T recruiting VINS graduates',
    imagePath: '/images/slide images/5.jpg',
    visualUrl: '/images/slide images/5.jpg'
  },
  {
    id: 6,
    title: 'State-of-the-Art Technical Infrastructure & Computer Labs',
    subtitle: 'High performance computing, AI GPU systems and high-speed network testbeds',
    imagePath: '/images/slide images/6.jpg',
    visualUrl: '/images/slide images/6.jpg'
  },
  {
    id: 7,
    title: 'VINS Vibrant Campus Life & Extracurricular Excellence',
    subtitle: 'Eco-friendly 25-acre hill campus with sports grounds, auditoriums and student clubs',
    imagePath: '/images/slide images/7.jpg',
    visualUrl: '/images/slide images/7.jpg'
  },
  {
    id: 8,
    title: 'Modern Classrooms & Interactive Learning Environment',
    subtitle: 'Smart multimedia projection systems and student-centric interactive pedagogy',
    imagePath: '/images/slide images/8.jpg',
    visualUrl: '/images/slide images/8.jpg'
  },
  {
    id: 9,
    title: 'Chunkankadai Hillside Campus Walkway & Green Scenery',
    subtitle: 'Serene natural setting providing an optimal learning atmosphere for future engineers',
    imagePath: '/images/college events and news galeery/h4.jpg',
    visualUrl: '/images/college events and news galeery/h4.jpg'
  },
  {
    id: 10,
    title: 'College Cultural Events, Tech Fest & Annual Celebrations',
    subtitle: 'Hosting inter-collegiate technical meets, music festivals, and drama competitions',
    imagePath: '/images/slide images/10.jpg',
    visualUrl: '/images/slide images/10.jpg'
  },
  {
    id: 11,
    title: '1500-Seater Central Conference Auditorium Complex',
    subtitle: 'Acoustically treated auditorium for international symposiums and convocations',
    imagePath: '/images/college events and news galeery/h8.jpg',
    visualUrl: '/images/college events and news galeery/h8.jpg'
  },
  {
    id: 12,
    title: 'Campus Placement Drive — Interview Day',
    subtitle: 'Students clearing selection rounds at on-campus MNC recruitment drives',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.40 PM (1).jpeg'
  },
  {
    id: 13,
    title: 'Campus Recruitment — Group Discussion Rounds',
    subtitle: 'Top companies conducting GDs and technical interviews at VINS campus',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.42 PM.jpeg'
  },
  {
    id: 14,
    title: 'Placement Week — Offer Letter Distribution',
    subtitle: 'Graduating students receiving placement offers from leading IT & core companies',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.43 PM.jpeg'
  },
  {
    id: 15,
    title: 'VINS Training & Placement Cell in Action',
    subtitle: 'Dedicated placement coordinators facilitating smooth campus drive execution',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.45 PM (1).jpeg'
  },
  {
    id: 16,
    title: 'Student Success — Campus Selection Celebrations',
    subtitle: 'Proud VINS students celebrating job offers from top national & multinational companies',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.47 PM.jpeg'
  },
  {
    id: 17,
    title: 'Corporate HR Meet & Placement Orientation',
    subtitle: 'Industry HR professionals conducting pre-placement talks and aptitude assessments',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.48 PM.jpeg'
  },
  {
    id: 18,
    title: 'Skill Development & Soft Skills Training Sessions',
    subtitle: 'Communication, personality development and interview readiness workshops for students',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.49 PM.jpeg'
  },
  {
    id: 19,
    title: 'VINS Placement Excellence — 100% Placement Drive',
    subtitle: 'Achieving industry-leading placement records year after year with top MNC partners',
    imagePath: '',
    visualUrl: '/images/placement imgaes/WhatsApp Image 2026-08-13 at 9.07.50 PM.jpeg'
  }
];

export const NEWS_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'National Level Technical Symposium - CYBERTRON 2026',
    date: 'March 15, 2026',
    category: 'Symposium',
    imagePath: '/images/college events and news galeery/1 (1).jpg',
    description: 'Over 800 participants from technical institutions across South India competed in coding, web design, and AI paper presentations.'
  },
  {
    id: 'e2',
    title: 'Campus Placement Drive & Honor Ceremony',
    date: 'February 28, 2026',
    category: 'Placement',
    imagePath: '/images/college events and news galeery/1 (2).jpg',
    description: 'Final-year engineering students received offer letters with salary packages up to 8.5 LPA.'
  },
  {
    id: 'e3',
    title: 'ROBOTRYST Autonomous Robotics Workshop',
    date: 'February 10, 2026',
    category: 'Workshop',
    imagePath: '/images/college events and news galeery/2 (1).jpg',
    description: 'Hands-on training in line follower robots, obstacle avoiders, and micro-controller programming for Mech & ECE students.'
  },
  {
    id: 'e4',
    title: 'Annual Sports Meet & Athletic Championship',
    date: 'January 24, 2026',
    category: 'Sports',
    imagePath: '/images/college events and news galeery/3 (1).jpg',
    description: 'Inter-departmental track events, football finals, and trophy distribution by District Sports Officer.'
  },
  {
    id: 'e5',
    title: 'EDUSAT Live Interactive Seminar Series',
    date: 'January 12, 2026',
    category: 'Academic',
    imagePath: '/images/college events and news galeery/4 (1).jpg',
    description: 'Anna University satellite broadcasts on advanced power system stability and quantum computing.'
  },
  {
    id: 'e6',
    title: 'NSS Green Campus Tree Plantation Drive',
    date: 'December 18, 2025',
    category: 'Social Service',
    imagePath: '/images/college events and news galeery/5 (1).jpg',
    description: 'Saplings planted across the Chunkankadai hill campus by student volunteers and Nature Club members.'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // College Day
  { id: 'cd1', title: 'College Day Inaugural Lamp Lighting & Dignitaries', category: 'College Day', imagePath: '/images/college events and news galeery/1 (1).jpg' },
  { id: 'cd2', title: 'Honor Ceremony & Guest Address', category: 'College Day', imagePath: '/images/college events and news galeery/1 (2).jpg' },
  { id: 'cd3', title: 'Student Cultural Performance & Stage Event', category: 'College Day', imagePath: '/images/college events and news galeery/2 (1).jpg' },
  { id: 'cd7', title: 'College Function Stage Program & Celebrations', category: 'College Day', imagePath: '/images/college events and news galeery/6 (1).jpg' },
  { id: 'cd10', title: 'Annual Day Stage Inauguration', category: 'College Day', imagePath: '/images/college events and news galeery/h1.jpg' },
  { id: 'cd11', title: 'Dignitaries & Chief Guest Honor Ceremony', category: 'College Day', imagePath: '/images/college events and news galeery/h2.jpg' },
  { id: 'cd12', title: 'Cultural Dance Extravaganza', category: 'College Day', imagePath: '/images/college events and news galeery/h3.jpg' },

  // Campus
  { id: 'h3', title: 'VINS Main Entrance & Greenery', category: 'Campus', imagePath: '/images/college events and news galeery/h5.jpg' },
  { id: 'h4', title: 'VINS Green Campus Event Gathering', category: 'Campus', imagePath: '/images/college events and news galeery/5 (1).jpg' },
  { id: 'h5', title: 'Chunkankadai Hillside Campus Landscape', category: 'Campus', imagePath: '/images/college events and news galeery/h4.jpg' },
  { id: 'h6', title: 'College Administrative Block & Quadrangle', category: 'Campus', imagePath: '/images/college events and news galeery/h5.jpg' },
  { id: 'h7', title: 'VINS Central Library & Garden Walkway', category: 'Campus', imagePath: '/images/college events and news galeery/h6.jpg' },
  { id: 'h8', title: 'Main Auditorium & Conference Complex', category: 'Campus', imagePath: '/images/college events and news galeery/h8.jpg' },
  { id: 'h9', title: 'Scenic Aerial View of VINS Campus', category: 'Campus', imagePath: '/images/college events and news galeery/h9.jpg' },

  // Labs
  { id: 'l1', title: 'High-Performance Research & Computing Lab', category: 'Labs', imagePath: '/images/slide images/12.jpg' },
  { id: 'l2', title: 'Advanced Specialized Engineering Laboratory', category: 'Labs', imagePath: '/images/slide images/17.jpg' },
  { id: 'l3', title: 'Computer Science AI & Software Development Lab', category: 'Labs', imagePath: '/images/college events and news galeery/h10.jpg' },
  { id: 'l4', title: 'Mechanical & Robotics Engineering Workshop', category: 'Labs', imagePath: '/images/college events and news galeery/h11.jpg' },

  // Events
  { id: 'e1', title: 'Technical Symposium & Workshop Highlights', category: 'Events', imagePath: '/images/college events and news galeery/4 (1).jpg' },
  { id: 'e2', title: 'Campus Seminar & Keynote Guest Talk', category: 'Events', imagePath: '/images/college events and news galeery/7 (1).jpg' },
  { id: 'e3', title: 'Student Celebrations & Trophy Honors', category: 'Events', imagePath: '/images/college events and news galeery/8 (1).jpg' },
  { id: 'e4', title: 'National Level Technical Symposium Keynote', category: 'Events', imagePath: '/images/college events and news galeery/h12.jpg' },
  { id: 'e5', title: 'Placement Drive Student Orientation', category: 'Events', imagePath: '/images/college events and news galeery/h13.jpg' },
  { id: 'e6', title: 'NSS & Social Service Outreach Program', category: 'Events', imagePath: '/images/college events and news galeery/h14.jpg' },

  // Sports
  { id: 's1', title: 'Annual Sports Meet & Athletic Championship', category: 'Sports', imagePath: '/images/college events and news galeery/3 (1).jpg' },
  { id: 's2', title: 'Inter-College Football & Cricket Tournament', category: 'Sports', imagePath: '/images/college events and news galeery/h15.jpg' }
];

export interface CollegeDayGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  imagePath: string;
  description: string;
  chiefGuest?: string;
}

export const COLLEGE_DAY_GALLERY: CollegeDayGalleryItem[] = [
  {
    id: 'cd1',
    title: 'Inaugural Lamp Lighting & Guest Welcome',
    subtitle: 'Annual College Day & Event Celebrations',
    category: 'Ceremony',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/1 (1).jpg',
    description: 'Traditional lamp lighting ceremony by Founder Chairman and Dignitaries.',
    chiefGuest: 'Dr. R. Velraj, Former Vice Chancellor, Anna University'
  },
  {
    id: 'cd2',
    title: 'Dignitaries Honor & Keynote Session',
    subtitle: 'Academic Excellence Day',
    category: 'Ceremony',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/1 (2).jpg',
    description: 'Felicitation of guests and keynote address to students.'
  },
  {
    id: 'cd3',
    title: 'Student Cultural Fest & Stage Event',
    subtitle: 'VINS Cultural Showcase',
    category: 'Cultural Dance',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/2 (1).jpg',
    description: 'Vibrant stage performances by engineering students.'
  },
  {
    id: 'cd4',
    title: 'Annual Prize & Medal Distribution',
    subtitle: 'Prize Giving Ceremony',
    category: 'Awards',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/3 (1).jpg',
    description: 'Trophies and merit awards presented to outstanding students.'
  },
  {
    id: 'cd5',
    title: 'Technical Workshop & Interactive Session',
    subtitle: 'Departmental Fest',
    category: 'Workshop',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/4 (1).jpg',
    description: 'Interactive technical events and paper presentation competitions.'
  },
  {
    id: 'cd6',
    title: 'Green Campus Event Gathering',
    subtitle: 'NSS & Club Event',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/5 (1).jpg',
    description: 'Outdoor student gatherings and environmental activities.'
  },
  {
    id: 'cd7',
    title: 'Stage Program & Cultural Fest',
    subtitle: 'Evening Celebrations',
    category: 'Cultural Dance',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/6 (1).jpg',
    description: 'Stage drama and musical performances.'
  },
  {
    id: 'cd8',
    title: 'Guest Lecture & Seminar Event',
    subtitle: 'Knowledge Sharing Session',
    category: 'Seminar',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/7 (1).jpg',
    description: 'Industry experts delivering special lectures to students.'
  },
  {
    id: 'cd9',
    title: 'Grand Finale & Championship Trophy Presentation',
    subtitle: 'Celebration Finale',
    category: 'Finale',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/8 (1).jpg',
    description: 'Closing ceremony with overall championship trophy presentation.'
  },
  {
    id: 'cd10',
    title: 'Annual College Day Inaugural Ceremony',
    subtitle: 'Main Stage Inauguration',
    category: 'Ceremony',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h1.jpg',
    description: 'Inauguration of annual college day events.'
  },
  {
    id: 'cd11',
    title: 'Felicitation of Chief Guest & Dignitaries',
    subtitle: 'Honor Session',
    category: 'Ceremony',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h2.jpg',
    description: 'Chief guest honoring ceremony on stage.'
  },
  {
    id: 'cd12',
    title: 'Classical & Western Fusion Dance Performance',
    subtitle: 'Cultural Fest Dance',
    category: 'Cultural Dance',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h3.jpg',
    description: 'Student dance performance showcasing cultural talent.'
  },
  {
    id: 'cd13',
    title: 'Chunkankadai Hillside Campus Walkway',
    subtitle: 'Campus Showcase',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h4.jpg',
    description: 'Scenic views of the Chunkankadai green campus.'
  },
  {
    id: 'cd14',
    title: 'College Quadrangle & Academic Complex',
    subtitle: 'Campus Building',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h5.jpg',
    description: 'Academic block and green quadrangle.'
  },
  {
    id: 'cd15',
    title: 'Central Library Walkway',
    subtitle: 'Library Campus Area',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h6.jpg',
    description: 'Central library and garden walkway.'
  },
  {
    id: 'cd16',
    title: 'Main Conference Auditorium Complex',
    subtitle: 'Auditorium Showcase',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h8.jpg',
    description: '1500-seater main auditorium complex.'
  },
  {
    id: 'cd17',
    title: 'Aerial View of VINS College Campus',
    subtitle: 'Campus Panorama',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h9.jpg',
    description: 'Breathtaking panoramic view of the college campus.'
  },
  {
    id: 'cd18',
    title: 'Advanced AI & Computing Lab Facility',
    subtitle: 'Lab Facilities',
    category: 'Workshop',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h10.jpg',
    description: 'Computer science AI development lab.'
  },
  {
    id: 'cd19',
    title: 'Robotics & Mechanical Engineering Lab',
    subtitle: 'Engineering Workshop',
    category: 'Workshop',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h11.jpg',
    description: 'Advanced robotics experimentation lab.'
  },
  {
    id: 'cd20',
    title: 'Technical Symposium Keynote Session',
    subtitle: 'National Symposium',
    category: 'Seminar',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h12.jpg',
    description: 'Keynote technical presentation by industry leaders.'
  },
  {
    id: 'cd21',
    title: 'Campus Placement Orientation Meet',
    subtitle: 'Training & Placement',
    category: 'Seminar',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h13.jpg',
    description: 'Pre-placement training and orientation drive.'
  },
  {
    id: 'cd22',
    title: 'NSS Social Service & Plantation Drive',
    subtitle: 'NSS Club Event',
    category: 'Campus',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h14.jpg',
    description: 'Social service initiative by student volunteers.'
  },
  {
    id: 'cd23',
    title: 'Inter-College Sports Championship Finals',
    subtitle: 'Athletic Meet',
    category: 'Awards',
    date: 'April 08, 2026',
    imagePath: '/images/college events and news galeery/h15.jpg',
    description: 'Championship trophy presentation at annual sports meet.'
  }
];

export const PLACEMENT_STATS: PlacementYearStat[] = [
  { year: '2021-22', placedPercentage: 88, offersCount: 310, highestCTC: 7.2, averageCTC: 3.8 },
  { year: '2022-23', placedPercentage: 91, offersCount: 345, highestCTC: 8.0, averageCTC: 4.1 },
  { year: '2023-24', placedPercentage: 93, offersCount: 380, highestCTC: 9.5, averageCTC: 4.5 },
  { year: '2024-25', placedPercentage: 95, offersCount: 420, highestCTC: 10.2, averageCTC: 4.8 },
  { year: '2025-26', placedPercentage: 96, offersCount: 460, highestCTC: 12.0, averageCTC: 5.2 }
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'library',
    name: 'Central Library',
    shortDesc: 'Textbooks, reference books, journals, and IEEE digital resources.',
    fullDesc: 'Spanning over 12,000 sq.ft., the Central Library houses more than 45,000 volumes of technical books, international journal subscriptions, DELNET access, and an automated barcoded circulation system with an air-conditioned digital reading hall.',
    bannerPath: 'src/assets/images/facilities/library/banner.jpg',
    highlights: ['45,000+ Text & Reference Books', 'IEEE, Springer & Elsevier e-Journals', 'Air-Conditioned Digital E-Reading Room', 'Open Access Barcode Catalog System']
  },
  {
    id: 'elearning',
    name: 'E-Learning & NPTEL Center',
    shortDesc: 'NPTEL local chapter, online course access, and video lecture archives.',
    fullDesc: 'VINS is an official NPTEL Local Chapter with high-speed local storage servers caching thousands of hours of IIT/IISc video lectures, virtual laboratory simulators, and online certification exam centers.',
    bannerPath: 'src/assets/images/facilities/elearning/banner.jpg',
    highlights: ['Official NPTEL Local Chapter', 'Dedicated 1 Gbps Fiber High-Speed Line', 'Access to Virtual Labs & Coursera Courses', 'Online Certification Exam Center']
  },
  {
    id: 'auditorium',
    name: 'Air-Conditioned Auditorium',
    shortDesc: 'Venue for college day, seminars, symposiums, and guest lectures.',
    fullDesc: 'A grand 1,500-seater fully air-conditioned auditorium equipped with state-of-the-art surround sound systems, acoustic wall paneling, high-definition laser projectors, and stage lighting for conferences and cultural events.',
    bannerPath: 'src/assets/images/facilities/auditorium/banner.jpg',
    highlights: ['1,500 Seating Capacity', 'High-Definition Laser Projection System', 'Acoustic Soundproofing & Surround Audio', 'Green Rooms & VIP Lounge Attached']
  },
  {
    id: 'conferencing',
    name: 'Conferencing Facility',
    shortDesc: 'Video conferencing studio for guest lectures, webinars, and meetings.',
    fullDesc: 'Smart conference halls equipped with dual 85-inch interactive flat panel displays, polycom video conferencing systems, crystal-clear ceiling microphones, and high-speed internet streaming capabilities for virtual guest lectures.',
    bannerPath: 'src/assets/images/facilities/conferencing/banner.jpg',
    highlights: ['Polycom HD Video Conferencing', 'Interactive Smart Panels', 'Seamless Hybrid Lecture Streaming', 'Executive Boardroom Setup']
  },
  {
    id: 'cafeteria',
    name: 'College Cafeteria',
    shortDesc: 'Hygienic, nutritious food and multi-cuisine refreshments on campus.',
    fullDesc: 'Modern, spacious cafeteria serving hygienic South Indian vegetarian and non-vegetarian meals, fresh juices, snacks, and bakery items prepared under strict quality and sanitation guidelines.',
    bannerPath: 'src/assets/images/facilities/cafeteria/banner.jpg',
    highlights: ['Multi-Cuisine South Indian & Continental', 'Hygienic Steam Cooking Equipment', 'Filter Water & RO Purifiers Installed', 'Separate Dining Areas for Faculty & Students']
  },
  {
    id: 'gym',
    name: 'Gym & Fitness Center',
    shortDesc: 'Modern fitness centre for student and faculty health and wellness.',
    fullDesc: 'Fully equipped fitness studio featuring commercial treadmills, stationary bicycles, multi-station weight rigs, dumbbells, and trained fitness instructors to promote healthy lifestyles.',
    bannerPath: 'src/assets/images/facilities/gym/banner.jpg',
    highlights: ['Commercial Treadmills & Ellipticals', 'Multi-Station Weight Training Rigs', 'Professional Physical Trainers', 'Dedicated Timings for Men and Women']
  },
  {
    id: 'sports',
    name: 'Sports & Games Complex',
    shortDesc: 'Athletic track, volleyball courts, cricket pitches, and indoor games.',
    fullDesc: 'Extensive 400m athletic track, standard cricket turf pitch, basketball court with floodlights, volleyball courts, shuttle badminton courts, and an indoor games hall for chess, carrom, and table tennis.',
    bannerPath: 'src/assets/images/facilities/sports/banner.jpg',
    highlights: ['400m Standard Athletic Track', 'Floodlit Basketball & Volleyball Courts', 'Cricket Ground & Practice Nets', 'Indoor Sports Hall for Chess & Table Tennis']
  },
  {
    id: 'transport',
    name: 'Fleet Transport Services',
    shortDesc: '35+ College buses connecting Nagercoil, Marthandam, and surrounding areas.',
    fullDesc: 'Comprehensive transport network running 35+ comfortable buses covering all key routes across Kanyakumari district, Nagercoil town, Kanyakumari, Marthandam, Thuckalay, Pechiparai, Vallioor, and Trivandrum border areas.',
    bannerPath: 'src/assets/images/facilities/transport/banner.jpg',
    highlights: ['35+ Fleet of Safety-Certified Buses', 'GPS Tracking & Speed Governors', 'Covers Kanyakumari & Tirunelveli Districts', 'Experienced Drivers & Dedicated Transport Cell']
  }
];

export const CAMPUS_CLUBS: CampusClub[] = [
  {
    id: 'nss',
    name: 'National Service Scheme (NSS)',
    shortName: 'NSS',
    description: 'Fostering social responsibility, community service camps, blood donation drives, and rural literacy awareness in nearby villages.',
    bannerPath: 'src/assets/images/campus/nss/1.jpg',
    activities: [
      '7-Day Annual Rural Community Camp at Chunkankadai Village',
      'Voluntary Blood Donation Camp with Nagercoil Govt Hospital',
      'Swachh Bharat Cleanliness Drives across Kanyakumari Coast'
    ]
  },
  {
    id: 'yrc',
    name: 'Youth Red Cross (YRC)',
    shortName: 'YRC',
    description: 'Promoting humanitarian service, disaster management training, first-aid bootcamps, and health awareness programs.',
    bannerPath: 'src/assets/images/campus/yrc/1.jpg',
    activities: [
      'First Aid & Emergency Resuscitation Workshop',
      'Eye Checkup & Dental Care Free Health Camp',
      'Disaster Preparedness Simulation with Fire & Rescue Dept'
    ]
  },
  {
    id: 'edc',
    name: 'Entrepreneurship Development Cell (EDC)',
    shortName: 'EDC',
    description: 'Cultivating entrepreneurial mindsets, startup incubation, angel funding guidance, and business plan competitions.',
    bannerPath: 'src/assets/images/campus/edc/1.jpg',
    activities: [
      'Annual Startup Pitch Fest - VINS-INVENT',
      'Mentorship Sessions with Successful Alumnus Entrepreneurs',
      'Intellectual Property Rights & Patent Filing Workshop'
    ]
  },
  {
    id: 'innovation-centre',
    name: 'Innovation Centre & Prototyping Space',
    shortName: 'Innovation',
    description: 'Student project incubation facility with 3D printers, IoT hardware kits, and PCB fabrication equipment.',
    bannerPath: 'src/assets/images/campus/innovation-centre/1.jpg',
    activities: [
      'Smart City IoT Prototype Competition',
      '3D Printing & CAD Rapid Prototyping Workshop',
      'Industry Sponsored Applied R&D Projects'
    ]
  },
  {
    id: 'nature-club',
    name: 'Nature Club & Eco Corps',
    shortName: 'Nature Club',
    description: 'Promoting environmental conservation, solar energy adoption, organic gardening, and plastic-free campus campaigns.',
    bannerPath: 'src/assets/images/campus/nature-club/1.jpg',
    activities: [
      'Campus Biodiversity Mapping & Herbal Garden Maintenance',
      'World Environment Day Rainwater Harvesting Rally',
      'Bird Watching & Ecological Trekking at Western Ghats'
    ]
  },
  {
    id: 'cultural-events',
    name: 'Cultural Events & Arts Society',
    shortName: 'Cultural',
    description: 'Unleashing creative talent through music band performances, traditional folk dances, drama, photography, and arts.',
    bannerPath: 'src/assets/images/campus/cultural-events/1.jpg',
    activities: [
      'VINS-FEST Inter-Collegiate Cultural Extravaganza',
      'Grand Onam & Pongal Cultural Celebrations',
      'Western & Classical Music Band Competitions'
    ]
  }
];

export const NAAC_CRITERIA: NAACCriteria[] = [
  {
    id: 1,
    title: 'Criterion 1: Curricular Aspects',
    description: 'Curriculum design, academic flexibility, syllabus enrichment, and stakeholder feedback systems.',
    pdfPath: 'src/assets/images/naac/criterion-1.pdf',
    keyIndicators: ['Academic Flexibility & Electives', 'Value Added Certificate Courses', 'Structured Feedback Collection & Analysis']
  },
  {
    id: 2,
    title: 'Criterion 2: Teaching, Learning & Evaluation',
    description: 'Student enrollment, diversity, student-teacher ratio, experiential learning methods, and evaluation processes.',
    pdfPath: 'src/assets/images/naac/criterion-2.pdf',
    keyIndicators: ['Student-Centric ICT Pedagogies', 'Continuous Internal Assessment Transparency', 'Outcome Based Education (OBE) Attainments']
  },
  {
    id: 3,
    title: 'Criterion 3: Research, Innovations & Extension',
    description: 'Resource mobilization for research, innovation ecosystem, paper publications, patents, and extension activities.',
    pdfPath: 'src/assets/images/naac/criterion-3.pdf',
    keyIndicators: ['Incubation & IPR Cell Activities', 'Scopus & Web of Science Publications', 'Community Outreach & NSS Projects']
  },
  {
    id: 4,
    title: 'Criterion 4: Infrastructure & Learning Resources',
    description: 'Physical facilities, smart classrooms, ICT infrastructure, central library, and IT connectivity.',
    pdfPath: 'src/assets/images/naac/criterion-4.pdf',
    keyIndicators: ['1 Gbps Fiber Network & Wi-Fi', 'Library Automation & E-Journal Subscriptions', 'Sports Arenas & Gymnasium']
  },
  {
    id: 5,
    title: 'Criterion 5: Student Support & Progression',
    description: 'Scholarship schemes, career counseling, placement record, competitive exam coaching, and alumni engagement.',
    pdfPath: 'src/assets/images/naac/criterion-5.pdf',
    keyIndicators: ['Merit & Need Based Scholarships', 'Training & Placement Soft Skills', 'Registered Alumni Association Network']
  },
  {
    id: 6,
    title: 'Criterion 6: Governance, Leadership & Management',
    description: 'Institutional vision, decentralization, faculty empowerment, financial management, and IQAC quality initiatives.',
    pdfPath: 'src/assets/images/naac/criterion-6.pdf',
    keyIndicators: ['Perspective Strategic Planning', 'E-Governance in Admissions & Exams', 'Internal Quality Assurance Cell (IQAC)']
  },
  {
    id: 7,
    title: 'Criterion 7: Institutional Values & Best Practices',
    description: 'Gender equity, environmental sustainability, green campus initiatives, disabled-friendly facilities, and core values.',
    pdfPath: 'src/assets/images/naac/criterion-7.pdf',
    keyIndicators: ['Solar Roof Grid & Energy Conservation', 'Solid & E-Waste Management Systems', 'Distinctive Best Practices']
  }
];

export const IQAC_MEMBERS: IQACMember[] = [
  { sNo: 1, name: 'Dr. J. A. Alex Rajju Balan', designation: 'Principal', position: 'Head of the Institution' },
  { sNo: 2, name: 'Dr. Gavaskar Vincent', designation: 'Secretary', position: 'Management Representative' },
  { sNo: 3, name: 'Dr. V. Dyana Christilda', designation: 'Professor', position: 'IQAC Coordinator' },
  { sNo: 4, name: 'Mr. C. Rajesh', designation: 'Assistant Professor', position: 'Mechanical Engineering' },
  { sNo: 5, name: 'Ms. A. Alphonsal', designation: 'Associate Professor', position: 'Science and Humanties' },
  { sNo: 6, name: 'Mrs. Sunitha Kumari', designation: 'Assistant Professor', position: 'Civil Engineering' },
  { sNo: 7, name: 'Mrs. B. Priya', designation: 'Assistant Professor', position: 'Computer Science and Engineering' },
  { sNo: 8, name: 'Mrs. S.V. Brindha', designation: 'Assistant Professor', position: 'Electronics and Communication Engineering' },
  { sNo: 9, name: 'Mrs. E.L. Shajini', designation: 'Assistant Professor', position: 'Electrical and Communication Engineering' },
  { sNo: 10, name: 'Mr. M. Divin Kumar', designation: 'Assistant Professor', position: 'Mechanical Engineering' }
];

export const RTI_MEMBERS = {
  chairperson: { name: 'Dr. A. J. Alex Rajju Balan', role: 'Principal' },
  managementRep: { name: 'Dr. Gavaskar Vincent', role: 'Secretary, VCCE' },
  coordinator: { name: 'Dr. V. Dyana Christilda', role: 'Professor, ECE' },
  secretary: { name: 'Mrs. B. Priya', role: 'Associate Professor, CSE' },
  members: [
    { name: 'Mr. Raja Kingston', role: 'Associate Professor, EEE' },
    { name: 'Ms. Alphonsal', role: 'Associate Professor, English' },
    { name: 'Ms. Sunitha Kumari', role: 'Associate Professor, Civil' },
    { name: 'Mr. Divin Kumar', role: 'Assistant Professor, Mechanical' },
    { name: 'Ms. S.V. Brindha', role: 'Assistant Professor, ECE' },
    { name: 'Ms. NanthaPriya', role: 'Assistant Professor, ECE' },
    { name: 'Ms. Sainty Mary', role: 'Associate Professor, Physics' }
  ]
};

export const PLACEMENT_OFFICER_INFO = {
  name: 'Mrs. Linju Mol',
  title: 'Placement Officer',
  designation: 'Assistant Professor and Head',
  department: 'Department of Management Studies',
  phone: '+91 9787747072 / +91 9787747071',
  email: 'vinsengg@gmail.com'
};

export const SPECIAL_FACILITIES_LIST = [
  {
    title: 'Digital Library & E-Journals',
    badge: 'Rs 15+ Lakhs Annual Subscription',
    desc: 'VINS is the ONLY college in Kanyakumari district having E-journals like IEEE, SPRINGER, BLACKWELL, ASCE, ASNE, J-GATE, McGRAW HILL, ELSEVIER, ASTM, Digital Library, and EBSCO. Fully automated digital library.'
  },
  {
    title: 'Seismometer Seismic Station',
    badge: 'Exclusive in South Tamil Nadu',
    desc: 'VINS is the ONLY college in South Tamil Nadu equipped with a highly sensitive Seismometer which records earthquake activity across all Asian countries.'
  },
  {
    title: '81+ National Symposiums & Conferences',
    badge: 'District Leader',
    desc: 'Conducted over 81 National Level Technical Symposiums & Conferences featuring space scientists and leaders from ISRO, DRDA, NPCIL, VSSC, IIST, and top MNCs.'
  },
  {
    title: 'Anna University EDUSAT Satellite Facility',
    badge: 'Interactive Distance Learning',
    desc: 'VINS is the ONLY college in Kanyakumari district having Anna University EDUSAT programme for real-time interactive lectures and doubt clarifications with expert Anna University professors.'
  },
  {
    title: 'Online Placement Training (WebinarJam)',
    badge: 'In Association with Innovative Services',
    desc: 'Online Placement Training given through WebinarJam platform to all final and pre-final year students in partnership with Innovative Services Pvt Ltd, Coimbatore.'
  },
  {
    title: 'BSE Investors Awareness Webinar',
    badge: 'Financial Literacy',
    desc: 'Bombay Stock Exchange (BSE) conducted Online Investor Awareness Programs to inculcate investment attitude and financial literacy among engineering students.'
  },
  {
    title: 'Graduation Day Honors (472 Degrees)',
    badge: 'AICTE Vice Chairman Chief Guest',
    desc: 'AICTE Vice Chairman Prof. M.P. Poonia delivered chief guest address and conferred degrees to 472 graduates. Anna University Rank Holders honored by Chairman Thiru Nanjil M. Vincent Ex. MP.'
  },
  {
    title: 'COVID-19 School Quiz & Virtual Learning',
    badge: 'Community Outreach',
    desc: 'Conducted District-wide COVID-19 Awareness Quiz with e-certificates for school students. Transitioned to full ZOOM virtual classes & online web assessments during crisis.'
  },
  {
    title: 'Permanent Ph.D. English Communication Trainer',
    badge: '1:15 Faculty Student Ratio',
    desc: 'Special training to enrich English communication skills with a permanently appointed Ph.D. trainer. 1:15 faculty-student ratio with Doctorate faculty in every department.'
  },
  {
    title: '100 Mbps Fiber & 1,407 Computers',
    badge: '24-Hour High Speed Connectivity',
    desc: '100 Mbps high-speed internet with 1,407 networked desktop computers across campus with 24-hour connectivity, video conferencing, and smart virtual classrooms.'
  },
  {
    title: 'Campus ATM, Chapel & Sports Grounds',
    badge: 'Holistic Campus Amenities',
    desc: 'In-campus Automated Teller Machine (ATM), dedicated Chapel for meditation and prayer, and spacious sports playgrounds.'
  },
  {
    title: 'Rs 59+ Lakhs Annual Scholarships',
    badge: 'Highest in South Tamil Nadu',
    desc: 'Disbursed Rs 59 Lakhs in 2012-13 and Rs 53 Lakhs in 2011-12 in scholarships—the highest disbursed scholarship amount among engineering colleges in South Tamil Nadu.'
  }
];

export const COMMITTEES_INFO = [
  {
    id: 'anti-ragging',
    title: 'Anti-Ragging Committee',
    description: 'Constituted per UGC and AICTE statutory regulations to ensure a 100% ragging-free campus. Regular squad patrols, confidential complaint boxes, and swift disciplinary action.',
    contactPerson: 'Dr. S. K. Ramesh (Nodal Officer)',
    phone: '+91 94431 31144'
  },
  {
    id: 'icc',
    title: 'Internal Complaint Committee (ICC)',
    description: 'Addresses workplace and campus harassment complaints in strict compliance with statutory gender equity requirements, offering a safe and confidential grievance channel.',
    contactPerson: 'Dr. C. Anitha (Presiding Officer)',
    phone: '+91 4652 231144'
  },
  {
    id: 'sc-st',
    title: 'SC / ST Committee & Cell',
    description: 'Ensures social welfare, scholarship assistance, academic guidance, and grievance redressal specifically for SC/ST students and staff members.',
    contactPerson: 'Dr. T. Prem Kumar (Cell In-Charge)',
    phone: '+91 4652 231155'
  },
  {
    id: 'grievance',
    title: 'Grievance Redressal Committee',
    description: 'Formal channel for students, parents, and faculty to submit academic or administrative feedback and resolve grievances through structured hearings.',
    contactPerson: 'Dr. J. A. Alex Rajju Balan (Principal)',
    phone: '+91 94431 31144'
  }
];

export const DOCUMENTS_LIST: DocumentItem[] = [
  {
    id: 'doc-prospectus',
    title: 'College Official Prospectus 2026-27',
    filename: 'prospectus.pdf',
    path: '/documents/prospectus.pdf',
    fileSize: '3.4 MB',
    fileType: 'PDF',
    description: 'Complete guide containing eligibility criteria, department profiles, campus facilities, fee structure, and scholarship norms.'
  },
  {
    id: 'doc-application',
    title: 'UG & PG Admission Application Form',
    filename: 'application.pdf',
    path: '/documents/application.pdf',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    description: 'Printable application form for B.E., M.E., and MBA degree courses.'
  },
  {
    id: 'doc-scholarship',
    title: 'Merit & Need-Based Scholarship Form',
    filename: 'scholarship-form.docx',
    path: 'src/assets/images/documents/scholarship-form.docx',
    fileSize: '480 KB',
    fileType: 'DOCX',
    description: 'Scholarship application for first-generation graduates, sports achievers, and single-parent wards.'
  },
  {
    id: 'doc-nirf',
    title: 'NIRF 2025 Institutional Data Submission',
    filename: 'nirf-2025.pdf',
    path: 'src/assets/images/documents/nirf-2025.pdf',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    description: 'Official National Institutional Ranking Framework (NIRF) submitted data for 2025.'
  },
  {
    id: 'doc-aicte',
    title: 'AICTE EOA Approval Letter 2025-26',
    filename: 'aicte-eoa-2025-26.pdf',
    path: 'src/assets/images/documents/aicte-eoa-2025-26.pdf',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    description: 'All India Council for Technical Education (AICTE) Extension of Approval letter for the current academic year.'
  },
  {
    id: 'doc-mandatory',
    title: 'Mandatory Public Disclosure Document',
    filename: 'mandatory-disclosure.pdf',
    path: 'src/assets/images/documents/mandatory-disclosure.pdf',
    fileSize: '4.5 MB',
    fileType: 'PDF',
    description: 'AICTE mandatory disclosure of faculty, infrastructure, labs, and governance details.'
  }
];

export const VISION_MISSION_DATA = {
  vision: "To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.",
  mission: "Our mission is to achieve academic excellence. To develop dynamic, socially conscious technical leaders with professional ethics and human values to serve our Mother Land and the world meritoriously. To train and impart necessary soft skills and communication skills with positive attitude to make our students readily employable."
};

export const COLLEGE_PROFILE_DATA = {
  welcomeText: "Welcome to Vins Christian College of Engineering & Vins Christian Women's College of Engineering. With VINS, be prepared to put yourself on the anvil for budding professionals. VINS believes in the power of imagination and innovation. Those who dare to dream reach the star is VINS moving philosophy. Welcome to Vins Christian Group of Engineering Colleges.",
  historyP1: "VINS started its first Engineering College in 2004 - Vins Christian College of Engineering in Chunkankadai, Nagercoil, Kanyakumari District - the tip of India. An eminent industrialist and a hard core politician Mr. Nanjil M Vincent blossomed this initiative. On the sheer strength of his determination, hardwork and innovations VINS carved a niche of academic excellence, which is recognized by all the stakeholders.",
  womensCollegeP: "In 2009, VINS has established the second Engineering College in its campus - Vins Christian Womens College of Engineering. Both the Engineering Colleges are approved by AICTE and affiliated to Anna University,Chennai.",
  connectivity: "The nearest Airport is at Trivandrum and the nearest Railway station is at Nagercoil."
};

export const FOUNDER_CHAIRMAN_DATA = {
  name: "Mr. Nanjil M. Vincent",
  designation: "Founder Chairman",
  aboutIntro: "A committed industrialist, has now dedicated himself to the cause of Technical Education. His cherished goal is to bring up his brain child Vins Christian College of Engineering as a Model Engineering Institution and one of the best Engineering colleges in Tamilnadu to turn out professionals endowed with rich practical knowledge and dedication.",
  careerHighlights: [
    "MLA., TamilNadu - 1977 - 1984",
    "Deputy Minister for Finance and PWD - 1978 - 1980",
    "M.P. (Rajya Sabha) - 1986 - 1992",
    "Committe on Rules, Rajya Sabha - 1986 - 1987",
    "Committe on Government Assurance - Rajya Sabha - 1988",
    "Committe on Tourism - Rajya Sabha - 1989 - 1990",
    "Participated in Interparliamentary world Conference at Nicaragua in Central America 1987 headed by SHIVARAJ PATIL. (Former Speaker Lok Sabha)"
  ],
  messageParagraphs: [
    "On behalf of Vins Group of Engineering Colleges, I extend my warm regards and best wishes to all of you.",
    "Vins Christian College of Engineering has made an epoch in the field of Engineering Education, throwing its beacon radiance of enlightenment and guidance to multitudes of engineering aspirants far and wide.",
    "The inception of the college in the year 2004 came as a relief and fulfillment of the long -felt desire of innumerable parents who were then longing to admit their children in a well- protected and disciplined Engineering College.",
    "As a founder of Vins Group of Colleges, I feel immensely blessed for the rarest opportunity of serving the general public in the first half of my life as a politician and in the second half solely dedicating myself to the welfare and upliftment of the aspiring student community with a special concern for the poor and the downtrodden.",
    "My vision is to impart interdisciplinary knowledge and understanding among the students leading to inventions and achievements and ultimately to place them as skilful Engineers in the globally competitive arena.",
    "Vins Engineering College is no doubt a college with a difference. It has committed itself to the noble and self less task of molding a new generation of academically excellent Engineers with professional ethics and human values. Being an outstanding Engineering college in South Tamil Nadu, Vins marches ahead with great determination towards its objective of getting its name imprinted among the top five colleges in the overall merit list of the state.",
    "Vins is equipped with a band of highly talented and qualified teachers of experience and expertise. There is no doubt that a world class education is in store for the vinsians.",
    "Vins provided wide exposure to its students by arranging a number of international seminars, inviting world famous scientists and technologists.",
    "Periodical placement classes are conducted with special attention to soft skills and communication in English by regular PhD trainers appointed solely for this purpose.",
    "Vins has instituted a number of scholarship schemes to help the poor and the downtrodden students.",
    "Vins continues its dedicated and selfless service to the promising young Engineers..."
  ]
};

export const PRINCIPAL_DESK_DATA = {
  name: "Dr. J. A. ALEX RAJJU BALAN, M.E.,Ph.D.",
  designation: "Principal",
  messageParagraphs: [
    "Greetings and Welcome to Vins Christian College of Engineering!",
    "Energy for every basic need and a healthy environment to reside in has become the top-notch priorities of the earth’s populace. Engineering science has always been a tradition of certifying the aforesaid priorities with divergent thoughts and ideas. Most of the inventions and accomplishments so far in the field of engineering science have been energy investing while at the same time being detrimental to the environment. Hence, it is of the utmost importance that the current generation of the engineering fraternity preserves the ethics of engineering science to surmount certainty to protect nature. Nature is the ultimate technology that can corroborate engineering science and technology to be self-indulgent, if not conserved properly.",
    "Vins Christian College of Engineering started its voyage in 2004 with a vision of navigating the intricate athwart ocean of science and engineering via the power of the human mind, body, and soul. Management, faculty, and staff strive to inculcate students and self-realize the harmony of human life and nature through applications of science, engineering, and technology. We have student-first philosophy and provide learning with a human touch. In a nutshell, Vins Christian Engineering College is a wonderful expedition to self-realize the engineer in YOU; aboard us to enjoy the Journey."
  ]
};

