import { routes } from "../router/constants";

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  active?: boolean;
  icon?: string;
}
const navigationConfig: NavigationItem[] = [
  {
    id: "files",
    title: "Files",
    url: routes.FILES,
    icon: "ph:files-light",
  },
  {
    id: "groups",
    title: "Groups",
    url: routes.GROUPS,
    icon: "clarity:group-line",
  },
];

export default navigationConfig;
