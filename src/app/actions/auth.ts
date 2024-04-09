'use server'

import { createClient } from '@/lib/supabase-server'
import { LoginFormValues, RegisterFormValues } from '@/lib/validators/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(data: LoginFormValues) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=error')
  }

  redirect('/dashboard')
}

export async function signUp(data: RegisterFormValues) {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}