import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import MyCard from "../components/MyCard";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query.trim()) {
      axios
        .get("/search/movie", { params: { query } })
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error(err));
    } else {
      axios
        .get("/movie/popular", { params: { page } })
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error(err));
    }
  }, [query, page]);

  return (
    <div className="container py-4">
      {/* Search input under navbar */}
      <div className="search-container mb-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setPage(1)}
        />
      </div>
      
      <h2 className="mb-4">Popular Movies</h2>

      <div className="movies-container">
        {movies.map((movie) => (
          <MyCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!query && (
        <div className="d-flex justify-content-center mt-4 gap-3">
          <button
            className="btn btn-secondary"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="align-self-center mx-2">Page {page}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
