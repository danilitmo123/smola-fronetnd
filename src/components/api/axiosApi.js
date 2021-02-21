import axios from "axios";

const baseURL = 'https://api-smola-20.herokuapp.com/';
const accessToken = localStorage.getItem("access_token");

const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
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
        // localStorage.removeItem("refresh_token")
        if (error.response.status === 401 &&  originalRequest.url === "authenticate/token/") {
            window.location.href = "/login/";
            return Promise.reject(error);
        }

        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh = localStorage.getItem("refresh_token");
            console.log('out')
            console.log('ref= ' + typeof refresh)
            if (refresh) {
                console.log("qwgrwwr")
                console.log(refresh)
                const tokenParts = JSON.parse(window.atob(refresh.split(".")[1]));
                console.log('in')

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    try {
                        const response = await axiosAPI.post("authenticate/token/refresh/", {
                            refresh,
                        });
                        console.log("response in refresh")
                        console.log({response})
                        localStorage.setItem("access_token", response.data.access);
                        axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;

                        // setNewHeaders(response);
                        originalRequest.headers["Authorization"] =
                            "Bearer " + response.data.access;
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