import { useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getAllProjects,
  saveAllProjects,
  calculateProgress,
  getProjectStatus
} from "../utils/localStorage";


function ProjectDetail() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [projects, setProjects] =
    useState(
      getAllProjects()
    );


  const project =
    projects.find(
      (item) =>
        item.id === Number(id)
    );


  const [taskText, setTaskText] =
    useState("");


  if (!project) {

    return (

      <main>

        <div className="container py-5">

          <h2>
            Project not found.
          </h2>

          <button
            className="btn btn-primary mt-3"
            onClick={() =>
              navigate("/projects")
            }
          >
            Back to Projects
          </button>

        </div>

      </main>

    );

  }


  const progress =
    calculateProgress(project);


  const status =
    getProjectStatus(project);


  const completedTasks =
    project.tasks.filter(
      (task) =>
        task.completed
    ).length;


  function saveUpdatedProject(
    updatedProject
  ) {

    const updatedProjects =
      projects.map(
        (item) =>
          item.id ===
          updatedProject.id
            ? updatedProject
            : item
      );


    setProjects(
      updatedProjects
    );


    saveAllProjects(
      updatedProjects
    );
  }


  function addTask() {

    if (!taskText.trim()) {
      return;
    }


    const newTask = {

      id: Date.now(),

      title:
        taskText.trim(),

      completed: false

    };


    const updatedProject = {

      ...project,

      tasks: [
        ...project.tasks,
        newTask
      ]

    };


    saveUpdatedProject(
      updatedProject
    );


    setTaskText("");
  }


  function toggleTask(taskId) {

    const updatedTasks =
      project.tasks.map(
        (task) => {

          if (
            task.id === taskId
          ) {

            return {
              ...task,
              completed:
                !task.completed
            };

          }

          return task;

        }
      );


    const updatedProject = {

      ...project,

      tasks: updatedTasks

    };


    saveUpdatedProject(
      updatedProject
    );
  }


  function deleteTask(taskId) {

    const updatedTasks =
      project.tasks.filter(
        (task) =>
          task.id !== taskId
      );


    const updatedProject = {

      ...project,

      tasks: updatedTasks

    };


    saveUpdatedProject(
      updatedProject
    );
  }


  return (

    <main>

      <div className="container py-5">


        {/* BACK BUTTON */}

        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() =>
            navigate("/projects")
          }
        >
          ← Back to Projects
        </button>


        {/* PROJECT HEADER */}

        <div className="card border-0 shadow-sm p-4 mb-4">

          <div className="d-flex justify-content-between align-items-start">

            <div>

              <span className="badge bg-primary mb-3">
                {project.category}
              </span>

              <h1 className="fw-bold">
                {project.title}
              </h1>

              <p className="text-secondary mb-0">
                {project.description}
              </p>

            </div>


            <span
              className={`badge ${
                status === "Completed"
                  ? "bg-success"
                  : status === "In Progress"
                  ? "bg-primary"
                  : "bg-secondary"
              }`}
            >
              {status}
            </span>

          </div>


          {/* PROGRESS */}

          <div className="mt-4">

            <div className="d-flex justify-content-between mb-2">

              <span className="text-secondary">
                Project Progress
              </span>

              <strong>
                {progress}%
              </strong>

            </div>


            <div
              className="progress"
              style={{
                height: "12px"
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


            <small className="text-secondary d-block mt-2">

              {completedTasks} of{" "}
              {project.tasks.length}{" "}
              tasks completed

            </small>

          </div>

        </div>


        {/* TECHNOLOGIES */}

        <div className="card border-0 shadow-sm p-4 mb-4">

          <h5 className="fw-bold mb-3">
            Technologies
          </h5>


          {project.technologies.map(
            (technology, index) => (

              <span
                key={index}
                className="badge bg-light text-dark me-2 mb-2"
              >
                {technology}
              </span>

            )
          )}

        </div>


        {/* TASK AREA */}

        <div className="card border-0 shadow-sm p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h3 className="fw-bold mb-1">
                Project Tasks
              </h3>

              <p className="text-secondary mb-0">
                Complete tasks to increase your project progress.
              </p>

            </div>


            <span className="badge bg-primary">

              {completedTasks}/
              {project.tasks.length}

            </span>

          </div>


          {/* ADD TASK */}

          <div className="d-flex gap-2 mb-4">

            <input
              type="text"
              className="form-control"
              placeholder="Add a new task..."
              value={taskText}
              onChange={(event) =>
                setTaskText(
                  event.target.value
                )
              }
              onKeyDown={(event) => {

                if (
                  event.key === "Enter"
                ) {

                  addTask();

                }

              }}
            />


            <button
              className="btn btn-primary"
              onClick={addTask}
            >
              + Add Task
            </button>

          </div>


          {/* TASK LIST */}

          {project.tasks.length ===
          0 ? (

            <div className="text-center py-5">

              <h5>
                No tasks yet
              </h5>

              <p className="text-secondary">
                Add your first task above.
              </p>

            </div>

          ) : (

            <div>

              {project.tasks.map(
                (task) => (

                  <div
                    key={task.id}
                    className="task-item d-flex align-items-center justify-content-between"
                  >

                    <div className="d-flex align-items-center gap-3">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={
                          task.completed
                        }
                        onChange={() =>
                          toggleTask(
                            task.id
                          )
                        }
                      />


                      <span
                        className={
                          task.completed
                            ? "task-completed"
                            : ""
                        }
                      >
                        {task.title}
                      </span>

                    </div>


                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteTask(
                          task.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </main>

  );
}

export default ProjectDetail;