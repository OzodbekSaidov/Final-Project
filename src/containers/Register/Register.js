import BaseLayout from "../../components/Layout/BaseLayout";
import Register from "./containers/RegisterForm";
import * as ROUTES from "../../constants/routes.js"

export default () => [{
    path: ROUTES.REGISTER_PAGE,
    layout: BaseLayout,
    component: Register,
}]