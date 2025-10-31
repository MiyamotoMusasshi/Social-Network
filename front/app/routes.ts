import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./pages/main/main.tsx"),
  layout("./pages/components/authLayout.tsx", [
    route("register", "./pages/main/registration.tsx"),
    route("login", "./pages/main/authorization.tsx"),
  ]),
] satisfies RouteConfig;
