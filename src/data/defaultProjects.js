export const SEED_VERSION = "1";

export const defaultProjects = [
  {
    id: 1700000000001,
    title: "Loan Predict",
    description:
      "Machine learning project that classifies loan applications by risk status using Decision Tree and Random Forest models.",
    category: "Machine Learning",
    technologies: [
      "Python",
      "Scikit-learn",
      "Decision Tree",
      "Random Forest"
    ],
    github: "",
    tasks: [
      { id: 1700000000011, title: "Explore and clean the dataset", completed: true },
      { id: 1700000000012, title: "Train the Decision Tree model", completed: true },
      { id: 1700000000013, title: "Train the Random Forest model", completed: true },
      { id: 1700000000014, title: "Compare model results", completed: true }
    ]
  },
  {
    id: 1700000000002,
    title: "DevSpace",
    description:
      "Frontend project management dashboard for adding, tracking and managing projects and their tasks, with data stored in the browser.",
    category: "Web Development",
    technologies: [
      "React",
      "JavaScript",
      "Bootstrap",
      "React Router",
      "LocalStorage",
      "Vite"
    ],
    github: "https://github.com/elifsudetopcu/DevSpace",
    tasks: [
      { id: 1700000000021, title: "Set up React and Vite", completed: true },
      { id: 1700000000022, title: "Build dashboard and project pages", completed: true },
      { id: 1700000000023, title: "Implement CRUD with LocalStorage", completed: true },
      { id: 1700000000024, title: "Deploy to Netlify", completed: true }
    ]
  }
];