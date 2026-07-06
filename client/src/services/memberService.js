import API from "./api";

export const getMembers = async (projectId) => {
  const { data } = await API.get(`/members/${projectId}`);
  return data;
};

export const addMember = async (projectId, email) => {
  const { data } = await API.post(`/members/${projectId}`, {
    email,
  });

  return data;
};

export const removeMember = async (
  projectId,
  userId
) => {
  const { data } = await API.delete(
    `/members/${projectId}/${userId}`
  );

  return data;
};