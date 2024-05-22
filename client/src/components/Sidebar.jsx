import React, { useEffect, useState } from "react";
import avatarImg from "../assets/img/avatar.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexBetween } from "components";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutline,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Usuários",
    icon: null,
  },
  {
    text: "Produtos",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Clientes",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transações",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geografia",
    icon: <PublicOutlined />,
  },
  {
    text: "Vendas",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Relatório diário",
    icon: <TodayOutlined />,
  },
  {
    text: "Relatório mensal",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Gerenciamento",
    icon: <PieChartOutlined />,
  },
  {
    text: "Estatísticas",
    icon: null,
  },
  {
    text: "Administrativo",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Desempenho",
    icon: <TrendingUpOutlined />,
  },
];

export default function Sidebar({
  user,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  drawerWidth,
}) {
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {sidebarOpen && (
        <Drawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%"></Box>
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.primary[100]}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  ECOMVISION
                </Typography>
              </Box>
              {!isMobile && (
                <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>

          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[200]
                          : theme.palette.primary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.primary[100],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined
                        sx={{ ml: "auto" }}
                        fontSize="small"
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box position="absolute" bottom={"2rem"}>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={avatarImg}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "24px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
