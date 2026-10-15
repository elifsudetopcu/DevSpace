import { useState } from "react";

import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  calculateProgress,
  getProjectStatus
} from "../utils/localStorage";


function Dashboard() {

  const [projects, setProjects] =
    useState(getAllProjects);


  const [showForm, setShowForm] =
    useState(false);


  const [editingProject, setEditingProject] =
    useState(null);


  function handleAddProject(project) {

    addProject(project);

    setProjects(getAllProjects());

    setShowForm(false);
  }


  function handleUpdateProject(project) {

    updateProject(project);

    setProjects(getAllProjects());

    setEditingProject(null);
    setShowForm(false);
  }


  function handleDeleteProject(id) {

    const target =
      projects.find(
        (project) =>
          project.id === id
      );

    const confirmed =
      window.confirm(
        `Delete "${target ? target.title : "this project"}"? This action cannot be undone.`
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

        <div className="workspace-hero mb-5">

          <h1 className="workspace-title fw-bold">

            DevSpace Workspace

          </h1>

          <p className="workspace-subtitle text-secondary mb-0">

            A space to organize
            projects, track progress,
            and grow as a developer.

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
              Projects
            </h2>

            <p className="text-secondary mb-0">
              Manage and track projects.
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

            key={
              editingProject
                ? editingProject.id
                : "new"
            }

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