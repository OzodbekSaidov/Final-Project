import BaseLayout from "../../components/Layout/BaseLayout";
import * as ROUTES from "../../constants/routes";
import AccountContainer from "./containers/AccountContainer";

export default () => [
  {
    path: ROUTES.ACCOUNT_PAGE,
    layout: BaseLayout,
    component: AccountContainer,
  },
];
