import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content-wrapper">
        <Header />

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}