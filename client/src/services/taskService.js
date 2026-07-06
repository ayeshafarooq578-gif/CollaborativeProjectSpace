import API from "./api";

export const getTasks = async (projectId) => {
  const { data } = await API.get(`/tasks/${projectId}`);
  return data;
};

export const createTask = async (task) => {
  const { data } = await API.post("/tasks", task);
  return data;
};

export const updateTask = async (id, task) => {
  const { data } = await API.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await API.delete(`/tasks/${id}`);
  return data;
};