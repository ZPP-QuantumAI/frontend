import { API_URL } from "./constants";

export async function post(path, object) {
  const result = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  return await result.text();
}

export async function get(path) {
  const result = await fetch(`${API_URL}${path}`);

  return await result.json();
}

export async function deleteReq(path) {
  const result = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  return await result.text();
}
