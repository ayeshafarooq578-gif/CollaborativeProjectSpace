import API from "./api";

export const getMilestones = async (projectId) => {
  const { data } = await API.get(`/milestones/${projectId}`);
  return data;
};

export const createMilestone = async (milestone) => {
  const { data } = await API.post("/milestones", milestone);
  return data;
};

export const updateMilestone = async (id, milestone) => {
  const { data } = await API.put(`/milestones/${id}`, milestone);
  return data;
};

export const deleteMilestone = async (id) => {
  const { data } = await API.delete(`/milestones/${id}`);
  return data;
};