import BaseLayout from "../../components/Layout/BaseLayout";
import AddStations from "./containers/AddStation.jsx";
import * as ROUTES from "../../constants/routes.js"

export default  () => [{
    path: ROUTES.STATION_PAGE,
    layout: BaseLayout,
    component: AddStations
}]