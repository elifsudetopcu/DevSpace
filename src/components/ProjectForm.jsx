import { useState } from "react";

function ProjectForm({
  onAdd,
  onUpdate,
  editingProject
}) {

  const isEditing = Boolean(editingProject);

  const [title, setTitle] = useState(
    editingProject?.title || ""
  );

  const [description, setDescription] = useState(
    editingProject?.description || ""
  );

  const [category, setCategory] = useState(
    editingProject?.category || ""
  );

  const [technologies, setTechnologies] = useState(
    editingProject?.technologies?.join(", ") || ""
  );

  const [github, setGithub] = useState(
    editingProject?.github || ""
  );

  const [taskText, setTaskText] = useState("");

  const [tasks, setTasks] = useState(
    editingProject?.tasks || []
  );


  function addTask() {

    if (!taskText.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskText.trim(),
      completed: false
    };

    setTasks([
      ...tasks,
      newTask
    ]);

    setTaskText("");
  }


  function removeTask(taskId) {

    setTasks(
      tasks.filter(
        (task) => task.id !== taskId
      )
    );
  }


  function handleSubmit(event) {

    event.preventDefault();

    const projectData = {

      id: isEditing
        ? editingProject.id
        : Date.now(),

      userId: isEditing
        ? editingProject.userId
        : null,

      title: title.trim(),

      description: description.trim(),

      category: category.trim(),

      technologies:
        technologies
          .split(",")
          .map(
            (technology) =>
              technology.trim()
          )
          .filter(
            (technology) =>
              technology !== ""
          ),

      github: github.trim(),

      tasks: tasks
    };


    if (isEditing) {

      onUpdate(projectData);

    } else {

      onAdd(projectData);

    }


    setTitle("");
    setDescription("");
    setCategory("");
    setTechnologies("");
    setGithub("");
    setTasks([]);
    setTaskText("");
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="card border-0 shadow-sm p-4 mb-5"
    >

      <h4 className="fw-bold mb-4">
        {isEditing
          ? "Edit Project"
          : "Add New Project"}
      </h4>


      {/* PROJECT NAME */}

      <div className="mb-3">

        <label className="form-label">
          Project Name
        </label>

        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Example: ScanGuard"
          required
        />

      </div>


      {/* DESCRIPTION */}

      <div className="mb-3">

        <label className="form-label">
          Description
        </label>

        <textarea
          className="form-control"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Enter project description"
          rows="3"
          required
        />

      </div>


      {/* CATEGORY */}

      <div className="mb-3">

        <label className="form-label">
          Category
        </label>

        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          placeholder="Example: Cyber Security"
          required
        />

      </div>


      {/* TECHNOLOGIES */}

      <div className="mb-3">

        <label className="form-label">
          Technologies
        </label>

        <input
          type="text"
          className="form-control"
          value={technologies}
          onChange={(event) =>
            setTechnologies(event.target.value)
          }
          placeholder="React, JavaScript, Bootstrap"
          required
        />

      </div>


      {/* GITHUB */}

      <div className="mb-4">

        <label className="form-label">
          GitHub Link
        </label>

        <input
          type="url"
          className="form-control"
          value={github}
          onChange={(event) =>
            setGithub(event.target.value)
          }
          placeholder="https://github.com/username/project"
        />

      </div>


      {/* TASKS */}

      <div className="mb-4">

        <label className="form-label fw-bold">
          Project Tasks
        </label>


        <div className="d-flex gap-2 mb-3">

          <input
            type="text"
            className="form-control"
            value={taskText}
            onChange={(event) =>
              setTaskText(event.target.value)
            }
            placeholder="Example: Create homepage"
          />

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addTask}
          >
            Add
          </button>

        </div>


        {tasks.length > 0 && (

          <div className="task-list">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >

                <span>
                  {task.title}
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    removeTask(task.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>


      <button
        type="submit"
        className="btn btn-primary"
      >
        {isEditing
          ? "Update Project"
          : "Create Project"}
      </button>

    </form>

  );
}

export default ProjectForm;