import axios from "axios";

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
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        if (error.response.status === 401 &&  originalRequest.url === "authenticate/token/") {
            window.location.href = "/login/";
            return Promise.reject(error);


        if (error.message === "Network Error") {
            window.location.href = "/network-error/"
            return Promise.reject(error)
        }
        if (error.response) {
            if (500 <= error.response.status <= 599) {
                window.location.href = "/server-error/"
            }

            if (error.response.status === 401 && originalRequest.url === "authenticate/token/") {
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                window.location.href = "/login/";
                return Promise.reject(error);
            }

            if (error.response.status === 401 && originalRequest.url === "authenticate/user/check/") {
                localStorage.removeItem("access_token")
                // localStorage.removeItem("refresh_token")
                window.location.href = "/login/";
                return Promise.reject(error)
            }

            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh = localStorage.getItem("refresh_token");
                if (refresh) {
                    const tokenParts = JSON.parse(window.atob(refresh.split(".")[1]));
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        try {
                            const response = await axiosAPI.post("authenticate/token/refresh/", {
                                refresh,
                            });
                            localStorage.setItem("access_token", response.data.access);
                            axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
                            originalRequest.headers["Authorization"] = "Bearer " + response.data.access;
                            return axiosAPI(originalRequest);
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = "/login/";
                    }
                } else {
                    console.log('refresh');
                    console.log("Refresh token not available.");
                    window.location.href = "/login/";
                }
            }
        }
        else{
            console.log("Unexpected error!")
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export function setNewHeaders(response) {
    axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
    localStorage.setItem("access_token", response.data.access);
    console.log("setNewHeaders: " + response.data.refresh)
    localStorage.setItem("refresh_token", response.data.refresh);
}

export default axiosAPI;