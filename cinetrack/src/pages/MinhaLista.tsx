import { useFavorites } from '../hooks/useFavorites'
import { MovieCard } from '../components/MovieCard'
import './Home.css'

export function MinhaLista() {
  const { favorites, loading, removeFavorite } = useFavorites()

  async function handleRemove(favoriteId: number) {
    try {
      await removeFavorite(favoriteId)
    } catch {
      alert('Erro ao remover filme.')
    }
  }

  return (
    <div className="page-container">
      <h1>Minha Lista</h1>

      {loading && <p>Carregando...</p>}

      {!loading && favorites.length === 0 && (
        <p>Você ainda não salvou nenhum filme.</p>
      )}

      <div className="movie-grid">
        {favorites.map((favorite) => (
          <MovieCard
            key={favorite.id}
            title={favorite.movie_title}
            posterPath={favorite.poster_path}
            status={favorite.status}
            action={
              <button onClick={() => handleRemove(favorite.id)}>
                Remover
              </button>
            }
          />
        ))}
      </div>
    </div>
  )
}