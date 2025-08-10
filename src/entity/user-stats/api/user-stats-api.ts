import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { GetUserStatsWithWeeklyResult } from './type';

export async function getUserStatsWithWeekly(): Promise<GetUserStatsWithWeeklyResult> {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: { message: '사용자 인증이 필요합니다.' },
      };
    }

    const { data, error } = await supabase
      .from('user_stats_with_weekly')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('현재 사용자 통계 조회 중 오류:', error);
    return {
      success: false,
      error: { message: 'Unknown error' },
    };
  }
}
