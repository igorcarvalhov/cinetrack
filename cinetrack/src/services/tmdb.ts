import type { Movie, MovieSearchResponse } from '../types/movie'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  'Content-Type': 'application/json',
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
    { headers }
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar filmes')
  }

  const data: MovieSearchResponse = await response.json()
  return data.results
}

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?language=pt-BR`,
    { headers }
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar filmes populares')
  }

  const data: MovieSearchResponse = await response.json()
  return data.results
}

