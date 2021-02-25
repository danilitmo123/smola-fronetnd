import axios from "axios";
import * as pages from "../../constants/deafult-pages"

const baseURL = 'https://api-smola-20.herokuapp.com/';
const accessToken = localStorage.getItem("access_token");

const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        Authorization: accessToken ? "Bearer " + accessToken : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.message === "Network Error") {
            console.log("Network error")
            window.location.href = pages.NETWORK_ERROR_PAGE
            return Promise.reject(error)
        }
        if (error.response) {
            if (error.response.status >= 500 && error.response.status <= 599) {
                console.log("Error status 5XX")
                window.location.href = pages.SERVER_ERROR_PAGE
                return Promise.reject(error)
            }

            if (error.response.status === 401 && originalRequest.url === "authenticate/token/") {
                console.log("Auth failed")
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                window.location.href = pages.LOGIN_PAGE
                return Promise.reject(error);
            }

            if (error.response.status === 401 && originalRequest.url === "authenticate/user/check/") {
                console.log("Auth check failed")
                localStorage.removeItem("access_token")
                window.location.href = pages.LOGIN_PAGE
                return Promise.reject(error)
            }

            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh = localStorage.getItem("refresh_token");
                console.log("Refreshing token")
                if (refresh) {
                    const tokenParts = JSON.parse(window.atob(refresh.split(".")[1]));
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        try {
                            const response = await axiosAPI.post("authenticate/token/refresh/", {
                                refresh,
                            });
                            console.log({response})
                            localStorage.setItem("access_token", response.data.access);
                            axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
                            originalRequest.headers["Authorization"] = "Bearer " + response.data.access;
                            return axiosAPI(originalRequest);
                        } catch (error) {
                            window.location.href = pages.UNEXPECTED_ERROR_PAGE
                            return Promise.reject(error)
                        }
                    } else {
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = pages.LOGIN_PAGE;
                        return Promise.reject(error)

                    }
                } else {
                    console.log("Refresh token not available.");
                    window.location.href = pages.LOGIN_PAGE
                    return Promise.reject(error)

                }
            }
        } else {
            console.log("Unexpected error!")
            window.location.href = pages.UNEXPECTED_ERROR_PAGE
            return Promise.reject(error)
        }

        return Promise.reject(error);
    }
);

export function setNewHeaders(response) {
    axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
}

export default axiosAPI;