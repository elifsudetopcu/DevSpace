import { useEffect, useState } from "react";

import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import {
  getCurrentUser,
  getUserProjects,
  addProject,
  updateProject,
  deleteProject,
  saveAllProjects,
  getAllProjects,
  calculateProgress,
  getProjectStatus
} from "../utils/localStorage";


function Dashboard() {

  const currentUser =
    getCurrentUser();


  const [projects, setProjects] =
    useState(() => {

      if (!currentUser) {
        return [];
      }

      return getUserProjects(
        currentUser.id
      );

    });


  const [showForm, setShowForm] =
    useState(false);


  const [editingProject, setEditingProject] =
    useState(null);


  useEffect(() => {

    if (!currentUser) {
      return;
    }

    const allProjects =
      getAllProjects();

    const userProjects =
      allProjects.filter(
        (project) =>
          project.userId === currentUser.id
      );

    setProjects(userProjects);

  }, [currentUser?.id]);


  function handleAddProject(project) {

    const projectWithUser = {
      ...project,
      userId: currentUser.id
    };

    addProject(projectWithUser);

    setProjects([
      ...projects,
      projectWithUser
    ]);

    setShowForm(false);
  }


  function handleUpdateProject(project) {

    updateProject(project);

    setProjects(
      projects.map(
        (item) =>
          item.id === project.id
            ? project
            : item
      )
    );

    setEditingProject(null);
    setShowForm(false);
  }


  function handleDeleteProject(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    deleteProject(id);

    setProjects(
      projects.filter(
        (project) =>
          project.id !== id
      )
    );
  }


  function handleEditProject(project) {

    setEditingProject(project);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* =========================
     STATISTICS
  ========================= */

  const totalProjects =
    projects.length;


  const completedProjects =
    projects.filter(
      (project) =>
        getProjectStatus(project) ===
        "Completed"
    ).length;


  const inProgressProjects =
    projects.filter(
      (project) =>
        getProjectStatus(project) ===
        "In Progress"
    ).length;


  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) =>
              total +
              calculateProgress(project),
            0
          ) / projects.length
        )
      : 0;


  return (

    <main>

      <div className="container py-5">


        {/* HERO */}

        <div className="mb-5">

          <h1 className="display-5 fw-bold">

            Welcome back,{" "}
            {currentUser?.name} 👋

          </h1>

          <p className="lead text-secondary">

            Track your projects and
            development progress.

          </p>

        </div>


        {/* STATISTICS */}

        <div className="row g-4 mb-5">


          <div className="col-md-6 col-lg-3">

            <div className="stat-card">

              <h6 className="text-secondary">
                Total Projects
              </h6>

              <h2 className="fw-bold">
                {totalProjects}
              </h2>

            </div>

          </div>


          <div className="col-md-6 col-lg-3">

            <div className="stat-card">

              <h6 className="text-secondary">
                Completed
              </h6>

              <h2 className="fw-bold text-success">
                {completedProjects}
              </h2>

            </div>

          </div>


          <div className="col-md-6 col-lg-3">

            <div className="stat-card">

              <h6 className="text-secondary">
                In Progress
              </h6>

              <h2 className="fw-bold text-primary">
                {inProgressProjects}
              </h2>

            </div>

          </div>


          <div className="col-md-6 col-lg-3">

            <div className="stat-card">

              <h6 className="text-secondary">
                Average Progress
              </h6>

              <h2 className="fw-bold">
                {averageProgress}%
              </h2>

            </div>

          </div>

        </div>


        {/* PROJECT HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold mb-1">
              My Projects
            </h2>

            <p className="text-secondary mb-0">
              Manage and track your projects.
            </p>

          </div>


          <button
            className="btn btn-primary"
            onClick={() => {

              setEditingProject(null);

              setShowForm(
                !showForm
              );

            }}
          >

            + Add Project

          </button>

        </div>


        {/* FORM */}

        {showForm && (

          <ProjectForm

            onAdd={
              handleAddProject
            }

            onUpdate={
              handleUpdateProject
            }

            editingProject={
              editingProject
            }

          />

        )}


        {/* PROJECTS */}

        {projects.length === 0 ? (

          <div className="card p-5 text-center">

            <h4 className="fw-bold">
              No projects yet
            </h4>

            <p className="text-secondary">
              Create your first project
              to get started.
            </p>

          </div>

        ) : (

          <div className="row g-4">

            {projects.map(
              (project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={
                    handleDeleteProject
                  }
                  onEdit={
                    handleEditProject
                  }
                />

              )
            )}

          </div>

        )}

      </div>

    </main>

  );
}

export default Dashboard;