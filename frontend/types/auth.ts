// Firebase Auth Types
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  agreeToTerms: boolean
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface UserProfileFormData {
  name: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  dateOfBirth?: string
  photo?: File
}
