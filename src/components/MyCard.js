import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/actions";
import { Link } from "react-router-dom";
import "./MyCard.css";

function MyCard({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  // Check if this movie is in favorites
  const isFav = favorites.some((m) => m.id === movie.id);
  
  // Format the release date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle favorite toggle with animation effect
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add a small animation effect
    const heartIcon = e.currentTarget;
    heartIcon.classList.add("heart-pulse");
    setTimeout(() => {
      heartIcon.classList.remove("heart-pulse");
    }, 300);
    
    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="movie-card">
      <div className="card shadow-sm movie-card-inner">
        <div className="poster-container">
          <Link to={`/movie/${movie.id}`} className="poster-link">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : "https://via.placeholder.com/342x513?text=No+Poster"
              }
              className="movie-poster"
              alt={movie.title}
              loading="lazy"
            />
            <div className="poster-overlay">
              <span className="view-details">Details</span>
            </div>
          </Link>
          
          
          <button 
            className={`favorite-btn ${isFav ? 'is-favorite' : ''}`}
            onClick={handleFavoriteToggle}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <i className="fa-heart"></i>
          </button>
          
        
          {movie.vote_average > 0 && (
            <div className={`rating-badge ${movie.vote_average >= 7 ? 'high-rating' : 
                             movie.vote_average >= 5 ? 'medium-rating' : 'low-rating'}`}>
              {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>
        
        {/* Simplified card body with essential info only */}
        <div className="card-body">
          <h5 className="movie-title" title={movie.title}>
            {movie.title}
          </h5>
          
          {/* Release date - simplified format */}
          {movie.release_date && (
            <p className="release-date">
              {formatDate(movie.release_date)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCard;
