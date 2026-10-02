const USERS_KEY = "devspace_users";
const PROJECTS_KEY = "devspace_projects";
const CURRENT_USER_KEY = "devspace_current_user";


/* =========================
   SAFE STORAGE HELPERS
   (localStorage kapalıysa veya veri bozuksa
   uygulama beyaz ekrana düşmesin)
========================= */

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
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch {
    /* depolama kapalı / dolu: sessizce geç */
  }
}


function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* yoksay */
  }
}


/* =========================
   USERS
========================= */

export function getUsers() {
  const users = readJSON(USERS_KEY, []);

  return Array.isArray(users) ? users : [];
}


export function saveUsers(users) {
  writeJSON(USERS_KEY, users);
}


/* =========================
   CURRENT USER
========================= */

export function getCurrentUser() {
  return readJSON(CURRENT_USER_KEY, null);
}


export function saveCurrentUser(user) {
  writeJSON(CURRENT_USER_KEY, user);
}


export function removeCurrentUser() {
  removeKey(CURRENT_USER_KEY);
}


/* =========================
   PROJECTS
========================= */

export function getAllProjects() {
  const projects = readJSON(PROJECTS_KEY, []);

  return Array.isArray(projects) ? projects : [];
}


export function saveAllProjects(projects) {
  writeJSON(PROJECTS_KEY, projects);
}


/* =========================
   USER PROJECTS
========================= */

export function getUserProjects(userId) {

  const projects =
    getAllProjects();

  return projects.filter(
    (project) =>
      project.userId === userId
  );
}


/* =========================
   ADD PROJECT
========================= */

export function addProject(project) {

  const projects =
    getAllProjects();

  projects.push(project);

  saveAllProjects(
    projects
  );
}


/* =========================
   UPDATE PROJECT
========================= */

export function updateProject(
  updatedProject
) {

  const currentUser =
    getCurrentUser();

  if (!currentUser) {
    return;
  }


  const projects =
    getAllProjects();


  const updatedProjects =
    projects.map(
      (project) => {

        if (
          project.id ===
            updatedProject.id &&
          project.userId ===
            currentUser.id
        ) {
          return updatedProject;
        }

        return project;

      }
    );


  saveAllProjects(
    updatedProjects
  );
}


/* =========================
   DELETE PROJECT
========================= */

export function deleteProject(
  projectId
) {

  const currentUser =
    getCurrentUser();

  if (!currentUser) {
    return;
  }


  const projects =
    getAllProjects();


  const updatedProjects =
    projects.filter(
      (project) =>
        !(
          project.id === projectId &&
          project.userId ===
            currentUser.id
        )
    );


  saveAllProjects(
    updatedProjects
  );
}


/* =========================
   CALCULATE PROGRESS
========================= */

export function calculateProgress(
  project
) {

  if (
    !project.tasks ||
    project.tasks.length === 0
  ) {
    return 0;
  }


  const completedTasks =
    project.tasks.filter(
      (task) =>
        task.completed
    ).length;


  return Math.round(
    (
      completedTasks /
      project.tasks.length
    ) * 100
  );
}


/* =========================
   PROJECT STATUS
========================= */

export function getProjectStatus(
  project
) {

  const progress =
    calculateProgress(project);


  if (progress === 100) {
    return "Completed";
  }


  if (progress > 0) {
    return "In Progress";
  }


  return "Not Started";
}