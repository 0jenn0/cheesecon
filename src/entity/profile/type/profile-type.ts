import { EmoticonSet } from '@/entity/emoticon-set';
import { Database } from '@/types/types_db';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface ProfileActivity extends Profile {
  emoticon_count: number;
  comment_count: number;
  total_likes_received: number;
  activity_score: number;
}

export interface UserDetailStats {
  profile: Profile;
  emoticons: EmoticonSet[];
  recentComments: Comment[];
  likesGiven: number;
}

export interface MyStats {
  profile: Profile;
  emoticon_count: number;
  comment_count: number;
  total_likes_received: number;
  likes_given: number;
  recent_emoticons: EmoticonSet[];
}
