import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'

export function Navbar() {
  const { user, signOut } = useAuth()

  async function handleSignOut() {
    try {
      await signOut()
    } catch {
      alert('Erro ao sair.')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🎬 CineTrack</Link>

      {user && <Link to="/minha-lista">Minha Lista</Link>}

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-email">{user.email}</span>
            <button onClick={handleSignOut}>Sair</button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </nav>
  )
}