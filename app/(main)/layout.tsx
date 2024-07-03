import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="fixed z-50 hidden h-full w-60 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="md:pl-60">{children}</main>
    </>
  );
};

export default MainLayout;
