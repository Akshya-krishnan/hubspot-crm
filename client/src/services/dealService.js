import api from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==============================
// Get All Deals
// ==============================
export const getDeals = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await api.get(
    `/deals?page=${page}&limit=${limit}&search=${search}`,
    getAuthConfig()
  );

  return response.data;
};

// ==============================
// Get Deal By ID
// ==============================
export const getDealById = async (id) => {
  const response = await api.get(
    `/deals/${id}`,
    getAuthConfig()
  );

  return response.data;
};

// ==============================
// Create Deal
// ==============================
export const createDeal = async (dealData) => {
  const response = await api.post(
    "/deals",
    dealData,
    getAuthConfig()
  );

  return response.data;
};

// ==============================
// Update Deal
// ==============================
export const updateDeal = async (id, dealData) => {
  const response = await api.put(
    `/deals/${id}`,
    dealData,
    getAuthConfig()
  );

  return response.data;
};

// ==============================
// Delete Deal
// ==============================
export const deleteDeal = async (id) => {
  const response = await api.delete(
    `/deals/${id}`,
    getAuthConfig()
  );

  return response.data;
};