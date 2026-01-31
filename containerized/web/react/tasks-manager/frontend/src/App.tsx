import { Navigate, Route, Routes } from "react-router-dom";
import { Box, Container, useTheme } from "@mui/material";

import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import { useUser } from "./hooks/useUser";
import TaskDetails from "./components/tasks/TaskDetails";
import TaskForm from "./components/tasks/TaskForm";
import Loading from "./components/Loading";

function App() {
  const theme = useTheme();
  const { currentUser, loading } = useUser();

  // Show loading while checking authentication
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <Box
              sx={{
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <LoginPage />
              <Footer></Footer>
            </Box>
          )
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/*"
        element={
          currentUser ? (
            <Box
              sx={{
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Header></Header>
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/tasks/add" element={<TaskForm />} />
                  <Route path="/tasks/:id" element={<TaskDetails />} />
                  <Route path="/tasks/:id/edit" element={<TaskForm />} />
                </Routes>
              </Container>
              <Footer></Footer>
            </Box>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
