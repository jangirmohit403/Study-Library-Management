import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/layout.css";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="admin-main">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
