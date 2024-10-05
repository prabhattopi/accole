export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; // Default to localhost if not set

// Helper function for setting up headers with JWT token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// User Authentication APIs
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

// Product APIs
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/items`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const addProduct = async (name: string, img: string, quantity: number) => {
  const response = await fetch(`${API_URL}/api/items`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, img, quantity }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const updateProduct = async (id: string, updatedProduct:any) => {
  const response = await fetch(`${API_URL}/api/items/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updatedProduct),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/api/items/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
