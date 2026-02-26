import {
  RxGithubLogo,
  RxLinkedinLogo,
  RxEnvelopeClosed,
} from "react-icons/rx";

// Categorized skills with skill-icons.dev logo IDs (https://skillicons.dev)
// For icons not in skill-icons, we use devicon CDN
const SKILL_ICON_BASE = "https://skillicons.dev/icons?i=";
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const SKILL_CATEGORIES = [
  {
    title: "Programming",
    skills: [
      { name: "C", icon: `${SKILL_ICON_BASE}c` },
      { name: "C++", icon: `${SKILL_ICON_BASE}cpp` },
      { name: "Python (Intermediate)", icon: `${SKILL_ICON_BASE}py` },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Django", icon: `${SKILL_ICON_BASE}django` },
      { name: "Flask", icon: `${SKILL_ICON_BASE}flask` },
      { name: "FastAPI", icon: `${SKILL_ICON_BASE}fastapi` },
      { name: "NumPy", icon: `${DEVICON_BASE}/numpy/numpy-original.svg` },
      { name: "Pandas", icon: `${DEVICON_BASE}/pandas/pandas-original.svg` },
      { name: "TensorFlow", icon: `${SKILL_ICON_BASE}tensorflow` },
      { name: "PyTorch", icon: `${SKILL_ICON_BASE}pytorch` },
      { name: "Scikit-learn", icon: `${SKILL_ICON_BASE}sklearn` },
      { name: "Keras", icon: `${DEVICON_BASE}/keras/keras-original.svg` },
    ],
  },
  {
    title: "Core CS Concepts",
    skills: [
      {
        name: "Data Structures & Algorithms",
        icon: "https://api.iconify.design/flat-color-icons/mind-map.svg",
      },
      {
        name: "System Design",
        icon: "https://api.iconify.design/flat-color-icons/tree-structure.svg",
      },
      {
        name: "OOPs",
        icon: "https://api.iconify.design/flat-color-icons/puzzle.svg",
      },
      {
        name: "DBMS",
        icon: "https://api.iconify.design/flat-color-icons/database.svg",
      },
      {
        name: "Operating Systems",
        icon: "https://api.iconify.design/flat-color-icons/linux.svg",
      },
      {
        name: "Computer Networks",
        icon: "https://api.iconify.design/flat-color-icons/globe.svg",
      },
      {
        name: "Computer Organization",
        icon: "https://api.iconify.design/flat-color-icons/motherboard.svg",
      },
      {
        name: "Compiler Design",
        icon: "https://api.iconify.design/flat-color-icons/engineering.svg",
      },
    ],
  },
  {
    title: "Project Management",
    skills: [
      { name: "Jira", icon: `${DEVICON_BASE}/jira/jira-original.svg` },
      {
        name: "Agile (Scrum)",
        icon: "https://api.iconify.design/flat-color-icons/workflow.svg",
      },
    ],
  },
  {
    title: "VSC, Cloud & DevOps",
    skills: [
      { name: "Git", icon: `${SKILL_ICON_BASE}git` },
      { name: "GitHub", icon: `${SKILL_ICON_BASE}github` },
      { name: "GitLab", icon: `${SKILL_ICON_BASE}gitlab` },
      { name: "AWS", icon: `${SKILL_ICON_BASE}aws` },
      { name: "GCS", icon: `${SKILL_ICON_BASE}gcp` },
      { name: "Docker", icon: `${SKILL_ICON_BASE}docker` },
      { name: "CI/CD", icon: `${SKILL_ICON_BASE}githubactions` },
      { name: "Kubernetes", icon: `${SKILL_ICON_BASE}kubernetes` },
    ],
  },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://linkedin.com/in/shrawanofficial",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/shrwnOfficial",
  },
] as const;

export const FRONTEND_SKILL = [
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Next.js", image: "next.png", width: 80, height: 80 },
  { skill_name: "HTML/CSS", image: "html.png", width: 80, height: 80 },
  { skill_name: "JavaScript", image: "js.png", width: 65, height: 65 },
] as const;

export const BACKEND_SKILL = [
  { skill_name: "Node.js", image: "node.png", width: 80, height: 80 },
  { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "MySQL", image: "mysql.png", width: 70, height: 70 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 40, height: 40 },
] as const;

export const FULLSTACK_SKILL = [
  { skill_name: "Docker", image: "docker.png", width: 70, height: 70 },
  { skill_name: "Kubernetes", image: "tauri.png", width: 70, height: 70 },
  { skill_name: "Git", image: "go.png", width: 60, height: 60 },
] as const;

export const OTHER_SKILL = [
  { skill_name: "AWS", image: "firebase.png", width: 55, height: 55 },
  { skill_name: "GCP", image: "firebase.png", width: 55, height: 55 },
  { skill_name: "Jira", image: "figma.png", width: 50, height: 50 },
] as const;

export const PROJECTS = [
  {
    title: "Which Bollywood Celebrity Are You?",
    description:
      "A fast machine learning web app utilizing deep learning (ResNet50) to instantly detect which Bollywood celebrity you look closest to from an uploaded picture. Achieves high accuracy across thousands of celebrity images.",
    image: "/projects/bollywood-celeb-sketch.jpg",
    link: "https://github.com/shrwnOfficial/Bollywood-Celeb-Predictor",
    logo: "camera",
  },
  {
    title: "WhatsApp Chat Analysis",
    description:
      "A Streamlit app to analyze your WhatsApp chats. Built using Python, extracting insights and generating visualizations from raw chat exports. Provides detailed metrics, activity heatmaps, and word clouds.",
    image: "/projects/whatsapp-analysis-new-2.png",
    link: "https://github.com/shrwnOfficial/whatsapp-chat-analysis",
    logo: "whatsapp",
  },
  {
    title: "AI Water Distribution predictor",
    description:
      "A predictive model using Random Forest Regression to estimate optimal water levels for agricultural tanks in India. Integrates local weather APIs to increase predictive accuracy and aids in water conservation efforts.",
    image: "/projects/kavery_river.jpg",
    link: "https://github.com/shrwnOfficial/AI-water-distribution-",
    logo: "water",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Location",
    data: [
      {
        name: "Bengaluru, India",
        icon: null,
        link: "mailto:shaan.09042@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  { title: "Experience", link: "#experience" },
  { title: "Skills", link: "#skills" },
  { title: "Projects", link: "#projects" },
  { title: "Education", link: "#education" },
  { title: "Certifications", link: "#certifications" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/shrwnOfficial",
};

// Experience data
export const EXPERIENCE = [
  {
    role: "Associate Software Engineer",
    company: "Iron Mountain",
    period: "Apr 2025 - continuing",
    points: [
      "Architecting AI-first document extraction systems using OCR + LLMs, achieving 83% accuracy through elite prompt engineering and model optimization.",
      "Engineered high-performance internal AI tooling, including Flask-based redaction engines and advanced multilingual processing architectures.",
      "Driving cloud AI strategy through GCP integration and technical leadership, scaling team capabilities in next-gen cloud architectures.",
    ],
  },
] as const;

// Education data
export const EDUCATION = [
  {
    degree: "Bachelor of Engineering in AIML",
    school: "B.M.S College Of Engineering",
    location: "Basavanagudi, Bangalore, India",
    period: "2021 - 2025",
    detail: "CGPA: 9.03/10",
  },
  {
    degree: "Class 12",
    school: "St Josephs Indian Composite",
    location: "Vittal Malaya Road, Bangalore, India",
    period: "2019 - 2021",
    detail: "Percentage: 92.17",
  },
  {
    degree: "Class 10",
    school: "Sri Aurbindo Memorial",
    location: "Banashankari, Bangalore, India",
    period: "2018 - 2019",
    detail: "Percentage: 88.2",
  },
] as const;

// Certifications data
export const CERTIFICATIONS = [
  {
    title: "Become Job-Ready in Coding: Data Structures and Algorithms – Simplilearn (May 2024)",
    link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMzczIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvNzU5MjI4OF83ODE1MDgzMTczMjQ0NDg3NDYzMi5wbmciLCJ1c2VybmFtZSI6Ik0gU2hyYXdhbiBNYXRydWJhaSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6201%2FBecome-job-ready-in-coding%3A-Basics-of-Data-Structures-and-Algorithms%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1554322897491689722&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVr6ryLg4vN3T29U%2ByrytKTUstKsrMS49PKsovL04tsnVNSU8FAP5skl49AAAA",
  },
  {
    title: "Machine Learning Using Python – Simplilearn (Apr 2024)",
    link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI2ODciLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC83NTkyNjg4Xzc4MTUwODMxNzMyNDUyNzM0Mzc1LnBuZyIsInVzZXJuYW1lIjoiTSBTaHJhd2FuIE1hdHJ1YmFpIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2789%2FMachine-Learning-using-Python%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1554322897491689722&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVN8pz980My%2FP19U%2ByrytKTUstKsrMS49PKsovL04tsnVNSU8FANBymjw9AAAA",
  },
  {
    title: "Deep Learning for Beginners – Simplilearn (Jan 2024)",
    link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzIxIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvNzU5NDUzNF83ODE1MDgzMTczMjUwNzc1MDYwMS5wbmciLCJ1c2VybmFtZSI6Ik0gU2hyYXdhbiBNYXRydWJhaSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4210%2FDeep-Learning-for-Beginners%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1554322897491689722&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVL7HM9kjMDw3w80%2ByrytKTUstKsrMS49PKsovL04tsnVNSU8FAEbWSxw9AAAA",
  },
  {
    title: "Google Cloud Certified Associate Cloud Engineer (Jun 2025)",
    link: "https://www.credly.com/badges/805b9042-2bd4-4744-b11f-fa699b797c54",
  },
] as const;

// Achievements data
export type Achievement = {
  title: string;
  link?: string;
};

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    title: "GCP Associate Cloud Engineer certified",
    link: "https://www.credly.com/badges/805b9042-2bd4-4744-b11f-fa699b797c54",
  },
  {
    title: "Mastered DSA through consistent practice, solving 10-15 coding problems weekly (Leetcode streak = 130)",
  },
  {
    title: "Led a student-driven community of 650+ members for doubt solving and support",
  },
  {
    title: "Awarded ₹40,000/year Meritorious Scholarship by Foundation for Excellence",
  },
];
