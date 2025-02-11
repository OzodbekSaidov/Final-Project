import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import AccountPage from "./AccountPage/AccountPage";
import SettingPage from "./SettingsPage/Settings";
import StationPage from "./Station/Station"
import RegisterPage from "./Register/Register";
import AboutPage from "./AboutPage/AboutPage";


const tester = () => [
  ...HomePage(),
  ...LoginPage(),
  ...AccountPage(),
  ...SettingPage(),
  ...StationPage(),
  ...RegisterPage(),
  ...AboutPage()
];

const Routes = () => [...tester()];

export default Routes;
