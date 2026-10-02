import { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import {
  getCurrentUser,
  getUserProjects,
  deleteProject,
  updateProject
} from "../utils/localStorage";


function Projects() {

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


  const [search, setSearch] =
    useState("");


  const [viewMode, setViewMode] =
    useState("grid");


  const [editingProject, setEditingProject] =
    useState(null);


  const [showEditForm, setShowEditForm] =
    useState(false);


  useEffect(() => {

    if (!currentUser) {
      return;
    }

    setProjects(
      getUserProjects(
        currentUser.id
      )
    );

  }, [currentUser?.id]);


  /* =========================
     DELETE
  ========================= */

  function handleDelete(id) {

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


  /* =========================
     EDIT
  ========================= */

  function handleEdit(project) {

    setEditingProject(
      project
    );

    setShowEditForm(
      true
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =========================
     UPDATE
  ========================= */

  function handleUpdateProject(
    updatedProject
  ) {

    updateProject(
      updatedProject
    );


    setProjects(
      projects.map(
        (project) =>
          project.id ===
          updatedProject.id
            ? updatedProject
            : project
      )
    );


    setEditingProject(
      null
    );

    setShowEditForm(
      false
    );

  }


  /* =========================
     SEARCH
  ========================= */

  const filteredProjects =
    projects.filter(
      (project) =>
        project.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  return (

    <main>

      <div className="container py-5">


        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="fw-bold">
              My Projects
            </h1>

            <p className="text-secondary">
              View and manage all your projects.
            </p>

          </div>


          <div className="btn-group">

            <button
              className={`btn ${
                viewMode === "grid"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                setViewMode("grid")
              }
            >
              ▦ Cards
            </button>


            <button
              className={`btn ${
                viewMode === "list"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                setViewMode("list")
              }
            >
              ☰ List
            </button>

          </div>

        </div>


        {/* EDIT FORM */}

        {showEditForm && editingProject && (

          <ProjectForm
            onAdd={() => {}}
            onUpdate={
              handleUpdateProject
            }
            editingProject={
              editingProject
            }
          />

        )}


        {/* CANCEL EDIT */}

        {showEditForm && (

          <div className="text-end mb-4">

            <button
              className="btn btn-outline-secondary"
              onClick={() => {

                setEditingProject(
                  null
                );

                setShowEditForm(
                  false
                );

              }}
            >
              Cancel Edit
            </button>

          </div>

        )}


        {/* SEARCH */}

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        {/* EMPTY SEARCH RESULT */}

        {filteredProjects.length === 0 && (

          <div className="card p-5 text-center">

            <h4 className="fw-bold">
              No projects found
            </h4>

            <p className="text-secondary mb-0">
              Try another search term.
            </p>

          </div>

        )}


        {/* =========================
            GRID VIEW
        ========================= */}

        {viewMode === "grid" &&
          filteredProjects.length > 0 && (

          <div className="row g-4">

            {filteredProjects.map(
              (project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={
                    handleDelete
                  }
                  onEdit={
                    handleEdit
                  }
                />

              )
            )}

          </div>

        )}


        {/* =========================
            LIST VIEW
        ========================= */}

        {viewMode === "list" &&
          filteredProjects.length > 0 && (

          <div className="card">

            <div className="table-responsive">

              <table className="table table-dark table-hover align-middle mb-0">

                <thead>

                  <tr>

                    <th>
                      Project
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Progress
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Tasks
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredProjects.map(
                    (project) => {

                      const tasks =
                        project.tasks || [];


                      const totalTasks =
                        tasks.length;


                      const completedTasks =
                        tasks.filter(
                          (task) =>
                            task.completed
                        ).length;


                      const progress =
                        totalTasks > 0
                          ? Math.round(
                              (
                                completedTasks /
                                totalTasks
                              ) * 100
                            )
                          : 0;


                      const status =
                        progress === 100
                          ? "Completed"
                          : progress > 0
                          ? "In Progress"
                          : "Not Started";


                      return (

                        <tr
                          key={
                            project.id
                          }
                        >

                          {/* PROJECT */}

                          <td className="fw-bold">

                            {project.title}

                          </td>


                          {/* CATEGORY */}

                          <td>

                            {project.category}

                          </td>


                          {/* PROGRESS */}

                          <td
                            style={{
                              minWidth:
                                "200px"
                            }}
                          >

                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="progress flex-grow-1"
                                style={{
                                  height:
                                    "7px"
                                }}
                              >

                                <div
                                  className="progress-bar bg-primary"
                                  style={{
                                    width:
                                      `${progress}%`
                                  }}
                                />

                              </div>


                              <span>
                                {progress}%
                              </span>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td>

                            {status ===
                            "Completed" ? (

                              <span className="badge bg-success">
                                Completed
                              </span>

                            ) : status ===
                              "In Progress" ? (

                              <span className="badge bg-primary">
                                In Progress
                              </span>

                            ) : (

                              <span className="badge bg-secondary">
                                Not Started
                              </span>

                            )}

                          </td>


                          {/* TASKS */}

                          <td>

                            {completedTasks}/
                            {totalTasks}

                          </td>


                          {/* ACTIONS */}

                          <td>

                            <div className="d-flex gap-2 flex-wrap">

                              <Link
                                to={`/projects/${project.id}`}
                                className="btn btn-primary btn-sm"
                              >
                                View
                              </Link>


                              {project.github && (

                                <a
                                  href={
                                    project.github
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-outline-light btn-sm"
                                >
                                  GitHub
                                </a>

                              )}


                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() =>
                                  handleEdit(
                                    project
                                  )
                                }
                              >
                                Edit
                              </button>


                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                  handleDelete(
                                    project.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </main>

  );
}

export default Projects;