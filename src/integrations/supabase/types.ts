export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_logs: {
        Row: {
          accessed_record_id: string | null
          accessed_table: string
          action_type: string
          additional_metadata: Json | null
          id: string
          ip_address: unknown | null
          phi_accessed: boolean | null
          session_id: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          accessed_record_id?: string | null
          accessed_table: string
          action_type: string
          additional_metadata?: Json | null
          id?: string
          ip_address?: unknown | null
          phi_accessed?: boolean | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          accessed_record_id?: string | null
          accessed_table?: string
          action_type?: string
          additional_metadata?: Json | null
          id?: string
          ip_address?: unknown | null
          phi_accessed?: boolean | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crisis_resources: {
        Row: {
          address: string | null
          available_24_7: boolean | null
          city: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          languages_supported: string[] | null
          latitude: number | null
          longitude: number | null
          name: string
          phone_number: string | null
          resource_type: string[] | null
          state: string | null
          updated_at: string | null
          website_url: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          available_24_7?: boolean | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          languages_supported?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone_number?: string | null
          resource_type?: string[] | null
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          available_24_7?: boolean | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          languages_supported?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone_number?: string | null
          resource_type?: string[] | null
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      environment_assessments: {
        Row: {
          assessment_data: Json
          completed_at: string | null
          created_at: string | null
          crisis_level: Database["public"]["Enums"]["crisis_level"] | null
          encrypted_clinical_data: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["assessment_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assessment_data?: Json
          completed_at?: string | null
          created_at?: string | null
          crisis_level?: Database["public"]["Enums"]["crisis_level"] | null
          encrypted_clinical_data?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["assessment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assessment_data?: Json
          completed_at?: string | null
          created_at?: string | null
          crisis_level?: Database["public"]["Enums"]["crisis_level"] | null
          encrypted_clinical_data?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["assessment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      environmental_factors: {
        Row: {
          assessment_id: string | null
          created_at: string | null
          domain: Database["public"]["Enums"]["environmental_domain"]
          factor_name: string
          id: string
          notes: string | null
          resources_needed: string[] | null
          score: number | null
          triggers_identified: string[] | null
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string | null
          domain: Database["public"]["Enums"]["environmental_domain"]
          factor_name: string
          id?: string
          notes?: string | null
          resources_needed?: string[] | null
          score?: number | null
          triggers_identified?: string[] | null
        }
        Update: {
          assessment_id?: string | null
          created_at?: string | null
          domain?: Database["public"]["Enums"]["environmental_domain"]
          factor_name?: string
          id?: string
          notes?: string | null
          resources_needed?: string[] | null
          score?: number | null
          triggers_identified?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "environmental_factors_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "environment_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          encrypted_phi: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_phi?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_phi?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      is_provider_or_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      assessment_status: "in_progress" | "completed" | "reviewed" | "archived"
      crisis_level: "low" | "moderate" | "high" | "critical"
      environmental_domain:
        | "housing"
        | "social"
        | "financial"
        | "health"
        | "nature"
        | "time_routine"
      user_role: "patient" | "provider" | "admin" | "crisis_counselor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_status: ["in_progress", "completed", "reviewed", "archived"],
      crisis_level: ["low", "moderate", "high", "critical"],
      environmental_domain: [
        "housing",
        "social",
        "financial",
        "health",
        "nature",
        "time_routine",
      ],
      user_role: ["patient", "provider", "admin", "crisis_counselor"],
    },
  },
} as const
