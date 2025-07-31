export default function ImageNumberBadge({
  imageNumber,
}: {
  imageNumber: number;
}) {
  return (
    <div className='padding-2 tablet:padding-4 border-radius-rounded bg-secondary flex items-center justify-center'>
      <span className='text-body-sm height-12 width-12 flex items-center justify-center'>
        {imageNumber}
      </span>
    </div>
  );
}
