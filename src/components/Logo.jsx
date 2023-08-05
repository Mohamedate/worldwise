import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../images/logo.png";
function Logo() {
  return (
    <Link to="/googleEarth/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
