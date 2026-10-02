const USERS_KEY = "devspace_users";
const PROJECTS_KEY = "devspace_projects";
const CURRENT_USER_KEY = "devspace_current_user";

/* =========================
   USERS
========================= */

export function getUsers() {
  const data = localStorage.getItem(USERS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}


/* =========================
   CURRENT USER
========================= */

export function getCurrentUser() {
  const data = localStorage.getItem(
    CURRENT_USER_KEY
  );

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export function saveCurrentUser(user) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
}

export function removeCurrentUser() {
  localStorage.removeItem(
    CURRENT_USER_KEY
  );
}


/* =========================
   PROJECTS
========================= */

export function getAllProjects() {
  const data = localStorage.getItem(
    PROJECTS_KEY
  );

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveAllProjects(projects) {
  localStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify(projects)
  );
}


/* =========================
   USER PROJECTS
========================= */

export function getUserProjects(userId) {
  const projects = getAllProjects();

  return projects.filter(
    (project) => project.userId === userId
  );
}


/* =========================
   ADD PROJECT
========================= */

export function addProject(project) {
  const projects = getAllProjects();

  projects.push(project);

  saveAllProjects(projects);
}


/* =========================
   UPDATE PROJECT
========================= */

export function updateProject(updatedProject) {
  const projects = getAllProjects();

  const updatedProjects = projects.map(
    (project) => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      }

      return project;
    }
  );

  saveAllProjects(updatedProjects);
}


/* =========================
   DELETE PROJECT
========================= */

export function deleteProject(projectId) {
  const projects = getAllProjects();

  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );

  saveAllProjects(updatedProjects);
}


/* =========================
   CALCULATE PROGRESS
========================= */

export function calculateProgress(project) {
  if (
    !project.tasks ||
    project.tasks.length === 0
  ) {
    return 0;
  }

  const completedTasks =
    project.tasks.filter(
      (task) => task.completed
    ).length;

  return Math.round(
    (completedTasks / project.tasks.length) * 100
  );
}


/* =========================
   PROJECT STATUS
========================= */

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