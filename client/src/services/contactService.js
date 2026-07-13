import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getContacts = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await api.get(
    `/contacts?page=${page}&limit=${limit}&search=${search}`,
    getAuthConfig()
  );

  return response.data;
};

export const getContactById = async (id) => {
  const response = await api.get(
    `/contacts/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const createContact = async (contactData) => {
  const response = await api.post(
    "/contacts",
    contactData,
    getAuthConfig()
  );

  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await api.put(
    `/contacts/${id}`,
    contactData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(
    `/contacts/${id}`,
    getAuthConfig()
  );

  return response.data;
};

// ==============================
// Convert Lead to Contact
// ==============================

export const convertLeadToContact = async (leadId) => {
  const response = await api.post(
    `/contacts/convert/${leadId}`,
    {},
    getAuthConfig()
  );

  return response.data;
};