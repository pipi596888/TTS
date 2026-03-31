import { request } from '@/utils/request'
import type { Voice, VoiceCreateParams, VoiceListResponse } from '@/types/voice'

export const voiceApi = {
  list() {
    return request<VoiceListResponse>({
      url: '/voice/list',
      method: 'GET',
    })
  },

  // 获取所有音色（包括用户音色和 MiniMax 系统音色）
  all() {
    return request<VoiceListResponse>({
      url: '/voice/all',
      method: 'GET',
    })
  },

  create(params: VoiceCreateParams) {
    return request<Voice>({
      url: '/voice/create',
      method: 'POST',
      data: params,
    })
  },

  delete(id: number) {
    return request<void>({
      url: `/voice/${id}`,
      method: 'DELETE',
    })
  },

  setDefault(id: number) {
    return request<void>({
      url: `/voice/default/${id}`,
      method: 'PUT',
    })
  },

  preview(voiceId: number, minimaxVoiceId?: string | null): Promise<Blob> {
    let url = `/voice/preview?voiceId=${voiceId}`
    if (minimaxVoiceId) {
      url += `&minimaxVoiceId=${encodeURIComponent(minimaxVoiceId)}`
    }
    return request<Blob>({
      url,
      method: 'GET',
      responseType: 'blob',
    })
  },
}

