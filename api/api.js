// api/api.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setItem, getItem } from "./storage";

const API_URL = "http://192.168.0.113:3000/api"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Token management

const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh-token`, {
    refreshToken,
  });
  return response.data;
};

const getValidToken = async () => {
  let token = await getItem("token");
  let refreshToken = await getItem("refreshToken");

  if (!token || isTokenExpired(token)) {
    if (!refreshToken) throw new Error("No refresh token available");
    const tokens = await refreshAccessToken(refreshToken);
    token = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    await setItem("token", token);
    await setItem("refreshToken", refreshToken);
  }

  return token;
};

// User authentication

export const register = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  if (response.data.accessToken && response.data.refreshToken) {
    await setItem("token", response.data.accessToken);
    await setItem("refreshToken", response.data.refreshToken);
  }
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.accessToken && response.data.refreshToken) {
    await setItem("token", response.data.accessToken);
    await setItem("refreshToken", response.data.refreshToken);
  }
  return response.data;
};

// Application routes

export const updateProfile = async (personalData) => {
  const token = await getValidToken();
  const response = await api.put("/profile/profile-data", personalData, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

export const personalityTest = async (personalityTestAnswers) => {
  const token = await getValidToken();
  const response = await api.put(
    "/profile/personality-profile",
    { personalityData: personalityTestAnswers },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

export const updateAstrologicalProfile = async (astrologicalData) => {
  const token = await getValidToken();
  const response = await api.put(
    "/profile/astrological-profile",
    astrologicalData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

export const updateInterests = async (interests) => {
  const token = await getValidToken();
  const response = await api.put(
    "/profile/interests",
    { interests },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

export const getProfile = async () => {
  const token = await getValidToken();
  const response = await api.get("/profile", {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

export const getDashboard = async () => {
  const token = await getValidToken();

  try {
    const response = await api.get("/dashboard", {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log("Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching match:", error);
    throw error;
  }
};

export const getMatch = async () => {
  const token = await getValidToken();
  console.log("Token:", token); // Log the token to ensure it's being generated correctly

  try {
    const response = await api.get("/match", {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log("Response:", response.data); // Log the response to see what you're getting
    return response.data;
  } catch (error) {
    console.error("Error fetching match:", error); // Log the error for debugging
    throw error;
  }
};

export const acceptMatchAndSendAvailability = async (matchId, availability) => {
  const token = await getValidToken();

  const response = await api.post(
    "/date/accept",
    {
      matchId,
      availability,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return response.data;
};

export const respondToSuggestedDate = async (matchId, response, options = {}) => {
  const token = await getValidToken();

  const payload = {
    matchId,
    response,
    ...options, // Spread the options object to include suggestedDate and suggestedPlace if provided
  };

  const res = await api.post(
    "/date/respond",
    payload,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return res.data;
};
