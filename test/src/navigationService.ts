import type { NavigationService as Props } from "@iamyth/web-ui/admin/AdminApp/type";

import { InputPage } from "./core/Input";

export const NavigationService: Props[] = [
  {
    title: "Input",
    modules: [
      {
        name: "Default",
        path: "/input/default",
        component: InputPage,
      },
    ],
  },
];
