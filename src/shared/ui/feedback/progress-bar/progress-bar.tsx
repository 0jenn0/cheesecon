export interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const ratio = Math.min((current / total) * 100, 100);

  return (
    <div className='bg-cheesecon-secondary-100 height-4 flex w-full gap-0'>
      <div
        className='bg-cheesecon-primary-300 h-full'
        style={{ width: `${ratio}%` }}
      />
      <div className='bg-tertiary h-full flex-1' />
    </div>
  );
}
