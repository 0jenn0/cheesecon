'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { EmoticonScreen } from '@/screen';
import LockModal from '@/screen/lock/lock-modal';

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <LockModal id={id} />
      <EmoticonScreen emoticonSetId={id} isUnlocked={false} />
    </>
  );
}
