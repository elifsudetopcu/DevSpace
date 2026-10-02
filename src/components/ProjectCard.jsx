import { Link } from "react-router-dom";

import {
  calculateProgress,
  getProjectStatus
} from "../utils/localStorage";


function ProjectCard({
  project,
  onDelete,
  onEdit
}) {

  const progress =
    calculateProgress(project);

  const status =
    getProjectStatus(project);

  const totalTasks =
    project.tasks
      ? project.tasks.length
      : 0;

  const completedTasks =
    project.tasks
      ? project.tasks.filter(
          (task) => task.completed
        ).length
      : 0;


  function getStatusClass() {

    if (status === "Completed") {
      return "bg-success";
    }

    if (status === "In Progress") {
      return "bg-primary";
    }

    return "bg-secondary";
  }


  return (

    <div className="col-md-6 col-lg-4">

      <div className="card h-100 border-0 shadow-sm">

        <div className="card-body d-flex flex-column">


          {/* CATEGORY + STATUS */}

          <div className="d-flex justify-content-between align-items-start mb-3">

            <span className="badge bg-dark-subtle text-light">
              {project.category}
            </span>

            <span
              className={`badge ${getStatusClass()}`}
            >
              {status}
            </span>

          </div>


          {/* TITLE */}

          <h5 className="card-title fw-bold">
            {project.title}
          </h5>


          {/* DESCRIPTION */}

          <p className="card-text text-secondary">
            {project.description}
          </p>


          {/* TECHNOLOGIES */}

          <div className="mb-3">

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


          {/* PROGRESS */}

          <div className="mt-auto">

            <div className="d-flex justify-content-between mb-2">

              <small className="text-secondary">
                Progress
              </small>

              <small className="fw-bold">
                {progress}%
              </small>

            </div>


            <div
              className="progress"
              style={{ height: "8px" }}
            >

              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>


            <small className="text-secondary d-block mt-2">
              {completedTasks} / {totalTasks} tasks completed
            </small>

          </div>


          {/* BUTTONS */}

          <div className="d-flex gap-2 mt-4 flex-wrap">

            <Link
              to={`/projects/${project.id}`}
              className="btn btn-primary btn-sm"
            >
              View
            </Link>


            {project.github && (

              <a
                href={project.github}
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
                onEdit(project)
              }
            >
              Edit
            </button>


            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() =>
                onDelete(project.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProjectCard;