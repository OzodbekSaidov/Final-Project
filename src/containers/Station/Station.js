import BaseLayout from "../../components/Layout/BaseLayout";
import StationPage from "./containers/StationPage.jsx";
import * as ROUTES from "../../constants/routes.js"

export default  () => [{
    path: ROUTES.STATION_PAGE,
    layout: BaseLayout,
    component: StationPage
}]