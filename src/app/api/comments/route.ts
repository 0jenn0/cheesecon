import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/shared/lib/supabase/server';

export async function GET() {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await (await supabase)
    .from('comments')
    .select('*')
    .limit(10);

  return NextResponse.json({ data, error });
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseAdminClient();
  const body = await req.json();

  const { data, error } = await (await supabase)
    .from('comments')
    .insert(body)
    .select();

  return NextResponse.json({ data, error });
}
