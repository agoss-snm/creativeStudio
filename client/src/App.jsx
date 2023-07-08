import "./App.css";
import './Normalize.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ElementsPage from "./pages/ElementsPage/ElementsPage";
import AddElement from "./pages/AddElement/AddElement";
import CreateIa from "./pages/CreateIA/CreateIa";

function App() {

  
  return (
    <div className="App">
  <Navbar />
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
            <ProfilePage/>
          }
        />

        <Route 
        path= '/elements'
        element={<ElementsPage/>}
        />
  

      <Route 
        path= '/addElement'
        element={
        <AddElement/>
      }
        />

      <Route 
        path= '/createwithia'
        element={
        <CreateIa/>
      }
        />  
    </Routes>

    </div>
  );
}

export default App;
