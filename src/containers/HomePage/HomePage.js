import BaseLayout from "../../components/Layout/BaseLayout"
import HomeContainer from "./containers/HomeContainer"
import * as ROUTES from "../../constants/routes"

export default () => [
    {
        path: ROUTES.HOME_PAGE,
        layout: BaseLayout,
        component: HomeContainer
    }
]