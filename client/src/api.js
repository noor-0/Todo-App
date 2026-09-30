const API_URL = import.meta.env.VITE_API_URL || "/api";

// small helper around fetch that adds the JWT token and handles errors
export async function request(path, method = "GET", body) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    // token missing or expired: log out and go back to the login page
    if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong, please try again");
    }

    return data;
}
