import {Route, Switch} from "react-router-dom";
import * as pages from "../../constants/deafult-pages"
import LoginPage from "../../screens/login-screen";

const DefaultFrame = () =>{

    console.log("Default frame render. " + new Date())
    return (
        <div>
            <Switch>
                <Route path={pages.LOGIN_PAGE} component={LoginPage}/>
                <Route path={pages.SERVER_ERROR_PAGE}/>
                <Route path={pages.NETWORK_ERROR_PAGE}/>
                <Route path={pages.UNEXPECTED_ERROR_PAGE}/>
            </Switch>
        </div>
    )
}

export default DefaultFrame;