import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import AccountPage from "./AccountPage/AccountPage";

const tester = () => [
  ...HomePage(),
  ...LoginPage(),
  ...AccountPage(),
];

const Routes = () => [...tester()];

export default Routes;
