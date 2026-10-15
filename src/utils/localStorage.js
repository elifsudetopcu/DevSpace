import {
  defaultProjects,
  SEED_VERSION
} from "../data/defaultProjects";

const PROJECTS_KEY = "devspace_projects";
const SEED_KEY = "devspace_seed_version";

export const LIMITS = {
  title: 100,
  description: 1000,
  category: 60,
  technology: 40,
  technologies: 20,
  github: 300,
  taskTitle: 200,
  tasks: 200
};

function readJSON(key, fallback) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function getSafeUrl(value) {
  const text = cleanText(value, LIMITS.github);

  if (!text) {
    return "";
  }

  try {
    const url = new URL(text);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.href;
    }

    return "";
  } catch {
    return "";
  }
}

export function createUniqueId(usedIds) {
  const used = new Set(usedIds);

  let id = Date.now();

  while (used.has(id)) {
    id += 1;
  }

  return id;
}

function normalizeTask(task) {
  if (!task || typeof task !== "object") {
    return null;
  }

  const title = cleanText(task.title, LIMITS.taskTitle);

  if (!Number.isSafeInteger(task.id) || !title) {
    return null;
  }

  return {
    id: task.id,
    title,
    completed: task.completed === true
  };
}

function normalizeProject(project) {
  if (!project || typeof project !== "object") {
    return null;
  }

  const title = cleanText(project.title, LIMITS.title);

  if (!Number.isSafeInteger(project.id) || !title) {
    return null;
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
        .map((technology) =>
          cleanText(technology, LIMITS.technology)
        )
        .filter(Boolean)
        .slice(0, LIMITS.technologies)
    : [];

  const seenTaskIds = new Set();

  const tasks = Array.isArray(project.tasks)
    ? project.tasks
        .map(normalizeTask)
        .filter((task) => {
          if (!task || seenTaskIds.has(task.id)) {
            return false;
          }

          seenTaskIds.add(task.id);

          return true;
        })
        .slice(0, LIMITS.tasks)
    : [];

  return {
    id: project.id,
    title,
    description: cleanText(
      project.description,
      LIMITS.description
    ),
    category: cleanText(project.category, LIMITS.category),
    technologies,
    github: getSafeUrl(project.github),
    tasks
  };
}

export function getAllProjects() {
  const stored = readJSON(PROJECTS_KEY, []);

  if (!Array.isArray(stored)) {
    return [];
  }

  const seenIds = new Set();

  return stored
    .map(normalizeProject)
    .filter((project) => {
      if (!project || seenIds.has(project.id)) {
        return false;
      }

      seenIds.add(project.id);

      return true;
    });
}

export function saveAllProjects(projects) {
  const cleaned = projects
    .map(normalizeProject)
    .filter(Boolean);

  return writeJSON(PROJECTS_KEY, cleaned);
}

export function initializeProjects() {
  if (readJSON(SEED_KEY, null) === SEED_VERSION) {
    return;
  }

  const projects = getAllProjects();

  const ids = new Set(
    projects.map((project) => project.id)
  );

  const titles = new Set(
    projects.map((project) => project.title.toLowerCase())
  );

  const missing = defaultProjects.filter(
    (project) =>
      !ids.has(project.id) &&
      !titles.has(project.title.toLowerCase())
  );

  if (saveAllProjects([...projects, ...missing])) {
    writeJSON(SEED_KEY, SEED_VERSION);
  }
}

export function addProject(project) {
  const projects = getAllProjects();

  const cleaned = normalizeProject(project);

  if (
    !cleaned ||
    projects.some((item) => item.id === cleaned.id)
  ) {
    return;
  }

  saveAllProjects([...projects, cleaned]);
}

export function updateProject(updatedProject) {
  const cleaned = normalizeProject(updatedProject);

  if (!cleaned) {
    return;
  }

  const projects = getAllProjects();

  const updatedProjects = projects.map((project) =>
    project.id === cleaned.id ? cleaned : project
  );

  saveAllProjects(updatedProjects);
}

export function deleteProject(projectId) {
  const projects = getAllProjects();

  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );

  saveAllProjects(updatedProjects);
}

export function calculateProgress(project) {
  const tasks = Array.isArray(project.tasks) ? project.tasks : [];

  if (tasks.length === 0) {
    return 0;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return Math.round((completedTasks / tasks.length) * 100);
}

export function getProjectStatus(project) {
  const progress = calculateProgress(project);

  if (progress === 100) {
    return "Completed";
  }

  if (progress > 0) {
    return "In Progress";
  }

  return "Not Started";
}