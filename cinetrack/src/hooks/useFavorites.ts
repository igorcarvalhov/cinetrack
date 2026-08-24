import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from './useAuth'
import type { Favorite, FavoriteStatus, Movie } from '../types/movie'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([])
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)

    if (!error && data) {
      setFavorites(data)
    }
    setLoading(false)
  }, [user])

useEffect(() => {
  // eslint-disable-next-line
  loadFavorites()
}, [loadFavorites])

  async function addFavorite(movie: Movie, status: FavoriteStatus) {
    if (!user) throw new Error('Usuário não autenticado')

    const { error } = await supabase.from('favorites').insert({
      user_id: user.id,
      movie_id: movie.id,
      movie_title: movie.title,
      poster_path: movie.poster_path,
      status,
    })

    if (error) throw error
    await loadFavorites()
  }

  async function removeFavorite(favoriteId: number) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId)

    if (error) throw error
    await loadFavorites()
  }

  function isFavorite(movieId: number) {
    return favorites.some((f) => f.movie_id === movieId)
  }

  return { favorites, loading, addFavorite, removeFavorite, isFavorite }
}