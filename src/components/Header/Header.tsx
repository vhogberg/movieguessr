import horizontalLogo from "../../assets/movieguessr-logo-horizontal.png";
import "./Header.css";

interface HeaderProps {
  gameStarted: boolean;
}

export default function Header({ gameStarted }: HeaderProps) {
  return (
    <header className={gameStarted ? "header-started" : "header-menu"}>
      <img
        src={horizontalLogo}
        alt="logo"
        id="logo"
        className={gameStarted ? "logo-small" : ""}
        onClick={() => {
          window.location.reload();
        }}
      />
    </header>
  );
}
