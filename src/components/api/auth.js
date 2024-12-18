//import axios from 'axios';

//const API_URL = 'http://localhost:3000/api/auth';

// Login API
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data.token;
//   } catch (error) {
//     throw error.response?.data?.message || 'An error occurred during login.';
//   }
// };

// // Signup API
// export const signup = async (name,email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, { name , email, password });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'An error occurred during signup.';
//   }
// };


// const BASE_URL = "http://localhost:5000";
// export const signup = async (name, email, password) => {
//   const response = await fetch(`${BASE_URL}/api/auth/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || 'Failed to signup');
//   }

//   const data = await response.json();
//   return data.token; // Return the token
// };

// export const login = async (email, password) => {
//   const response = await fetch(`${BASE_URL}/api/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || 'Failed to login');
//   }

//   const data = await response.json();
//   return data.token; // Return the token
// };







// const BASE_URL = 'http://localhost:5000'; // Ensure your backend URL is correct

// export const signup = async (name, email, password) => {
//   const response = await fetch('http://localhost:5000/api/auth/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Signup failed.');
//   }

//   return await response.json(); // Return the response from the server
// };

// export const login = async (email, password) => {
//   const response = await fetch('http://localhost:5000/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Login failed.');
//   }

//   return await response.json(); // Return the response from the server
// };





import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
