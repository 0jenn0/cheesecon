import Image from 'next/image';

export default function CommentImages({ images }: { images: string[] }) {
  return (
    <div className='flex flex-wrap gap-8'>
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className='border-ghost relative h-[120px] w-[120px] overflow-hidden rounded-lg border'
        >
          <Image
            src={image}
            alt='comment image'
            fill
            className='object-cover'
            sizes='120px'
          />
        </div>
      ))}
    </div>
  );
}
