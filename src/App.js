import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NewGamePage from "./pages/NewGamePage";
import GamePage from "./pages/GamePage";
import UserProvider from "./providers/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";

function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/newgame" element={<NewGamePage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
