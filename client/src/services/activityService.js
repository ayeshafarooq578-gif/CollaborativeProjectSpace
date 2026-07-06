import API from "./api";

export const getActivities = async (projectId) => {
  const { data } = await API.get(`/activities/${projectId}`);
  return data;
};