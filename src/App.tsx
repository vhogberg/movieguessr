import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import menuImage from "./assets/menu-image-posters.png";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div className="wrapper">
      <Header gameStarted={gameStarted} />
      {!gameStarted ? (
        <div className="menu-screen">
          <h2>Can you name that movie? </h2>
          <img src={menuImage} alt="movie posters" className="menu-image" />
          <p>
            Test your movie knowledge! Each round starts with a blurred poster
            and some clues. Click <strong>Reveal Clue</strong> to sharpen the
            poster and get more hints!
          </p>
          <p>
            Think you know it? Type your guess in the textfield. Click{" "}
            <strong>Give Up</strong> if you can't figure it out. A new random
            movie awaits each time. Good luck! 🎬
          </p>

          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      ) : (
        <Main />
      )}

      <Footer />
    </div>
  );
}

export default App;
