import { useFavorites } from '../hooks/useFavorites'

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
    <div>
      <h1>Minha Lista</h1>

      {loading && <p>Carregando...</p>}

      {!loading && favorites.length === 0 && (
        <p>Você ainda não salvou nenhum filme.</p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {favorites.map((favorite) => (
          <div key={favorite.id} style={{ width: '150px' }}>
            {favorite.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${favorite.poster_path}`}
                alt={favorite.movie_title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ width: '100%', height: '225px', background: '#ccc' }}>
                Sem imagem
              </div>
            )}
            <p>{favorite.movie_title}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>{favorite.status}</p>

            <button onClick={() => handleRemove(favorite.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}