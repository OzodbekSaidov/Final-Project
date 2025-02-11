import BaseLayout from "../../components/Layout/BaseLayout";
import * as ROUTES from "../../constants/routes";
import About from "./containers/AboutPage";

export default () => [
  {
    path: ROUTES.ABOUT_PAGE,
    layout: BaseLayout,
    component: About,
  },
];
