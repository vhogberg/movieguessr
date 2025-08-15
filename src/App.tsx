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
      <Header />
      {!gameStarted ? (
        <div className="menu-screen">
          <h2>Can you name that movie? </h2>
          <img src={menuImage} alt="movie posters" className="menu-image" />
          <p>
            Test your movie knowledge by guessing the titles of popular films.
            Each round begins with a blurred poster and a few mysterious clues.
          </p>
          <p>
            As you click <strong>Reveal Clue</strong>, the image sharpens and
            more hints appear, making the answer easier, but you will get less points!
          </p>
          <p>
            Think you’ve cracked it? Type your guess into the box and see if
            you’re right. Or, if you’re truly stumped, click{" "}
            <strong>Give Up</strong> to uncover the answer.
          </p>
          <p>A random movie awaits each time… so stay sharp, and good luck!</p>

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
