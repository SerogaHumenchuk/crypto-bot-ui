import type { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";

export enum ERoutes {
  MAIN = "/",
}
export const routes: RouteObject[] = [
  {
    path: ERoutes.MAIN,
    children: [
      {
        index: true,
        async lazy() {
          const mod = await import("../App");
          return { Component: mod.default };
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
