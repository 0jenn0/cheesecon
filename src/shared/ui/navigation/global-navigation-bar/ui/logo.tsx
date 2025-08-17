import Link from 'next/link';
import { Icon } from '@/shared/ui/display';

export default function Logo() {
  return (
    <Link href='/main/popular' className='flex items-center gap-8'>
      <Icon
        name='logo'
        size={32}
        className='text-[var(--color-cheesecon-primary-300)]'
      />
      <span className='text-heading-sm'>CheeseCon</span>
    </Link>
  );
}
