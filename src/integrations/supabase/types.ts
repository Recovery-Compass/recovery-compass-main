export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      adventure_insights: {
        Row: {
          ai_response: string
          created_at: string
          email: string
          id: string
          insights: Json | null
          name: string | null
          org_size: string | null
          org_type: string | null
          primary_challenge: string | null
          role: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_response: string
          created_at?: string
          email: string
          id?: string
          insights?: Json | null
          name?: string | null
          org_size?: string | null
          org_type?: string | null
          primary_challenge?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_response?: string
          created_at?: string
          email?: string
          id?: string
          insights?: Json | null
          name?: string | null
          org_size?: string | null
          org_type?: string | null
          primary_challenge?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      otter_knowledge_extracts: {
        Row: {
          content: string
          extract_type: string
          extracted_at: string | null
          extraction_method: string | null
          id: string
          related_case: string | null
          relevance_score: number | null
          source_segment_ids: string[] | null
          tags: string[] | null
          title: string
          transcript_id: string | null
          verified: boolean | null
        }
        Insert: {
          content: string
          extract_type: string
          extracted_at?: string | null
          extraction_method?: string | null
          id?: string
          related_case?: string | null
          relevance_score?: number | null
          source_segment_ids?: string[] | null
          tags?: string[] | null
          title: string
          transcript_id?: string | null
          verified?: boolean | null
        }
        Update: {
          content?: string
          extract_type?: string
          extracted_at?: string | null
          extraction_method?: string | null
          id?: string
          related_case?: string | null
          relevance_score?: number | null
          source_segment_ids?: string[] | null
          tags?: string[] | null
          title?: string
          transcript_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "otter_knowledge_extracts_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "otter_transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "otter_knowledge_extracts_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "recent_transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      otter_segments: {
        Row: {
          created_at: string | null
          end_time_seconds: number | null
          id: string
          segment_text: string
          segment_vector: string | null
          speaker_name: string | null
          start_time_seconds: number | null
          transcript_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time_seconds?: number | null
          id?: string
          segment_text: string
          segment_vector?: string | null
          speaker_name?: string | null
          start_time_seconds?: number | null
          transcript_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time_seconds?: number | null
          id?: string
          segment_text?: string
          segment_vector?: string | null
          speaker_name?: string | null
          start_time_seconds?: number | null
          transcript_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "otter_segments_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "otter_transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "otter_segments_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "recent_transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      otter_transcripts: {
        Row: {
          access_count: number | null
          audio_file_path: string | null
          california_pc632_compliant: boolean | null
          category: string | null
          contains_privileged_content: boolean | null
          content_vector: string | null
          created_at: string
          custom_intelligence: Json | null
          docx_file_path: string | null
          duration_seconds: number | null
          folder_name: string | null
          id: string
          ingested_at: string | null
          last_accessed: string | null
          notes: string | null
          otter_speech_id: string
          pdf_file_path: string | null
          processed_at: string | null
          search_tsv: unknown
          source: string | null
          speakers: Json | null
          srt_file_path: string | null
          summary: string | null
          tags: string[] | null
          title: string
          transcript_text: string
          txt_file_path: string | null
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          access_count?: number | null
          audio_file_path?: string | null
          california_pc632_compliant?: boolean | null
          category?: string | null
          contains_privileged_content?: boolean | null
          content_vector?: string | null
          created_at: string
          custom_intelligence?: Json | null
          docx_file_path?: string | null
          duration_seconds?: number | null
          folder_name?: string | null
          id?: string
          ingested_at?: string | null
          last_accessed?: string | null
          notes?: string | null
          otter_speech_id: string
          pdf_file_path?: string | null
          processed_at?: string | null
          search_tsv?: unknown
          source?: string | null
          speakers?: Json | null
          srt_file_path?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          transcript_text: string
          txt_file_path?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          access_count?: number | null
          audio_file_path?: string | null
          california_pc632_compliant?: boolean | null
          category?: string | null
          contains_privileged_content?: boolean | null
          content_vector?: string | null
          created_at?: string
          custom_intelligence?: Json | null
          docx_file_path?: string | null
          duration_seconds?: number | null
          folder_name?: string | null
          id?: string
          ingested_at?: string | null
          last_accessed?: string | null
          notes?: string | null
          otter_speech_id?: string
          pdf_file_path?: string | null
          processed_at?: string | null
          search_tsv?: unknown
          source?: string | null
          speakers?: Json | null
          srt_file_path?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          transcript_text?: string
          txt_file_path?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          identifier: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          identifier: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          identifier?: string
        }
        Relationships: []
      }
    }
    Views: {
      recent_transcripts: {
        Row: {
          category: string | null
          created_at: string | null
          duration_seconds: number | null
          excerpt: string | null
          id: string | null
          otter_speech_id: string | null
          tags: string[] | null
          title: string | null
          word_count: number | null
        }
        Relationships: []
      }
      transcripts_by_category: {
        Row: {
          category: string | null
          total_duration_seconds: number | null
          total_hours: number | null
          total_words: number | null
          transcript_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      search_otter_transcripts_semantic: {
        Args: {
          filter_category?: string
          filter_tags?: string[]
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          category: string
          created_at: string
          id: string
          otter_speech_id: string
          similarity: number
          tags: string[]
          title: string
          transcript_text: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
