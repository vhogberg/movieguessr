import "./Header.css";

import horizontalLogo from "../../assets/movieguessr-logo-horizontal.png";

export default function Header() {
  return (
    <header>
      <img src={horizontalLogo} alt="logo" id="logo" />
    </header>
  );
}
