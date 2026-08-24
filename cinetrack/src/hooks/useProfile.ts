import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from './useAuth'
import type { Profile } from '../types/profile'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (!error && data) {
      setProfile(data)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    // eslint-disable-next-line
    void loadProfile()
  }, [loadProfile])

  async function updateProfile(updates: {
    first_name?: string
    last_name?: string
    username?: string
    avatar_url?: string
  }) {
    if (!user) throw new Error('Usuário não autenticado')

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...updates,
      updated_at: new Date().toISOString(),
    })

    if (error) throw error
    await loadProfile()
  }

  async function uploadAvatar(file: File) {
    if (!user) throw new Error('Usuário não autenticado')

    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/avatar.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

    await updateProfile({ avatar_url: data.publicUrl })
  }

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  async function updateEmail(newEmail: string) {
  const { error } = await supabase.auth.updateUser({ email: newEmail })
  if (error) throw error
}

  return { profile, loading, updateProfile, uploadAvatar, updatePassword, updateEmail }
}