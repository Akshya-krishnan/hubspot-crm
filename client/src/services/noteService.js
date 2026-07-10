import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getNotes = async (leadId) => {
  const response = await api.get(
    `/leads/${leadId}/notes`,
    getAuthConfig()
  );

  return response.data;
};

export const createNote = async (leadId, noteData) => {
  const response = await api.post(
    `/leads/${leadId}/notes`,
    noteData,
    getAuthConfig()
  );

  return response.data;
};

// We'll use these in the next sprint
export const updateNote = async (id, noteData) => {
  const response = await api.put(
    `/notes/${id}`,
    noteData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(
    `/notes/${id}`,
    getAuthConfig()
  );

  return response.data;
};