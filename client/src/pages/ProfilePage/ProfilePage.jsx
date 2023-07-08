import "./ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import "../../App.css";

function ProfilePage() {

  const { user } = useContext(AuthContext);

  const upperCaseName = user.name.toUpperCase();

  return (
    <div id='profileGrid'>
    </div>
  );
}

export default ProfilePage;
