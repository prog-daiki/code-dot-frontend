import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full">
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
