import axiosAPI, { setNewHeaders } from "./axiosApi";



export async function obtainToken(username, password) {
    const response = await axiosAPI.post("authenticate/token/", {
        username,
        password,
    });
    setNewHeaders(response);
    return response;
}

export async function refreshToken(refresh) {
    const response = await axiosAPI.post("authenticate/token/refresh/", {
        refresh,
    });
    setNewHeaders(response);
    return response;
}

// eslint-disable-next-line
export async function logout(accessToken) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // TODO: invalidate token on backend
}

export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    return !!token;
};