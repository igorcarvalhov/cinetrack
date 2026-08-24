export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface MovieSearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type FavoriteStatus = 'favorito' | 'quero assistir' | 'assistido'

export interface Favorite {
  id: number
  user_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  status: FavoriteStatus
  created_at: string
}