import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Navbar, Sidebar } from "components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";

export default function Layout() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  // console.log("🚀 ~ Layout ~ data:", data);

  return (
    <Box display={isMobile ? "block" : "flex"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
