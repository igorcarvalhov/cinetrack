import type { ReactNode } from 'react'
import './MovieCard.css'

interface MovieCardProps {
  title: string
  posterPath: string | null
  status?: string
  action?: ReactNode
}

export function MovieCard({ title, posterPath, status, action }: MovieCardProps) {
  return (
    <div className="movie-card">
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          alt={title}
        />
      ) : (
        <div className="movie-card-placeholder">Sem imagem</div>
      )}

      <div className="movie-card-info">
        <p>{title}</p>
        {status && <p className="movie-card-status">{status}</p>}
        {action}
      </div>
    </div>
  )
}