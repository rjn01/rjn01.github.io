/* =====================================================================
   data.js  —  ALL THE CONTENT OF THE WEBSITE LIVES HERE.
   ---------------------------------------------------------------------
   You normally only need to edit THIS file to update the site.
   - Add a skill      -> add a string to one of the `skills[].items` arrays
   - Add a job        -> add an object to the TOP of `experience`
   - Add a project    -> add an object to `projects`
   - Add a course     -> add a string to `courses`
   `art` fields choose a built-in comic illustration from js/art.js:
       "city" | "brain" | "robot" | "bank" | "signal" | "eye" | "palette" | "heart" | "book"
   Save the file and refresh the browser. That's it.
   ===================================================================== */

window.RESUME = {
  /* ---------- HERO / IDENTITY ---------- */
  profile: {
    name: "Rajan Puri",
    tagline: "Data Scientist & AI Builder",
    location: "Berlin, Germany",
    // Shown inside the hero speech bubble
    catchphrase: "I build intelligent systems that actually ship.",
    // Short intro shown in the hero caption box
    intro:
      "Ex-Senior Software Developer turned Data Science student at Freie Universität Berlin. " +
      "3+ years shipping banking platforms across Africa, now building AI products — " +
      "from computer vision to emotion-aware journaling.",
    email: "purirajan98@gmail.com",
    phone: "", // optional — leave "" to hide it from the public site
    links: {
      github: "https://github.com/rjn01",
      linkedin: "https://www.linkedin.com/in/-rajan-puri",
    },
    cv: "assets/Rajan_Puri_CV.pdf",
  },

  /* ---------- BIG NUMBERS (shown as comic "burst" badges) ---------- */
  stats: [
    { value: "3+", label: "Years building software" },
    { value: "40%", label: "Faster loan processing" },
    { value: "800", label: "Loans / day enabled" },
    { value: "2×", label: "Pinnacle Awards" },
  ],

  /* ---------- SKILLS ---------- */
  skills: [
    {
      title: "Languages",
      art: "robot",
      items: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
    },
    {
      title: "AI / ML",
      art: "brain",
      items: ["TensorFlow", "Keras", "OpenCV", "YOLO", "Neural Style Transfer", "Data Analysis"],
    },
    {
      title: "Frameworks & Data",
      art: "city",
      items: ["Flask", "Oracle SQL", "Power BI", "Excel", "Jupyter", "Anaconda"],
    },
    {
      title: "Tools & DevOps",
      art: "signal",
      items: ["Git", "Version Control", "Postman", "SonarQube", "FileNet"],
    },
    {
      title: "Superpowers",
      art: "heart",
      items: ["Leadership", "Teamwork", "Communication", "Adaptability", "Creativity", "Critical Thinking"],
    },
  ],

  /* ---------- EXPERIENCE (newest first) ---------- */
  experience: [
    {
      role: "Working Student",
      company: "Fraunhofer FOKUS",
      location: "Berlin, Germany",
      period: "Sep 2025 — Present",
      art: "signal",
      sfx: "NEW ARC!", // short comic sound-effect word shown on the panel (optional)
      points: ["Working on 5G networks and website development."],
    },
    {
      role: "Senior Software Developer",
      company: "Newgen Software",
      location: "Noida, India",
      period: "Jul 2023 — Oct 2024",
      art: "bank",
      sfx: "+40%!",
      points: [
        "Spearheaded RLOS implementation for Banque Misr (Egypt): third-party banking APIs, FileNet document upload/view, business reporting.",
        "Boosted loan processing speed by 40% across Equity Bank subsidiaries (Tanzania, DRC, Uganda, Rwanda) via onsite optimisation in Kenya.",
        "Led a team of 5 developers to deploy RLOS for Equity Bank Kenya — 20% ahead of schedule.",
        "Received the Pinnacle Award from Newgen Software.",
      ],
    },
    {
      role: "Software Developer",
      company: "Newgen Software",
      location: "Noida, India",
      period: "Jul 2021 — Jul 2023",
      art: "city",
      sfx: "NAIROBI!",
      points: [
        "Automated retail & corporate account opening for Equity Bank, cutting manual effort by 30%.",
        "Deployed a Loan Origination System for a leading Nairobi bank — 70% profit increase, ~800 loans/day (~10M KSH).",
        "Worked directly with clients: requirements, Java/JavaScript/SQL development and production support.",
        "Received the Pinnacle Award from Newgen Software.",
      ],
    },
    
  ],

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      name: "True North",
      art: "heart",
      tags: ["AI", "NLP", "Web App"],
      description:
        "A mental-health journaling app that links emotions to habits. An AI backend performs emotion analysis, theme detection and gives gentle, actionable feedback.",
      link: "https://github.com/rjn01/TrueNorth",
    },
    {
      name: "Car Number Plate Extraction",
      art: "eye",
      tags: ["Computer Vision", "YOLO", "OpenCV", "Flask"],
      description:
        "Flask app using OpenCV + YOLO + OCR to read number plates. 85% accuracy, deployed as a traffic-monitoring proof of concept.",
      link: "https://github.com/rjn01/Car-Plate-Extraction",
    },
    {
      name: "Filcture",
      art: "palette",
      tags: ["Deep Learning", "Style Transfer", "Flask"],
      description:
        "Web app that applies artistic filters to images with Neural Style Transfer — real-time transformation, right in the browser.",
      link: "", // leave "" if there is no public link
    },
  ],

  /* ---------- EDUCATION ---------- */
  education: [
    {
      school: "Freie Universität Berlin",
      degree: "M.Sc. Data Science",
      location: "Berlin, Germany",
      period: "Oct 2024 — Present",
      details: ["GPA 1.9"],
    },
    {
      school: "Guru Gobind Singh Indraprastha University",
      degree: "B.Tech Computer Science",
      location: "Delhi, India",
      period: "Aug 2017 — Jun 2021",
      details: ["GPA 8.64 / 10", "Marketing & Management, I2C (Innovation & Incubation) cell"],
    },
  ],

  courses: [
    "Machine Learning — Stanford University",
    "TensorFlow Specialization — DeepLearning.AI",
    "Deep Learning Specialization — DeepLearning.AI",
  ],

  languages: [
    { name: "English", level: "Fluent", percent: 95 },
    { name: "German", level: "Beginner (A1)", percent: 20 },
  ],
};
