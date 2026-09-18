import { DepartmentItem } from '../types';

export const DEPARTMENTS_DATA: DepartmentItem[] = [
  // 1. UG B.E. Mechanical Engineering
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'Empowering students with core principles of thermodynamics, fluid mechanics, CAD/CAM design, robotics, and advanced manufacturing technologies.',
    bannerPath: 'src/assets/images/department/mechanical/banner.jpg',
    courseImage: '/images/course img/mech.jpg',
    hodName: 'Dr. S. K. Ramesh, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Thermal Engineering (Anna University)',
    hodEmail: 'hod.mech@vins.ac.in',
    intake: 90,
    durationYears: 4,
    vision: 'To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence. To develop dynamic, socially conscious technical leaders with professional ethics and human values to serve our Mother Land and the world meritoriously. To train and impart necessary soft skills and communication skills with positive attitude to make our students readily employable.',
    profileText: 'Mechanical Engineering Department is situated in the midst of beautiful hills at Chunkankadai, Kanyakumari District overlooking NH47. Started in 2004 with 60 seats, increased to 120 in 2011, and now offering 90 seats. The department has 12 well equipped laboratories and workshop with three sections.',
    staffMembers: [
      { name: 'Mr. M. Divin Kumar, M.E.', designation: 'Head & Associate Professor' },
      { name: 'Mr. Rajasekar, M.E.', designation: 'Associate Professor' },
      { name: 'Mr. C. Rajesh, M.E.', designation: 'Assistant Professor' },
      { name: 'Mr. Prabu Regunath Raja, M.E.', designation: 'Assistant Professor' },
      { name: 'Mr. P. Manikandan', designation: 'Assistant Professor' },
      { name: 'Mr. S.P. Rajan', designation: 'Assistant Professor' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/mechanical/lab1.jpg',
      lab2: 'src/assets/images/department/mechanical/lab2.jpg',
      lab3: 'src/assets/images/department/mechanical/lab3.jpg',
      hod: 'src/assets/images/department/mechanical/hod.jpg'
    },
    labsList: [
      'Thermal Engineering Laboratory',
      'CAD / CAM & Robotics Lab',
      'Strength of Materials Lab',
      'Manufacturing Technology Workshop',
      'Dynamics & Vibrations Lab',
      'Mechatronics Laboratory'
    ],
    overviewText: 'The Department of Mechanical Engineering at VINS Christian College of Engineering was established with state-of-the-art infrastructure and modern CNC machining equipment. Our curriculum emphasizes hands-on practical training, industrial visits to automotive hubs, and research projects in renewable energy and modern metallurgy.',
    placementPercentage: 92,
    topRecruiters: ['L&T', 'TCS', 'Cognizant', 'Brakes India', 'TVS Motors', 'Hyundai Motors', 'Ashok Leyland'],
    activities: [
      'National Level Technical Symposium - MECHSPARK',
      'ROBOTRYST Workshop on Autonomous Robotics',
      'Industrial Visit to ISRO Propulsion Complex Mahendragiri',
      '3D Printing & CAD Design Hands-on Certification'
    ],
    symposiums: ['MECHSPARK National Symposium', 'International Conference on Sustainable Manufacturing'],
    curriculumHighlights: [
      'Design of Transmission Systems',
      'Computer Integrated Manufacturing',
      'Finite Element Analysis (FEA)',
      'Automotive Electricals & Hybrid Vehicles'
    ]
  },

  // 2. UG B.E. Computer Science & Engineering
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'Cutting-edge program covering algorithms, cloud computing, full-stack software development, machine learning, and computer networks.',
    bannerPath: 'src/assets/images/department/cse/banner.jpg',
    courseImage: '/images/course img/cse.jpg',
    hodName: 'Mrs. Priya, M.E.',
    hodQualification: 'Head & Associate Professor',
    hodEmail: 'hod.cse@vins.ac.in',
    intake: 60,
    durationYears: 4,
    vision: 'To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence. To develop dynamic, socially conscious technical leaders with professional ethics and human values to serve our Mother Land and the world meritoriously.',
    profileText: 'Department of Computer Science and Engineering was started in the year 2004 with an intake of 60 students and increased to 120 in 2006. In 2010, M.E. Computer Science and Engineering was started with an intake of 18 students. Features advanced computer labs, AICTE internship training, mini projects, and high-speed internet.',
    staffMembers: [
      { name: 'Dr. Gavasker Vincent', designation: 'Professor' },
      { name: 'Mrs. Priya', designation: 'Associate Professor & Head' },
      { name: 'Mrs. Sajitha', designation: 'Associate Professor' },
      { name: 'Mrs. Carolin Preetha', designation: 'Assistant Professor' },
      { name: 'Mrs. Asha Freeda', designation: 'Assistant Professor' },
      { name: 'Mrs. Meeha', designation: 'Assistant Professor' },
      { name: 'Mrs. Jerophine Beni', designation: 'Assistant Professor' },
      { name: 'Mrs. Bebisha', designation: 'Assistant Professor' },
      { name: 'Mrs. Mary Diana', designation: 'Assistant Professor' },
      { name: 'Mrs. Jasmin Rajula', designation: 'Assistant Professor' },
      { name: 'Mrs. Sarraniya', designation: 'Assistant Professor' },
      { name: 'Mrs. Jabisha', designation: 'Assistant Professor' },
      { name: 'Ms. Abisha', designation: 'Assistant Professor' },
      { name: 'Mrs. Sajila', designation: 'Assistant Professor' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/cse/lab1.jpg',
      lab2: 'src/assets/images/department/cse/lab2.jpg',
      lab3: 'src/assets/images/department/cse/lab3.jpg',
      hod: 'src/assets/images/department/cse/hod.jpg'
    },
    labsList: [
      'Advanced Cloud Computing Lab',
      'Artificial Intelligence & Deep Learning Lab',
      'Full Stack Web Development Lab',
      'Database Systems & Big Data Lab',
      'Mobile Application Development Lab',
      'Open Source Software Lab'
    ],
    overviewText: 'The Department of Computer Science & Engineering is equipped with 300+ high-performance workstations, high-speed 1 Gbps fiber internet, and dedicated research servers. Students excel in competitive programming, open-source hackathons, and secure placements at top MNC tech companies.',
    placementPercentage: 96,
    topRecruiters: ['TCS', 'Cognizant', 'Wipro', 'Infosys', 'Zoho', 'Oracle', 'CTS', 'HCL Tech'],
    activities: [
      'National Level Symposium - CYBERTRON',
      'Google Cloud & AWS Developer Certification Bootcamp',
      'Hackathon on Smart City AI Solutions',
      'EDUSAT Live Seminars & Guest Lectures'
    ],
    symposiums: ['CYBERTRON National Technical Fest', 'IEEE Sponsored Conference on Next-Gen Computing'],
    curriculumHighlights: [
      'Data Structures & Advanced Algorithms',
      'Distributed Systems & Cloud Architecture',
      'Machine Learning & Computer Vision',
      'Cyber Security & Cryptography'
    ]
  },

  // 3. UG B.E. Artificial Intelligence & Data Science
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    degree: 'B.E.',
    category: 'UG',
    description: 'Specialized futuristic program training students in Neural Networks, Big Data Analytics, Deep Learning, Generative AI, and Natural Language Processing.',
    bannerPath: 'src/assets/images/department/aids/banner.jpg',
    courseImage: '/images/course img/aids.jpg',
    hodName: 'Dr. M. Chitra Devi, M.Tech., Ph.D.',
    hodQualification: 'Ph.D. in Artificial Intelligence & Pattern Recognition',
    hodEmail: 'hod.aids@vins.ac.in',
    intake: 60,
    durationYears: 4,
    labPaths: {
      lab1: 'src/assets/images/department/aids/lab1.jpg',
      lab2: 'src/assets/images/department/aids/lab2.jpg',
      lab3: 'src/assets/images/department/aids/lab3.jpg',
      hod: 'src/assets/images/department/aids/hod.jpg'
    },
    labsList: [
      'NVIDIA GPU Deep Learning Lab',
      'Big Data & Predictive Analytics Lab',
      'Computer Vision & NLP Studio',
      'Data Visualization & BI Lab'
    ],
    overviewText: 'AI & Data Science is the fastest-growing discipline. Our lab features GPU-powered workstations dedicated to neural network training, computer vision models, and large-scale data engineering.',
    placementPercentage: 94,
    topRecruiters: ['Cognizant AI', 'TCS Digital', 'Zoho Data Labs', 'Infosys Cobalt', 'Accenture AI'],
    activities: [
      'AI & Machine Learning Bootcamps',
      'Kaggle Data Science Competition Club',
      'Generative AI Workshop Series'
    ],
    symposiums: ['NEURON National AI Summit'],
    curriculumHighlights: [
      'Foundations of Data Science',
      'Deep Learning & PyTorch Frameworks',
      'Natural Language Processing',
      'Reinforcement Learning & Robotics'
    ]
  },

  // 4. UG B.E. Agricultural Engineering
  {
    id: 'agri',
    name: 'Agricultural Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'Interdisciplinary branch integrating soil science, irrigation design, farm machinery, food processing technology, and precision agriculture.',
    bannerPath: 'src/assets/images/department/agri/banner.jpg',
    courseImage: '/images/course img/agri.jpg',
    hodName: 'Dr. V. Jayakumar, M.Tech., Ph.D.',
    hodQualification: 'Ph.D. in Agricultural Engineering & Water Resources',
    hodEmail: 'hod.agri@vins.ac.in',
    intake: 60,
    durationYears: 4,
    labPaths: {
      lab1: 'src/assets/images/department/agri/lab1.jpg',
      lab2: 'src/assets/images/department/agri/lab2.jpg',
      lab3: 'src/assets/images/department/agri/lab3.jpg',
      hod: 'src/assets/images/department/agri/hod.jpg'
    },
    labsList: [
      'Soil & Water Conservation Engineering Lab',
      'Farm Machinery & Power Workshop',
      'Food Process Engineering Lab',
      'GIS & Remote Sensing Agriculture Lab'
    ],
    overviewText: 'Located in Kanyakumari district with rich agro-climatic zones, the Agricultural Engineering department provides practical field research plots, drip irrigation testing rigs, and drone crop monitoring technology.',
    placementPercentage: 88,
    topRecruiters: ['Jain Irrigation Systems', 'Mahindra Agri Solutions', 'TAFE Motors', 'NABARD Consultancy', 'ITC Agri Business'],
    activities: [
      'Drone Technology for Crop Health Monitoring',
      'Organic Farming & Drip Irrigation Field Workshop',
      'Agricultural Machinery Expo'
    ],
    symposiums: ['AGRIFEST National Tech Meet'],
    curriculumHighlights: [
      'Farm Tractors & Power Machinery',
      'Precision Farming & IoT Irrigation',
      'Post Harvest & Food Engineering',
      'Hydrology & Watershed Management'
    ]
  },

  // 5. UG B.E. Information Technology
  {
    id: 'it',
    name: 'Information Technology',
    degree: 'B.E.',
    category: 'UG',
    description: 'Comprehensive IT program focusing on software architecture, DevOps, web technologies, cybersecurity, enterprise database management, and mobile systems.',
    bannerPath: 'src/assets/images/department/it/banner.jpg',
    courseImage: '/images/course img/it.jpg',
    hodName: 'Prof. K. Subramanian, M.E.',
    hodQualification: 'M.E. in Information Technology, Pursuing Ph.D.',
    hodEmail: 'hod.it@vins.ac.in',
    intake: 60,
    durationYears: 4,
    labPaths: {
      lab1: 'src/assets/images/department/it/lab1.jpg',
      lab2: 'src/assets/images/department/it/lab2.jpg',
      lab3: 'src/assets/images/department/it/lab3.jpg',
      hod: 'src/assets/images/department/it/hod.jpg'
    },
    labsList: [
      'Web Technology & Microservices Lab',
      'Network Security & Administration Lab',
      'Software Testing & DevOps Lab',
      'Enterprise Systems & Oracle Lab'
    ],
    overviewText: 'The IT Department prepares software engineers skilled in modern web application frameworks, cloud microservices, database tuning, and automated deployment pipelines.',
    placementPercentage: 95,
    topRecruiters: ['TCS', 'Cognizant', 'Infosys', 'Wipro', 'Mindtree', 'Sify Technologies'],
    activities: [
      'DevOps & Kubernetes Workshop',
      'National Web Architecture Hackathon',
      'Cyber Security Awareness Campaign'
    ],
    symposiums: ['INFOPULSE Tech Symposium'],
    curriculumHighlights: [
      'Full Stack Enterprise Web Development',
      'Cloud Native Applications & Docker',
      'Information Security & Ethical Hacking',
      'Software Design Patterns & Architecture'
    ]
  },

  // 6. UG B.E. CSE (AI & Machine Learning)
  {
    id: 'cse-aiml',
    name: 'CSE (AI & Machine Learning)',
    degree: 'B.E.',
    category: 'UG',
    description: 'Specialized CSE degree concentrating on machine learning algorithms, statistical modeling, cognitive computing, and intelligent systems.',
    bannerPath: 'src/assets/images/department/cse-aiml/banner.jpg',
    courseImage: '/images/course img/aiml.jpg',
    hodName: 'Dr. R. Deepa, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Neural Networks & Pattern Analysis',
    hodEmail: 'hod.aiml@vins.ac.in',
    intake: 60,
    durationYears: 4,
    labPaths: {
      lab1: 'src/assets/images/department/cse-aiml/lab1.jpg',
      lab2: 'src/assets/images/department/cse-aiml/lab2.jpg',
      lab3: 'src/assets/images/department/cse-aiml/lab3.jpg',
      hod: 'src/assets/images/department/cse-aiml/hod.jpg'
    },
    labsList: [
      'Cognitive Computing & Robotics Lab',
      'TensorFlow & Machine Learning Lab',
      'Data Analytics & Mining Lab'
    ],
    overviewText: 'Combines rigorous Computer Science core courses with deep specialization in statistical machine learning, computer vision, and predictive intelligence.',
    placementPercentage: 95,
    topRecruiters: ['TCS Digital', 'Cognizant AI', 'Infosys AI', 'Zoho', 'Bosch AI'],
    activities: ['Kaggle Machine Learning League', 'Computer Vision Hackathon'],
    symposiums: ['AIML-FORUM National Tech Fest'],
    curriculumHighlights: ['Supervised & Unsupervised Learning', 'Probabilistic Graphical Models', 'Deep Neural Networks']
  },

  // 7. UG B.E. CSE (Cyber Security)
  {
    id: 'cse-cybersecurity',
    name: 'CSE (Cyber Security)',
    degree: 'B.E.',
    category: 'UG',
    description: 'Specialized program training ethical hackers, security analysts, and network defense specialists with hands-on penetration testing labs.',
    bannerPath: 'src/assets/images/department/cse-cybersecurity/banner.jpg',
    courseImage: '/images/course img/cyber.jpg',
    hodName: 'Dr. G. Vivek, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Network Security & Forensics',
    hodEmail: 'hod.cyber@vins.ac.in',
    intake: 60,
    durationYears: 4,
    labPaths: {
      lab1: 'src/assets/images/department/cse-cybersecurity/lab1.jpg',
      lab2: 'src/assets/images/department/cse-cybersecurity/lab2.jpg',
      lab3: 'src/assets/images/department/cse-cybersecurity/lab3.jpg',
      hod: 'src/assets/images/department/cse-cybersecurity/hod.jpg'
    },
    labsList: [
      'Ethical Hacking & Pen Testing Cyber Range',
      'Digital Forensics & Reverse Engineering Lab',
      'Network Defense & Firewall Lab'
    ],
    overviewText: 'Equipped with a simulated Cyber Range environment for real-time defense against malware, ransomware, penetration testing, and digital forensic investigation.',
    placementPercentage: 93,
    topRecruiters: ['PwC Cyber', 'Deloitte Risk', 'TCS Cyber Security', 'Sify Security', 'CyberRes Micro Focus'],
    activities: ['Capture The Flag (CTF) Security Competition', 'Ethical Hacking Certification Bootcamp'],
    symposiums: ['CYBERDEFENSE Tech Summit'],
    curriculumHighlights: ['Ethical Hacking & Vulnerability Assessment', 'Digital Forensics & Incident Response', 'Blockchain Security']
  },

  // 8. UG B.E. Civil Engineering
  {
    id: 'civil',
    name: 'Civil Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'Building infrastructure, sustainable structural engineering, surveying, soil mechanics, transportation engineering, and environmental design.',
    bannerPath: 'src/assets/images/department/civil/banner.jpg',
    courseImage: '/images/course img/civil.jpg',
    hodName: 'Mrs. Sunitha Kumari, M.E.',
    hodQualification: 'Head & Associate Professor',
    hodEmail: 'hod.civil@vins.ac.in',
    intake: 60,
    durationYears: 4,
    vision: 'To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence. To develop dynamic, socially conscious technical leaders with professional ethics and human values to serve our Mother Land.',
    profileText: 'Department of Civil Engineering was established in 2013 with 60 intake. Features 9 well aerated classrooms, 9 specialized laboratories including Total Station Surveying, Soil Mechanics, Structural Testing, and Environmental Labs, and a dedicated department library.',
    staffMembers: [
      { name: 'Mrs. Sunitha Kumari', designation: 'Head & Associate Professor' },
      { name: 'Mrs. Jasmine, M.E.', designation: 'Assistant Professor' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/civil/lab1.jpg',
      lab2: 'src/assets/images/department/civil/lab2.jpg',
      lab3: 'src/assets/images/department/civil/lab3.jpg',
      hod: 'src/assets/images/department/civil/hod.jpg'
    },
    labsList: [
      'Structural Engineering & Concrete Testing Lab',
      'Soil Mechanics & Geotechnical Lab',
      'Total Station & GPS Surveying Lab',
      'Environmental Engineering & Water Testing Lab'
    ],
    overviewText: 'Focusing on smart infrastructure, earthquake-resistant design, and green building technology with modern compression testing machines and Total Station surveying instruments.',
    placementPercentage: 89,
    topRecruiters: ['L&T Construction', 'Sobha Developers', 'TATA Projects', 'Shapoorji Pallonji', 'NCC Ltd'],
    activities: ['Survey Camp at Western Ghats', 'Bridge Model Design Competition', 'Concrete Mix Design Workshop'],
    symposiums: ['CIVILIX National Tech Meet'],
    curriculumHighlights: ['Design of Reinforced Concrete Structures', 'Structural Dynamics & Earthquake Engineering', 'BIM & AutoCAD Civil 3D']
  },

  // 9. UG B.E. Electrical & Electronics Engineering
  {
    id: 'eee',
    name: 'Electrical & Electronics Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'Core electrical engineering focusing on power systems, renewable energy grids, electric vehicle technology, power electronics, and industrial automation.',
    bannerPath: 'src/assets/images/department/eee/banner.jpg',
    courseImage: '/images/course img/eee.jpg',
    hodName: 'Dr. C. Anitha, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Power Electronics & Renewable Energy Grids',
    hodEmail: 'hod.eee@vins.ac.in',
    intake: 30,
    durationYears: 4,
    vision: 'To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence and impart necessary technical and soft skills to make students readily employable.',
    profileText: 'Department of Electrical & Electronics Engineering was established in 2004 with 30 intake. Equipped with modern electric machines lab, power electronics lab, and MATLAB simulation software.',
    staffMembers: [
      { name: 'Dr. C. Anitha, M.E., Ph.D.', designation: 'Head & Professor' },
      { name: 'Mr. F. Bright Singh, M.E.', designation: 'Assistant Professor' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/eee/lab1.jpg',
      lab2: 'src/assets/images/department/eee/lab2.jpg',
      lab3: 'src/assets/images/department/eee/lab3.jpg',
      hod: 'src/assets/images/department/eee/hod.jpg'
    },
    labsList: [
      'Electric Machines & Motors Lab',
      'Power Electronics & Drives Lab',
      'Power System Simulation Lab (MATLAB/ETAP)',
      'Control Systems & Microcontroller Lab'
    ],
    overviewText: 'Empowering students in green power generation, EV motor control, smart grid metering, and SCADA automation systems.',
    placementPercentage: 91,
    topRecruiters: ['L&T Electrical', 'TNSCB', 'BHEL Training', 'Schneider Electric', 'TCS', 'Cognizant'],
    activities: ['EV Power Train Design Workshop', 'Solar PV Power Station Visit', 'PLC & SCADA Automation Training'],
    symposiums: ['ELECTRA National Symposium'],
    curriculumHighlights: ['Power Electronics & Inverters', 'Smart Grid Technology & Renewable Energy', 'Electric Vehicle Systems Design']
  },

  // 10. UG B.E. Electronics & Communication Engineering
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    degree: 'B.E.',
    category: 'UG',
    description: 'VLSI design, embedded systems, IoT devices, 5G wireless communication, signal processing, and antenna design.',
    bannerPath: 'src/assets/images/department/ece/banner.jpg',
    courseImage: '/images/course img/ece.jpg',
    hodName: 'Mrs. S.V. Brindha, M.E.',
    hodQualification: 'Associate Professor & Head',
    hodEmail: 'hod.ece@vins.ac.in',
    intake: 60,
    durationYears: 4,
    vision: 'To educate and shape disciplined engineers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence and turn out professionals endowed with rich practical knowledge and dedication.',
    profileText: 'Department of Electronics & Communication Engineering was established in 2004 with 60 intake, increased to 120 in 2006. M.E. Communication Systems introduced in 2012. Accredited by NBA, featuring 14 dedicated faculty members (2 Ph.D. holders, 3 Associate Professors, 9 Assistant Professors), 9 classrooms, and 9 advanced labs.',
    staffMembers: [
      { name: 'Dr. J.A. Alex Rajju Balan, M.E., Ph.D.', designation: 'Professor & Principal' },
      { name: 'Dr. V. Dyana Christilda, M.E., Ph.D.', designation: 'Professor' },
      { name: 'Mrs. S.V. Brindha, M.E.', designation: 'Associate Professor & Head' },
      { name: 'Mrs. Shajini.E.L, M.E.', designation: 'Assistant Professor' }
    ],
    rankHolders: [
      { name: 'Ms. Minu Steffi.C', degree: 'B.E. ECE', cgpa: '8.91', rank: '35' },
      { name: 'Ms. Arul Senika.A', degree: 'M.E. Communication Systems', cgpa: '8.55', rank: '27' },
      { name: 'Ms. Rathiya Rani.D.V', degree: 'M.E. Applied Electronics', cgpa: '8.59', rank: '31' },
      { name: 'Ms. Soniya Rani.R', degree: 'M.E. Applied Electronics', cgpa: '8.49', rank: '38' },
      { name: 'Ms. Shajini.N.L', degree: 'M.E. Applied Electronics', cgpa: '8.39', rank: '45' },
      { name: 'Ms. Chris Sabna Asmy', degree: 'M.E. Communication Systems', cgpa: '8.25', rank: '48' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/ece/lab1.jpg',
      lab2: 'src/assets/images/department/ece/lab2.jpg',
      lab3: 'src/assets/images/department/ece/lab3.jpg',
      hod: 'src/assets/images/department/ece/hod.jpg'
    },
    labsList: [
      'VLSI Design & Cadence Tool Suite Lab',
      'Embedded Systems & IoT Innovation Lab',
      'Digital Signal Processing & Image Processing Lab',
      'Optical & Microwave Communication Lab'
    ],
    overviewText: 'Equipped with Cadence IC design tools, FPGA trainer kits, and spectrum analyzers. ECE students excel in semiconductor software, embedded hardware, and telecommunications.',
    placementPercentage: 94,
    topRecruiters: ['Nokia', 'Oracle', 'Qualcomm (Intern)', 'TCS', 'Cognizant', 'Wipro', 'Texmo Precision'],
    activities: ['Cadence VLSI Design Certification', 'IoT Hardware Hackathon', 'Robotics & Microcontroller Workshop'],
    symposiums: ['COMMUNIX National Tech Meet'],
    curriculumHighlights: ['VLSI Systems Design', 'Embedded Systems & ARM Processors', 'Wireless 5G Networks & Antennas']
  },

  // 11. PG M.E. Construction Engineering & Management
  {
    id: 'me-construction',
    name: 'M.E. Construction Engineering & Management',
    degree: 'M.E.',
    category: 'PG',
    description: 'Postgraduate program covering advanced project management, contract law, BIM modelling, structural safety, and high-rise construction techniques.',
    bannerPath: 'src/assets/images/department/me-construction/banner.jpg',
    courseImage: '/images/course img/me construction.jpg',
    hodName: 'Dr. T. Prem Kumar, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Structural Engineering & Project Management',
    hodEmail: 'me.construction@vins.ac.in',
    intake: 18,
    durationYears: 2,
    labPaths: {
      lab1: 'src/assets/images/department/me-construction/lab1.jpg',
      lab2: 'src/assets/images/department/me-construction/lab2.jpg',
      lab3: 'src/assets/images/department/me-construction/lab3.jpg',
      hod: 'src/assets/images/department/me-construction/hod.jpg'
    },
    labsList: [
      'Advanced Construction Software Studio (Primavera & MSP)',
      'Building Information Modeling (BIM) Lab',
      'Advanced Material Testing Lab'
    ],
    overviewText: 'Prepares postgraduates for leadership roles in large infrastructure firms, project scheduling, structural audits, and green building certifications.',
    placementPercentage: 90,
    topRecruiters: ['L&T Infrastructure', 'Shapoorji Pallonji', 'JMC Projects', 'Anand Builders'],
    activities: ['High-Rise Site Inspection', 'Primavera P6 Scheduling Workshop'],
    symposiums: ['BUILDCON PG Research Conference'],
    curriculumHighlights: ['Project Formulation & Appraisal', 'Advanced Structural Design', 'Construction Quality & Safety Management']
  },

  // 12. PG M.E. Computer Science & Engineering
  {
    id: 'me-cse',
    name: 'M.E. Computer Science & Engineering',
    degree: 'M.E.',
    category: 'PG',
    description: 'Advanced Master of Engineering program covering parallel computing, cybersecurity research, big data analytics, and cloud virtualization.',
    bannerPath: 'src/assets/images/department/me-cse/banner.jpg',
    courseImage: '/images/course img/me cse.jpg',
    hodName: 'Dr. P. Arul Sunder, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Computer Science & Systems',
    hodEmail: 'me.cse@vins.ac.in',
    intake: 18,
    durationYears: 2,
    labPaths: {
      lab1: 'src/assets/images/department/me-cse/lab1.jpg',
      lab2: 'src/assets/images/department/me-cse/lab2.jpg',
      lab3: 'src/assets/images/department/me-cse/lab3.jpg',
      hod: 'src/assets/images/department/me-cse/hod.jpg'
    },
    labsList: [
      'Advanced Computer Science Systems & Research Lab',
      'Cloud Server Grid & Mobile Computing Lab'
    ],
    overviewText: 'Prepares software architects, machine learning researchers, and future doctoral scholars with thesis mentorship and industry collaborative projects.',
    placementPercentage: 94,
    topRecruiters: ['TCS Innovation Labs', 'Cognizant Technology Solutions', 'Wipro R&D', 'Zoho R&D'],
    activities: ['Scopus Journal Paper Writing Bootcamp', 'Cloud Computing Architecture Seminar'],
    symposiums: ['PG-CSERESEARCH National Colloquium'],
    curriculumHighlights: ['Advanced Algorithms Analysis', 'Cloud Computing Technologies', 'Machine Learning Systems']
  },

  // 13. PG M.E. Communication Systems
  {
    id: 'me-communication',
    name: 'M.E. Communication Systems',
    degree: 'M.E.',
    category: 'PG',
    description: 'Postgraduate research program focused on advanced signal processing, satellite communications, optical networks, and cognitive radio.',
    bannerPath: 'src/assets/images/department/me-communication/banner.jpg',
    courseImage: '/images/course img/me communicationn.jpg',
    hodName: 'Dr. M. Senthil Nathan, M.E., Ph.D.',
    hodQualification: 'Ph.D. in Communication Systems',
    hodEmail: 'me.communication@vins.ac.in',
    intake: 18,
    durationYears: 2,
    labPaths: {
      lab1: 'src/assets/images/department/me-communication/lab1.jpg',
      lab2: 'src/assets/images/department/me-communication/lab2.jpg',
      lab3: 'src/assets/images/department/me-communication/lab3.jpg',
      hod: 'src/assets/images/department/me-communication/hod.jpg'
    },
    labsList: [
      'Advanced Communication Research Studio (MATLAB/HFSS)',
      'Wireless Mesh Network Testbed',
      'RF & Microwave Characterization Lab'
    ],
    overviewText: 'Focused on cutting-edge research in 6G communications, satellite antenna design, and smart sensor network protocols with peer-reviewed journal publications.',
    placementPercentage: 92,
    topRecruiters: ['Nokia Bell Labs', 'Reliance Jio Research', 'Tejas Networks', 'TCS Research'],
    activities: ['IEEE Research Paper Publishing Workshop', 'HFSS Antenna Design Studio'],
    symposiums: ['COMMSYS PG National Conference'],
    curriculumHighlights: ['Advanced Digital Signal Processing', 'Wireless Broadband Communications', 'RF MEMS Design']
  },

  // 14. Consolidated MBA Master of Business Administration
  {
    id: 'mba',
    name: 'Master of Business Administration (MBA)',
    degree: 'MBA',
    category: 'Management',
    description: 'Premier 2-year MBA program with dual specializations in Finance, Marketing, Human Resource Management, and Operations & Supply Chain Analytics.',
    bannerPath: 'src/assets/images/department/mba/banner.jpg',
    courseImage: '/images/course img/mba.jpg',
    hodName: 'Dr. M.B. Sudhan, M.Tech., Ph.D.',
    hodQualification: 'Head & Associate Professor',
    hodEmail: 'hod.mba@vins.ac.in',
    intake: 60,
    durationYears: 2,
    vision: 'To educate and shape disciplined managers and to encourage inter disciplinary knowledge and understanding among the students, leading to inventions and achievements.',
    mission: 'Our mission is to achieve academic excellence. To develop dynamic, socially conscious technical leaders with professional ethics and human values to serve our Mother Land.',
    profileText: 'Department of Management Studies at VINS Christian College of Engineering was established in 2006 with 60 intake. Offers dual specializations in Finance, Marketing, HR, and Systems with soft skills development and industrial exposure.',
    staffMembers: [
      { name: 'Dr. M.B. Sudhan, M.Tech., Ph.D.', designation: 'Head & Associate Professor' },
      { name: 'Ms. Sony Reeta, M.E.', designation: 'Associate Professor' },
      { name: 'Ms. S.V. Brindha, M.E.', designation: 'Associate Professor' },
      { name: 'Mr. F. Bright Singh, M.E.', designation: 'Assistant Professor' },
      { name: 'Ms. Shajini.E.L', designation: 'Assistant Professor' },
      { name: 'Ms. Merlin Viji', designation: 'Assistant Professor' },
      { name: 'Ms. P. Thenmozhy', designation: 'Assistant Professor' },
      { name: 'Ms. Sherly Selvin', designation: 'Assistant Professor' },
      { name: 'Ms. Anusha.A', designation: 'Assistant Professor' },
      { name: 'Ms. Shajin Edward', designation: 'Assistant Professor' },
      { name: 'Ms. Feril Jenifer', designation: 'Assistant Professor' },
      { name: 'Ms. Kalaiselvi', designation: 'Assistant Professor' },
      { name: 'Ms. Belkhana', designation: 'Assistant Professor' },
      { name: 'Ms. Abima John', designation: 'Assistant Professor' },
      { name: 'Ms. Paulin Mini.P', designation: 'Assistant Professor' },
      { name: 'Ms. Nisha.J.M', designation: 'Assistant Professor' },
      { name: 'Ms. Mary Ayisha Hermal.S', designation: 'Assistant Professor' },
      { name: 'Ms. Steffna.S', designation: 'Assistant Professor' },
      { name: 'Ms. Sindhuja.N', designation: 'Assistant Professor' },
      { name: 'Ms. Dalisha.X', designation: 'Assistant Professor' },
      { name: 'Ms. AnuPriya.A', designation: 'Assistant Professor' },
      { name: 'Ms. Sabitha.K.P', designation: 'Assistant Professor' }
    ],
    labPaths: {
      lab1: 'src/assets/images/department/mba/lab1.jpg',
      lab2: 'src/assets/images/department/mba/lab2.jpg',
      lab3: 'src/assets/images/department/mba/lab3.jpg',
      hod: 'src/assets/images/department/mba/hod.jpg'
    },
    labsList: [
      'Bloomberg Terminal & Financial Analytics Lab',
      'Digital Marketing Studio & Media Lab',
      'Soft Skills & Corporate Persona Development Studio',
      'Supply Chain & ERP Simulation Lab'
    ],
    overviewText: 'The Department of Management Studies at VINS provides rigorous corporate training with dual specializations across Finance, Marketing, HR, and Supply Chain Logistics. Our MBA graduates hold key leadership roles in top multinational companies and banking firms.',
    placementPercentage: 95,
    topRecruiters: ['HDFC Bank', 'ICICI Securities', 'Axis Bank', 'Hindustan Unilever', 'Amazon India', 'TCS HR', 'Maersk Logistics'],
    activities: [
      'FINFEST Stock Trading & Portfolio League',
      'Ad-Mad Brand Marketing Competition',
      'HR Leadership Conclave & Role Play Workshops',
      'Port Logistics Field Visit to Tuticorin Port'
    ],
    symposiums: ['VINS-MANAGE National Management Meet'],
    curriculumHighlights: [
      'Corporate Finance & Investment Banking',
      'Digital Marketing & Consumer Insights',
      'Strategic HR Management & Industrial Laws',
      'Supply Chain Analytics & Power BI'
    ]
  }
];
