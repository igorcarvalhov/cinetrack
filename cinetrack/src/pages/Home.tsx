import { useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/tmdb'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../hooks/useAuth'
import type { Movie } from '../types/movie'

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { addFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    loadPopularMovies()
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
    <div>
      <h1>Filmes Populares</h1>

      <form onSubmit={handleSearch}>
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: '150px' }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ width: '100%', height: '225px', background: '#ccc' }}>
                Sem imagem
              </div>
            )}
            <p>{movie.title}</p>

            {user && (
              <button onClick={() => handleSave(movie)} disabled={isFavorite(movie.id)}>
                {isFavorite(movie.id) ? 'Salvo ✓' : 'Salvar'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}