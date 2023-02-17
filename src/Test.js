// COMPONENT THAT HANDLES RAWG.IO API SEARCH AND MAPS OVER EACH RETURNED GAME
import { useState } from "react";

function Test() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const API_KEY = "afd9ed101fc842cca76630e512009e7f";

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${input}`)
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }

  function handleGameClick(game) {
    setSelectedGame(game);
    fetch(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGameDetails(data));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={input} type="text" />
        <button type="submit">Search</button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {data.map((game) => (
         <button
         style={{
           background: `url(${game.background_image})`,
           backgroundSize: "cover",
           padding: "20px",
           height: "100px",
           width: "200px",
           borderRadius: "16px",
           position: "relative",
         }}
         key={game.id}
         onClick={() => handleGameClick(game)}
       >
         {game.name}
         <span
           style={{
             position: "absolute",
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             backgroundColor: "rgba(0, 0, 0, 0.5)",
             borderRadius: "16px",
             color: "white",
             fontWeight: "bold",
           }}
         >
           {game.name}
         </span>
       </button>
        ))}
      </div>
      {selectedGame && gameDetails && (
        <div>
          <h2>{selectedGame.name}</h2>
          <p>{gameDetails.description_raw}</p>
          <p><strong>Released:</strong> {gameDetails.released}</p>
          <p><strong>Metacritic score:</strong> {gameDetails.metacritic || 'N/A'}</p>
          <p><strong>Genres:</strong> {gameDetails.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Platforms:</strong> {gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
        </div>
      )}
    </>
  );
}

export default Test;
