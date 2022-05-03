import { useEffect, useState } from 'react'
import './main.css'
import SearchIcon from './search.svg'
import MovieCard from './movieCard'


const API_URL = 'http://www.omdbapi.com?apikey=2d05d9c3'

const movie1 = {
  "Title": "Spider-Man",
  "Year": "2002",
  "imdbID": "tt0145487",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
}

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies(`Spider`)
  }, [])

  return (
    <div className="app">
      <h1>Movies</h1>
      <div className="search">
        <input
          placeholder='Search your movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }



    </div>
  )
}

export default App