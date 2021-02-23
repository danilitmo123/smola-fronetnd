import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {loginUser}  from "../../actions/auth-actions";

const LoginPage = ({ loginUser, history }) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const login = async (event) => {
        event.preventDefault();
        const { username, password } = state;

        await loginUser(username, password);
        // history.push("/");
        window.location.href = "/"
    };

    console.log("Login pae render " + new Date())

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={state.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    loginUser,
};

export default connect(null, mapDispatchToProps)(LoginPage);