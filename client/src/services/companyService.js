import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCompanies = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await api.get(
    `/companies?page=${page}&limit=${limit}&search=${search}`,
    getAuthConfig()
  );

  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await api.get(
    `/companies/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const createCompany = async (companyData) => {
  const response = await api.post(
    "/companies",
    companyData,
    getAuthConfig()
  );

  return response.data;
};

export const updateCompany = async (id, companyData) => {
  const response = await api.put(
    `/companies/${id}`,
    companyData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await api.delete(
    `/companies/${id}`,
    getAuthConfig()
  );

  return response.data;
};