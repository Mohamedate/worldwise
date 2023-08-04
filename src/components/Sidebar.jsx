import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import SidebarFooter from "./SidebarFooter";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
function Sidebar() {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthWindow(window.innerWidth);
    });
  }, [widthWindow]);
  return (
    <div className={styles.sidebar}>
      {widthWindow > 600 && <Logo />}

      <AppNav />
      <Outlet />
      <SidebarFooter />
    </div>
  );
}
export default Sidebar;
