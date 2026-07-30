export type EmailCategory =
  | 'quote'
  | 'pickup'
  | 'claim'
  | 'status_inquiry'
  | 'general'

export type RoutingStatus = 'auto_routed' | 'flagged_for_review'

export type Department =
  | 'Quotes'
  | 'Pickups'
  | 'Claims'
  | 'CustomerService'
  | 'General'

export interface EmailClassification {
  id: string
  message_id: string
  thread_id: string | null
  is_thread_continuation: boolean
  sender_email: string | null
  subject: string | null
  received_at: string | null
  category: EmailCategory | null
  confidence: number | null
  routing_status: RoutingStatus | null
  assigned_department: Department | string | null
  has_attachments: boolean
  attachment_note: string | null
  ai_reasoning: string | null
  reviewed_by_human: boolean
  processed_at: string
}
