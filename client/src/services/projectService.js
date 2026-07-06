import API from "./api";

export const getProjects = async () => {
  const { data } = await API.get("/projects");
  return data;
};

export const createProject = async (project) => {
  const { data } = await API.post("/projects", project);
  return data;
};