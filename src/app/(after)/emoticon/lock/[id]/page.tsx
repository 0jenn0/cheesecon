'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { SecretNumberModal } from '@/feature/ask-secret-number';
import SecretOnlyLoggedIn from '@/feature/ask-secret-number/ui/secret-only-logged-in';
import { EmoticonScreen } from '@/screen';

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
      {user ? <SecretNumberModal id={id} /> : <SecretOnlyLoggedIn />}
      <EmoticonScreen emoticonSetId={id} isUnlocked={false} />
    </>
  );
}
