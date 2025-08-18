import { Button } from '@/shared/ui/input';

export function RegisterBottomBar() {
  return (
    <div className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'>
      <Button textClassName='text-body-lg font-semibold' className='padding-32'>
        등록하기
      </Button>
    </div>
  );
}
