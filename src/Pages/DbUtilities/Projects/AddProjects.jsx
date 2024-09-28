import React, { useState } from "react";

// Admin Projects Card
const AdminProjectsCard = ({ onProjectCreate }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName,
      description,
      department,
      startDate,
      endDate,
      location, // Pincode-based location
    };

    // Pass project to parent component or store it in a state/database
    onProjectCreate(newProject);

    // Reset form
    setProjectName("");
    setDescription("");
    setDepartment("");
    setStartDate("");
    setEndDate("");
    setLocation("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location (Pincode):</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg p-2"
            maxLength="6"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Create Project
        </button>
      </form>
    </div>
  );
};

// Project List Component (to show users projects based on location)
const ProjectsByPincode = ({ projects }) => {
  const [pincode, setPincode] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleSearch = () => {
    const results = projects.filter((project) => project.location === pincode);
    setFilteredProjects(results);
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Search Projects by Pincode</h2>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full border rounded-lg p-2"
          maxLength="6"
          placeholder="Enter Pincode"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Search
        </button>
      </div>

      {filteredProjects.length > 0 ? (
        <ul className="list-disc pl-4">
          {filteredProjects.map((project, index) => (
            <li key={index} className="mb-2">
              <strong>{project.projectName}</strong> - {project.description} <br />
              Department: {project.department} <br />
              Start: {project.startDate} | End: {project.endDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found for this pincode.</p>
      )}
    </div>
  );
};

// Main Component to combine Admin and User sections
const AdminAndUserProjects = () => {
  const [projects, setProjects] = useState([]);

  // Handle new project creation
  const handleProjectCreate = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div className="p-8">
      {/* Admin Card to Create Project */}
      <AdminProjectsCard onProjectCreate={handleProjectCreate} />

      {/* User Search Projects by Pincode */}
      <ProjectsByPincode projects={projects} />
    </div>
  );
};

export default AdminAndUserProjects;