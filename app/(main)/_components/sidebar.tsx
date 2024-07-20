import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto py-4">
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
