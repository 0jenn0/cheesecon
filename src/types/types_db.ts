export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      comment_reactions: {
        Row: {
          comment_id: string | null
          created_at: string | null
          emoji: string
          id: string
          user_id: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          emoji: string
          id?: string
          user_id?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          emoji?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_id: string | null
          images: string[] | null
          parent_comment_id: string | null
          set_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_id?: string | null
          images?: string[] | null
          parent_comment_id?: string | null
          set_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_id?: string | null
          images?: string[] | null
          parent_comment_id?: string | null
          set_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "emoticon_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "trending_emoticons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emoticon_images: {
        Row: {
          comments_count: number | null
          created_at: string | null
          id: string
          image_order: number
          image_url: string
          set_id: string | null
        }
        Insert: {
          comments_count?: number | null
          created_at?: string | null
          id?: string
          image_order: number
          image_url: string
          set_id?: string | null
        }
        Update: {
          comments_count?: number | null
          created_at?: string | null
          id?: string
          image_order?: number
          image_url?: string
          set_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emoticon_images_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emoticon_images_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "trending_emoticons"
            referencedColumns: ["id"]
          },
        ]
      }
      emoticon_sets: {
        Row: {
          author_name: string
          comments_count: number | null
          created_at: string | null
          description: string
          id: string
          is_private: boolean | null
          likes_count: number | null
          password_hash: string | null
          platform: string
          representative_image_url: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Insert: {
          author_name: string
          comments_count?: number | null
          created_at?: string | null
          description: string
          id?: string
          is_private?: boolean | null
          likes_count?: number | null
          password_hash?: string | null
          platform: string
          representative_image_url?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Update: {
          author_name?: string
          comments_count?: number | null
          created_at?: string | null
          description?: string
          id?: string
          is_private?: boolean | null
          likes_count?: number | null
          password_hash?: string | null
          platform?: string
          representative_image_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          set_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          set_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          set_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "trending_emoticons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          nickname: string
          provider: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          nickname: string
          provider: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nickname?: string
          provider?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      views: {
        Row: {
          created_at: string | null
          id: string
          set_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          set_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          set_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "views_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "trending_emoticons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_commenters: {
        Row: {
          avatar_url: string | null
          comment_count: number | null
          id: string | null
          nickname: string | null
        }
        Relationships: []
      }
      dashboard_stats: {
        Row: {
          today_new_emoticons: number | null
          total_comments: number | null
          total_emoticons: number | null
          total_users: number | null
        }
        Relationships: []
      }
      trending_emoticons: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          author_nickname: string | null
          comments_count: number | null
          created_at: string | null
          description: string | null
          id: string | null
          is_private: boolean | null
          likes_count: number | null
          password_hash: string | null
          platform: string | null
          recent_likes_count: number | null
          representative_image_url: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_commenters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
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
