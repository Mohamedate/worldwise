import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";
import userPhoto from "../images/myphoto.png";
function User() {
  const { isAuth, user, logout } = useAuth();
  const navigate = useNavigate();
  if (!isAuth) return null;

  function handleLogout() {
    logout();
    navigate("/googleEarth/");
  }

  return (
    <div className={styles.user}>
      <img src={userPhoto} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
