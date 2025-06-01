import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axiosInstance";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`/movie/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="movie-poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-detail-poster"
            />
          </div>
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <Link className="btn btn-primary" to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
