import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import AccountPage from "./AccountPage/AccountPage";
import SettingPage from "./SettingsPage/Settings";
import StationPage from "./Station/Station"
import RegisterPage from "./Register/Register";


const tester = () => [
  ...HomePage(),
  ...LoginPage(),
  ...AccountPage(),
  ...SettingPage(),
  ...StationPage(),
  ...RegisterPage()
];

const Routes = () => [...tester()];

export default Routes;
