const ProjectSelector = ({
  projects,
  currentProject,
  setCurrentProject,
  onNewProject,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-3xl font-bold">
          Project Board
        </h2>

        <p className="text-gray-500">
          Select a project to manage
        </p>

      </div>

      <div className="flex gap-3">

        <select
          value={currentProject}
          onChange={(e) => setCurrentProject(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.title}
            </option>
          ))}
        </select>

        <button
          onClick={onNewProject}
          className="bg-indigo-600 text-white px-5 rounded-lg"
        >
          + New Project
        </button>

      </div>

    </div>
  );
};

export default ProjectSelector;