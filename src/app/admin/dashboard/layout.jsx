import "@/app/globals.css";
import NavbarAdmin from "@/components/(admin)/NavbarAdmin";
import SidebarAdmin from "@/components/(admin)/SidebarAdmin";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAdmin className="w-1/4 h-screen bg-gray-800" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarAdmin className="w-full" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
