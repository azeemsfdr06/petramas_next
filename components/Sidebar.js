import React from "react";
import Link from "next/link";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent
} from "react-pro-sidebar";
const Sidebar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
  return (
    <ProSidebar
    
      className="shadow-md shadow-black mt-2"
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          <img className="rounded-full" src="./logo.png" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-">
        <Menu iconShape="circle">
          <MenuItem
          // icon={<FaTachometerAlt />}
          >
            Dashboard
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            title="Management"
          // icon={<FaRegLaughWink />}
          >
            <Link href={'/routes'}>
              <MenuItem>Routes</MenuItem>
            </Link>
          </SubMenu>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Sidebar;
