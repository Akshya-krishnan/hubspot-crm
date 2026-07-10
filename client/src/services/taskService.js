import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async (leadId) => {
  const response = await api.get(
    `/leads/${leadId}/tasks`,
    getAuthConfig()
  );

  return response.data;
};

export const createTask = async (leadId, taskData) => {
  const response = await api.post(
    `/leads/${leadId}/tasks`,
    taskData,
    getAuthConfig()
  );

  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(
    `/tasks/${id}`,
    taskData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(
    `/tasks/${id}`,
    getAuthConfig()
  );

  return response.data;
};