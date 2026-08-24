import { useState } from 'react'
import type { ReactNode } from 'react'
import './MovieCard.css'

interface MovieCardProps {
  title: string
  posterPath: string | null
  status?: string
  action?: ReactNode
}

export function MovieCard({ title, posterPath, status, action }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)

  const showImage = posterPath && !imageError

  return (
    <div className="movie-card">
      {showImage ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          alt={title}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="movie-card-placeholder">Sem imagem</div>
      )}

      <div className="movie-card-info">
        <div className="movie-card-title">
          <span>{title}</span>
        </div>
        {status && <p className="movie-card-status">{status}</p>}
        {action}
      </div>
    </div>
  )
}