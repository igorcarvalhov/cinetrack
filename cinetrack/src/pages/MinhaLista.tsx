import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { MovieCard } from '../components/MovieCard'
import type { FavoriteStatus } from '../types/movie'
import './Home.css'
import './MinhaLista.css'

type FilterOption = 'todos' | FavoriteStatus

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'favorito', label: '⭐ Favoritos' },
  { value: 'quero assistir', label: '📌 Quero Assistir' },
  { value: 'assistido', label: '✅ Assistidos' },
]

const STATUS_ICONS: { status: FavoriteStatus; icon: string; title: string }[] = [
  { status: 'favorito', icon: '⭐', title: 'Favorito' },
  { status: 'quero assistir', icon: '📌', title: 'Quero Assistir' },
  { status: 'assistido', icon: '✅', title: 'Assistido' },
]

export function MinhaLista() {
  const { favorites, loading, updateStatus, removeFavorite } = useFavorites()
  const [filter, setFilter] = useState<FilterOption>('todos')

  const filteredFavorites =
    filter === 'todos' ? favorites : favorites.filter((f) => f.status === filter)

  async function handleRemove(favoriteId: number) {
    try {
      await removeFavorite(favoriteId)
    } catch {
      alert('Erro ao remover filme.')
    }
  }

  async function handleChangeStatus(favoriteId: number, status: FavoriteStatus) {
    try {
      await updateStatus(favoriteId, status)
    } catch {
      alert('Erro ao atualizar status.')
    }
  }

  return (
    <div className="page-container">
      <h1>Minha Lista</h1>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? 'active' : ''}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <p>Carregando...</p>}

      {!loading && filteredFavorites.length === 0 && (
        <p>Nenhum filme nessa categoria ainda.</p>
      )}

      <div className="movie-grid">
        {filteredFavorites.map((favorite) => (
          <MovieCard
            key={favorite.id}
            title={favorite.movie_title}
            posterPath={favorite.poster_path}
            action={
              <div className="status-icon-row">
                {STATUS_ICONS.map((s) => (
                  <button
                    key={s.status}
                    title={s.title}
                    className={`status-icon-btn ${favorite.status === s.status ? 'active' : ''}`}
                    onClick={() => handleChangeStatus(favorite.id, s.status)}
                  >
                    {s.icon}
                  </button>
                ))}
                <button className="remove-btn" onClick={() => handleRemove(favorite.id)}>
                  Remover
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}