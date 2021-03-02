import {Route, Switch} from "react-router-dom";
import * as pages from "../../constants/deafult-pages"
import LoginPage from "../../screens/login-screen";
import ServerErrorPage from "../../components/server-error-page";
import NetworkErrorPage from "../../components/network-error-page";
import UnexpectedErrorPage from "../../components/unexpected-error-page";

const DefaultFrame = () =>{
    return (
        <div>
            <Switch>
                <Route path={pages.LOGIN_PAGE} component={LoginPage}/>
                <Route path={pages.SERVER_ERROR_PAGE} component={ServerErrorPage}/>
                <Route path={pages.NETWORK_ERROR_PAGE} component={NetworkErrorPage}/>
                <Route path={pages.UNEXPECTED_ERROR_PAGE} component={UnexpectedErrorPage}/>
            </Switch>
        </div>
    )
}

export default DefaultFrame;