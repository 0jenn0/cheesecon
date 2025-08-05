import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { DeleteCommentParams, UpdateCommentParams } from '../type';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResult,
} from './types';

export const commentApi = {
  async getComments(request: GetCommentsRequest): Promise<GetCommentsResult> {
    try {
      const supabase = await createServerSupabaseClient();

      let query = supabase.from('comments').select('*');

      if (request.param?.set_id) {
        query = query.eq('set_id', request.param.set_id);
        const { data, error } = await query;
        console.log('data~~~~~~~~', data);
      }

      if (request.param?.user_id) {
        query = query.eq('user_id', request.param.user_id);
      }

      if (request.param?.parent_comment_id !== undefined) {
        query = query.eq(
          'parent_comment_id',
          request.param.parent_comment_id || '',
        );
      }

      if (request.param?.sortBy) {
        query = query.order(request.param.sortBy, {
          ascending: request.param.sortOrder === 'asc',
        });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      if (request.param?.limit) {
        query = query.limit(request.param.limit);
      }

      if (request.param?.offset) {
        query = query.range(
          request.param.offset,
          request.param.offset + (request.param.limit || 10) - 1,
        );
      }

      const { data, error } = await query;

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.code,
          },
        };
      }

      const total = data?.length || 0;
      const currentPage = 1;
      const totalPages = Math.ceil(total / (request.param?.limit || 10));
      const hasMore = currentPage < totalPages;

      return {
        success: true,
        data: {
          data: data || [],
          total,
          currentPage,
          totalPages,
          hasMore,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  },

  async createComment(
    request: CreateCommentRequest,
  ): Promise<CreateCommentResponse> {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('comments')
      .insert(request.comment)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      comment: data,
    };
  },

  async updateComment(params: UpdateCommentParams): Promise<void> {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from('comments')
      .update({
        content: params.content,
        images: params.images,
        updated_at: params.updated_at || new Date().toISOString(),
      })
      .eq('id', params.id);

    if (error) {
      throw error;
    }
  },

  async deleteComment(params: DeleteCommentParams): Promise<void> {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', params.id);

    if (error) {
      throw error;
    }
  },
};
