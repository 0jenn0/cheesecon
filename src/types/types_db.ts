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
          {
            foreignKeyName: "comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats_with_weekly"
            referencedColumns: ["user_id"]
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
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats_with_weekly"
            referencedColumns: ["user_id"]
          },
        ]
      }
      emoticon_images: {
        Row: {
          blur_url: string | null
          comments_count: number | null
          created_at: string | null
          id: string
          image_order: number
          image_url: string
          is_representative: boolean | null
          likes_count: number | null
          mp4_url: string | null
          poster_url: string | null
          set_id: string | null
          webm_url: string | null
          webp_url: string | null
        }
        Insert: {
          blur_url?: string | null
          comments_count?: number | null
          created_at?: string | null
          id?: string
          image_order: number
          image_url: string
          is_representative?: boolean | null
          likes_count?: number | null
          mp4_url?: string | null
          poster_url?: string | null
          set_id?: string | null
          webm_url?: string | null
          webp_url?: string | null
        }
        Update: {
          blur_url?: string | null
          comments_count?: number | null
          created_at?: string | null
          id?: string
          image_order?: number
          image_url?: string
          is_representative?: boolean | null
          likes_count?: number | null
          mp4_url?: string | null
          poster_url?: string | null
          set_id?: string | null
          webm_url?: string | null
          webp_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emoticon_images_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
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
          platform: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
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
          platform: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
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
          platform?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
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
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "emoticon_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats_with_weekly"
            referencedColumns: ["user_id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          image_id: string | null
          set_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_id?: string | null
          set_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_id?: string | null
          set_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "emoticon_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "emoticon_sets"
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
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats_with_weekly"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          description: string | null
          id: string
          nickname: string
          provider: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          nickname: string
          provider: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
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
          {
            foreignKeyName: "views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats_with_weekly"
            referencedColumns: ["user_id"]
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
      user_stats: {
        Row: {
          activity_score: number | null
          avatar_url: string | null
          comment_count: number | null
          created_at: string | null
          emoticon_count: number | null
          nickname: string | null
          total_likes_given: number | null
          total_likes_received: number | null
          user_id: string | null
        }
        Relationships: []
      }
      user_stats_with_weekly: {
        Row: {
          activity_score: number | null
          avatar_url: string | null
          comment_count: number | null
          comments_change: number | null
          created_at: string | null
          emoticon_count: number | null
          emoticons_change: number | null
          last_week_comments: number | null
          last_week_emoticons: number | null
          last_week_likes_given: number | null
          last_week_likes_received: number | null
          likes_given_change: number | null
          likes_received_change: number | null
          nickname: string | null
          this_week_comments: number | null
          this_week_emoticons: number | null
          this_week_likes_given: number | null
          this_week_likes_received: number | null
          total_likes_given: number | null
          total_likes_received: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _bump_comment_counts: {
        Args: {
          p_new_img: string
          p_new_set: string
          p_old_img: string
          p_old_set: string
        }
        Returns: undefined
      }
      _text_to_uuid_safe: {
        Args: { p: string }
        Returns: string
      }
      get_comments_v1: {
        Args: {
          p_image_id?: string
          p_limit?: number
          p_offset?: number
          p_parent_comment_id?: string
          p_parent_is_null?: boolean
          p_set_id?: string
          p_sort_order?: string
          p_user_id?: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          image_id: string
          parent_comment_id: string
          profile: Json
          reaction_summary: Json
          set_id: string
          total_count: number
          updated_at: string
          user_id: string
        }[]
      }
      get_comments_v2: {
        Args: {
          p_image_id?: string
          p_limit?: number
          p_offset?: number
          p_parent_comment_id?: string
          p_parent_is_null?: boolean
          p_set_id?: string
          p_sort_order?: string
          p_user_id?: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          image_id: string
          parent_comment_id: string
          profile: Json
          reaction_summary: Json
          set_id: string
          total_count: number
          updated_at: string
          user_id: string
        }[]
      }
      get_comments_v3: {
        Args: {
          p_image_id?: string
          p_limit?: number
          p_offset?: number
          p_parent_comment_id?: string
          p_parent_is_null?: boolean
          p_set_id?: string
          p_sort_order?: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          image_id: string
          parent_comment_id: string
          profile: Json
          reaction_summary: Json
          set_id: string
          total_count: number
          updated_at: string
          user_id: string
        }[]
      }
      get_comments_v5: {
        Args: {
          p_image_id?: string
          p_limit?: number
          p_offset?: number
          p_parent_comment_id?: string
          p_parent_is_null?: boolean
          p_set_id?: string
          p_sort_order?: string
          p_user_id?: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          image_id: string
          parent_comment_id: string
          profile: Json
          reaction_summary: Json
          set_id: string
          total_count: number
          updated_at: string
          user_id: string
        }[]
      }
      get_comments_v6: {
        Args: {
          p_image_id?: string
          p_limit?: number
          p_offset?: number
          p_parent_comment_id?: string
          p_parent_is_null?: boolean
          p_set_id?: string
          p_sort_order?: string
          p_user_id?: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          image_id: string
          images: string[]
          parent_comment_id: string
          profile: Json
          reaction_summary: Json
          set_id: string
          total_count: number
          updated_at: string
          user_id: string
        }[]
      }
      get_emoticon_sets_with_like_status: {
        Args:
          | {
              p_current_user_id?: string
              p_limit?: number
              p_offset?: number
              p_order_by?: string
              p_order_direction?: string
              p_title_filter?: string
              p_user_id_filter?: string
            }
          | {
              p_current_user_id?: string
              p_limit?: number
              p_offset?: number
              p_order_by?: string
              p_order_direction?: string
              p_title_filter?: string
              p_user_id_filter?: string
            }
        Returns: {
          sets: Json
          total_count: number
        }[]
      }
      get_liked_emoticon_sets_optimized: {
        Args:
          | {
              p_limit?: number
              p_offset?: number
              p_order_by?: string
              p_order_direction?: string
              p_title_filter?: string
              p_user_id: string
            }
          | {
              p_limit?: number
              p_offset?: number
              p_order_by?: string
              p_order_direction?: string
              p_title_filter?: string
              p_user_id: string
            }
        Returns: {
          sets: Json
          total_count: number
        }[]
      }
      get_weekly_top_users: {
        Args: { limit_count?: number }
        Returns: {
          nickname: string
          profile_image_url: string
          user_id: string
          weekly_activity_score: number
          weekly_comment_count: number
          weekly_emoticon_count: number
        }[]
      }
      increment_view_count: {
        Args: { p_set_id: string; p_user_id?: string }
        Returns: undefined
      }
      increment_view_count_safe: {
        Args: { p_set_id: string; p_user_id?: string }
        Returns: boolean
      }
      recalculate_user_stats: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      sync_all_counts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      toggle_like: {
        Args: { p_image_id?: string; p_set_id?: string; p_user_id: string }
        Returns: Json
      }
      update_image_comment_count: {
        Args: { p_image_id: string }
        Returns: undefined
      }
      update_set_comment_count: {
        Args: { p_set_id: string }
        Returns: undefined
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
