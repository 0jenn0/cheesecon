'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  router.replace('/popular');

  return <div></div>;
}
