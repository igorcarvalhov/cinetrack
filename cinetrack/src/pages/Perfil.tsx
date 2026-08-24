import { useEffect, useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../hooks/useAuth'
import './Perfil.css'

export function Perfil() {
  const { user } = useAuth()
  const { profile, loading, updateProfile, uploadAvatar, updatePassword, updateEmail } = useProfile()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingEmail, setSavingEmail] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Preenche o formulário quando o perfil carrega
  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line
      setFirstName(profile.first_name ?? '')
      setLastName(profile.last_name ?? '')
      setUsername(profile.username ?? '')
    }
  }, [profile])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setSavingProfile(true)

    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        username,
      })
      setMessage('Perfil atualizado com sucesso!')
    } catch {
      setError('Erro ao atualizar perfil. O nome de usuário pode já estar em uso.')
    } finally {
      setSavingProfile(false)
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    setError(null)

    try {
      await uploadAvatar(file)
      setMessage('Foto atualizada com sucesso!')
    } catch {
      setError('Erro ao enviar foto.')
    } finally {
      setUploadingAvatar(false)
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (newPassword.length < 6) {
      setError('A senha precisa ter no mínimo 6 caracteres.')
      return
    }

    setSavingPassword(true)
    try {
      await updatePassword(newPassword)
      setMessage('Senha alterada com sucesso!')
      setNewPassword('')
    } catch {
      setError('Erro ao alterar senha.')
    } finally {
      setSavingPassword(false)
    }
  }

  async function handleChangeEmail(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setSavingEmail(true)

    try {
      await updateEmail(newEmail)
      setMessage('Enviamos um link de confirmação para o novo email. Confirme para concluir a troca.')
      setNewEmail('')
    } catch {
      setError('Erro ao alterar email. Verifique se o endereço é válido.')
    } finally {
      setSavingEmail(false)
    }
  }

  if (loading) {
    return <div className="page-container"><p>Carregando...</p></div>
  }

  return (
    <div className="page-container perfil-container">
      <h1>Meu Perfil</h1>

      {message && <p className="perfil-message success">{message}</p>}
      {error && <p className="perfil-message error">{error}</p>}

      <div className="perfil-avatar-section">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="Foto de perfil" className="perfil-avatar" />
        ) : (
          <div className="perfil-avatar-placeholder">
            {(username || user?.email || '?')[0].toUpperCase()}
          </div>
        )}

        <label className="perfil-avatar-upload">
          {uploadingAvatar ? 'Enviando...' : 'Trocar foto'}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploadingAvatar}
            hidden
          />
        </label>
      </div>

      <form className="perfil-form" onSubmit={handleSaveProfile}>
        <h2>Dados pessoais</h2>

        <div className="perfil-field">
          <label htmlFor="firstName">Nome</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="perfil-field">
          <label htmlFor="lastName">Sobrenome</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="perfil-field">
          <label htmlFor="username">Nome de usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="perfil-field">
          <label>Email</label>
          <input type="email" value={user?.email ?? ''} disabled />
        </div>

        <button type="submit" disabled={savingProfile}>
          {savingProfile ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>

      <form className="perfil-form" onSubmit={handleChangePassword}>
        <h2>Alterar senha</h2>

        <div className="perfil-field">
          <label htmlFor="newPassword">Nova senha</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
          />
        </div>

        <button type="submit" disabled={savingPassword}>
          {savingPassword ? 'Alterando...' : 'Alterar senha'}
        </button>
      </form>

      <form className="perfil-form" onSubmit={handleChangeEmail}>
        <h2>Alterar email</h2>

        <div className="perfil-field">
          <label>Email atual</label>
          <input type="email" value={user?.email ?? ''} disabled />
        </div>

        <div className="perfil-field">
          <label htmlFor="newEmail">Novo email</label>
          <input
            id="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={savingEmail}>
          {savingEmail ? 'Enviando...' : 'Alterar email'}
        </button>
      </form>
    </div>
  )
}