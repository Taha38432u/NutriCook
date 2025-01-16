import axios from "axios";

export const API_URL = "http://127.0.0.1:3000/";

// Sign up function
export async function signUp({ email, fullName, password, passwordConfirm }) {
  try {
    const response = await axios.post(
      `${API_URL}api/v1/users/signup`,
      {
        name: fullName,
        email,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true, // Ensure cookies are sent with the request
      },
    );

    // Assuming the response contains a JWT in the 'token' field
    const { token } = response.data;

    // Save the token to localStorage
    if (token) {
      localStorage.setItem("jwt", token);
    }

    console.log(response.data); // Log the response data for debugging
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Failed to sign up");
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
}

// Login function
export async function login({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}api/v1/users/login`, {
      email,
      password,
    });

    // Assuming the response contains a JWT in the 'token' field
    const { token } = response.data;

    // Save the token to localStorage
    if (token) {
      localStorage.setItem("jwt", token);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
}

export async function updateUser({ name = "none", email = "none" }) {
  try {
    console.log(name);
    const token = localStorage.getItem("jwt");

    // If there is no token in localStorage, handle the case
    if (!token) {
      throw new Error("No token found. Please log in first.");
    }

    let response;

    if (email === "none" && name !== "none") {
      response = await axios.patch(
        `${API_URL}api/v1/users/updateMe`,
        { name }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token to headers
          },
        },
      );
    } else {
      response = await axios.patch(
        `${API_URL}api/v1/users/updateMe`,
        { email }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token to headers
          },
        },
      );
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}

// Get user function
export async function getUser() {
  const token = localStorage.getItem("jwt");

  try {
    const token = localStorage.getItem("jwt");

    // If there is no token in localStorage, handle the case
    if (!token) {
      throw new Error("No token found. Please log in first.");
    }

    // Make the GET request with the token in the Authorization header
    const response = await axios.get(`${API_URL}api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token to headers
      },
    });

    // console.log(response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}

export async function updatePassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const oldToken = localStorage.getItem("jwt");

    // If there is no token in localStorage, handle the case
    if (!oldToken) {
      throw new Error("No token found. Please log in first.");
    }

    const response = await axios.patch(
      `${API_URL}api/v1/users/updateMyPassword`,
      { passwordCurrent, password, passwordConfirm }, // Request body
      {
        headers: {
          Authorization: `Bearer ${oldToken}`, // Attach JWT token to headers
        },
      },
    );
    // Save the token to localStorage

    const { token } = response.data;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
}