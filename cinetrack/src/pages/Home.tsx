import { useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/tmdb'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../hooks/useAuth'
import { MovieCard } from '../components/MovieCard'
import type { Movie } from '../types/movie'
import './Home.css'

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { addFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    void loadPopularMovies()
  }, [])

  async function loadPopularMovies() {
    setLoading(true)
    setError(null)
    try {
      const results = await getPopularMovies()
      setMovies(results)
    } catch {
      setError('Não foi possível carregar os filmes populares.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    if (!query.trim()) {
      loadPopularMovies()
      return
    }

    setLoading(true)
    setError(null)
    try {
      const results = await searchMovies(query)
      setMovies(results)
    } catch {
      setError('Não foi possível buscar os filmes.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(movie: Movie) {
    try {
      await addFavorite(movie, 'quero assistir')
    } catch {
      alert('Erro ao salvar filme. Você precisa estar logado.')
    }
  }

  return (
    <div className="page-container">
      <h1>Filmes Populares</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>Nenhum filme encontrado.</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            action={
              user && (
                <button onClick={() => handleSave(movie)} disabled={isFavorite(movie.id)}>
                  {isFavorite(movie.id) ? 'Salvo ✓' : 'Salvar'}
                </button>
              )
            }
          />
        ))}
      </div>
    </div>
  )
}