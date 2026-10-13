const PROJECTS_KEY = "devspace_projects";

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
  } catch {
    return;
  }
}

export function getAllProjects() {
  const projects = readJSON(PROJECTS_KEY, []);

  return Array.isArray(projects) ? projects : [];
}

export function saveAllProjects(projects) {
  writeJSON(PROJECTS_KEY, projects);
}

export function addProject(project) {
  const projects = getAllProjects();

  projects.push(project);

  saveAllProjects(projects);
}

export function updateProject(updatedProject) {
  const projects = getAllProjects();

  const updatedProjects = projects.map((project) =>
    project.id === updatedProject.id ? updatedProject : project
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