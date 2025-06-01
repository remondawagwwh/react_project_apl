import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyCard from "../components/MyCard";
import "./Home.css";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <div className="alert alert-info">
          You haven't added any favorites yet.
        </div>
      ) : (
        <div className="movies-container">
          {favorites.map((movie) => (
            <MyCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
