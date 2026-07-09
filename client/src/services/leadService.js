import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const getLeads = async (
  page = 1,
  limit = 10,
  search = "",
  leadSource = "",
  lifecycleStage = ""
) => {
  const response = await api.get(
    `/leads?page=${page}&limit=${limit}&search=${search}&leadSource=${leadSource}&lifecycleStage=${lifecycleStage}`,
    getAuthConfig()
  );

  return response.data;
};

export const createLead = async (leadData) => {
  const response = await api.post(
    "/leads",
    leadData,
    getAuthConfig()
  );

  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await api.put(
    `/leads/${id}`,
    leadData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(
    `/leads/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const getLeadById = async (id) => {
  const response = await api.get(
    `/leads/${id}`,
    getAuthConfig()
  );

  return response.data;
};