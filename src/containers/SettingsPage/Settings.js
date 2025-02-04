import BaseLayout from "../../components/Layout/BaseLayout";
import SettingPage from "./containers/SettingsPage";
import * as ROUTES from "../../constants/routes"

export default () => [
    {
        path: ROUTES.SETTINGS_PAGE,
        layout: BaseLayout,
        component: SettingPage
    }
]