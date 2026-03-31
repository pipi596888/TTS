export interface Voice {
  id: number
  name: string
  tone: string
  gender: string
  previewUrl?: string
  isDefault: boolean
  source?: 'user' | 'system'
  minimaxVoiceId?: string | null
  createdAt?: string
}

export interface VoiceCreateParams {
  name: string
  tone: string
  gender: string
}

export interface VoiceListResponse {
  list: Voice[]
  total: number
}

