import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import './Navbar.css'

export function Navbar() {
  const { user, signOut } = useAuth()
  const { profile } = useProfile()

  async function handleSignOut() {
    try {
      await signOut()
    } catch {
      alert('Erro ao sair.')
    }
  }

  const displayName = profile?.username || user?.email

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🎬 CineTrack</Link>

      {user && <Link to="/minha-lista">Minha Lista</Link>}

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/perfil" className="navbar-profile">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Perfil" className="navbar-avatar" />
              ) : (
                <div className="navbar-avatar-placeholder">
                  {(displayName || '?')[0].toUpperCase()}
                </div>
              )}
              <span className="navbar-username">{displayName}</span>
            </Link>
            <button onClick={handleSignOut}>Sair</button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </nav>
  )
}