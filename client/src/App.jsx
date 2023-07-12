import "./App.css";
import './Normalize.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbarr from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ElementsPage from "./pages/ElementsPage/ElementsPage";
import AddElement from "./pages/AddElement/AddElement";
import CreateIa from "./pages/CreateIA/CreateIa";
import Footer from "./components/Footer/Footer";
import ElementDetailPage from './pages/Element/ElementDetailPage'

function App({ theme, setTheme, children }) {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App">
      <Navbarr />
      <div className={`${theme}`} id='toggle'>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {children}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage />
          }
        />
        <Route path="/elements/:id" 
        element={<ElementDetailPage />} />

        <Route
          path='/elements'
          element={<ElementsPage />}
        />


        <Route
          path='/addElement'
          element={
            <AddElement />
          }
        />

        <Route

          path='/createwithia'
          element={
            <IsPrivate>
              <CreateIa />
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
