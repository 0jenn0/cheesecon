import Icon from '../../../icon/icon';

export default function BottomBar({
  likeCount,
  commentCount,
}: {
  likeCount: number;
  commentCount: number;
}) {
  return (
    <div className='padding-8 tablet:justify-end tablet:gap-8 flex w-full items-center justify-between'>
      <div className='flex items-center gap-4'>
        <Icon name='message-circle' size={16} className='icon-tertiary' />
        <span className='text-body-sm'>{commentCount}</span>
      </div>
      <div className='flex items-center gap-4'>
        <Icon name='heart' size={16} className='icon-heart' />
        <span className='text-body-sm'>{likeCount}</span>
      </div>
    </div>
  );
}
