import axios from "axios";

const AUTH_API = "http://localhost:5000/api/auth";
const EVENTS_API = "http://localhost:5000/api/events";

// Auth endpoints
export const registerUser = (data) =>
  axios.post(`${AUTH_API}/register`, data);

export const loginUser = (data) =>
  axios.post(`${AUTH_API}/login`, data);

export const adminLogin = (data) =>
  axios.post(`${AUTH_API}/admin-login`, data);

export const verifyAdmin = () => {
  const adminToken = localStorage.getItem("adminToken");
  return axios.get(`${AUTH_API}/verify-admin`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

// Event endpoints
export const getAllEvents = () =>
  axios.get(`${EVENTS_API}/`);

export const getEventsByCity = (city) =>
  axios.get(`${EVENTS_API}/city/${city}`);

export const searchEvents = (query) =>
  axios.get(`${EVENTS_API}/search?query=${query}`);

export const getEventById = (id) =>
  axios.get(`${EVENTS_API}/${id}`);

export const createEvent = (data) => {
  const adminToken = localStorage.getItem("adminToken");
  return axios.post(`${EVENTS_API}/`, data, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const updateEvent = (id, data) => {
  const adminToken = localStorage.getItem("adminToken");
  return axios.put(`${EVENTS_API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const deleteEvent = (id) => {
  const adminToken = localStorage.getItem("adminToken");
  return axios.delete(`${EVENTS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};