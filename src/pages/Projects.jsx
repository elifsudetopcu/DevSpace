import { useEffect, useState } from "react";

import ProjectCard from "../components/ProjectCard";

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


  function handleEdit(project) {

    const newTitle =
      window.prompt(
        "Enter new project name:",
        project.title
      );

    if (!newTitle) {
      return;
    }


    const updatedProject = {
      ...project,
      title: newTitle
    };


    updateProject(
      updatedProject
    );


    setProjects(
      projects.map(
        (item) =>
          item.id === project.id
            ? updatedProject
            : item
      )
    );
  }


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


        {/* GRID */}

        {viewMode === "grid" && (

          <div className="row g-4">

            {filteredProjects.map(
              (project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />

              )
            )}

          </div>

        )}


        {/* LIST */}

        {viewMode === "list" && (

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

                  </tr>

                </thead>


                <tbody>

                  {filteredProjects.map(
                    (project) => {

                      const totalTasks =
                        project.tasks.length;

                      const completedTasks =
                        project.tasks.filter(
                          (task) =>
                            task.completed
                        ).length;

                      const progress =
                        totalTasks > 0
                          ? Math.round(
                              (completedTasks /
                                totalTasks) *
                                100
                            )
                          : 0;


                      return (

                        <tr
                          key={project.id}
                        >

                          <td className="fw-bold">

                            {project.title}

                          </td>


                          <td>

                            {project.category}

                          </td>


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


                          <td>

                            {progress ===
                            100 ? (

                              <span className="badge bg-success">
                                Completed
                              </span>

                            ) : progress >
                              0 ? (

                              <span className="badge bg-primary">
                                In Progress
                              </span>

                            ) : (

                              <span className="badge bg-secondary">
                                Not Started
                              </span>

                            )}

                          </td>


                          <td>

                            {completedTasks}
                            /
                            {totalTasks}

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