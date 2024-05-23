import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import {
  Dashboard,
  Layout,
  Products,
  Admin,
  Breakdown,
  Daily,
  Geography,
  Monthly,
  Overview,
  Performance,
  Transactions,
  Customers,
} from "views";

export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/produtos" element={<Products />} />

              <Route path="/clientes" element={<Customers />} />
              <Route path="/transacoes" element={<Transactions />} />
              <Route path="/geografia" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/diario" element={<Daily />} />
              <Route path="/mensal" element={<Monthly />} />
              <Route path="/detalhado" element={<Breakdown />} />
              <Route path="/administrativo" element={<Admin />} />
              <Route path="/desempenho" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
