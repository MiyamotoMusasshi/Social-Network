import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./pages/components/auth.tsx", [
    route("register", "./pages/main/registration.tsx"),
  ]),
] satisfies RouteConfig;
