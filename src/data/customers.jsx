export async function getCustomers() {
  const res = await fetch(import.meta.env.VITE_API_URL);
  const result = await res.json();

  return result;
}

export async function getCustomer(id) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const result = await res.json();

  return result;
}

export async function addCustomer(data) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (error) {}
}

export async function updateCustomer(id, data) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (error) {}
}

export async function deleteCustomer(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await response.json();
  } catch (error) {}
}
