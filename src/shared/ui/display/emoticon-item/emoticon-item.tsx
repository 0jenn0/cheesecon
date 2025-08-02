import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Spinner } from '../../feedback';
import Icon from '../../icon/icon';
import { Checkbox } from '../../input';
import useEmoticonItem, {
  EmoticonItemProvider,
} from './provider/emoticon-item-provider';
import { ImageNumberBadge } from './ui';

export interface EmoticonItemProps extends ComponentPropsWithRef<'div'> {}

function EmoticonItemRoot({
  imageNumber,
  showCheckbox,
  showGripIcon,
  imageUrl,
  isUploading,
  isDragging,
  children,
}: PropsWithChildren<{
  imageNumber: number;
  showCheckbox?: boolean;
  showGripIcon?: boolean;
  imageUrl?: string;
  isUploading?: boolean;
  isDragging?: boolean;
}>) {
  return (
    <EmoticonItemProvider
      showGripIcon={showGripIcon}
      imageNumber={imageNumber}
      showCheckbox={showCheckbox}
      imageUrl={imageUrl}
      isUploading={isUploading}
      isDragging={isDragging}
    >
      {children}
    </EmoticonItemProvider>
  );
}

const contentVariants = cva(
  'flex aspect-square h-full w-full flex-col gap-0 bg-cover bg-center bg-no-repeat',
  {
    variants: {
      isDragging: {
        false: 'border-interactive-secondary border-b',
        true: 'border-radius-xl border-2 border-[var(--color-cheesecon-primary-300)] opacity-70',
      },
    },
  },
);

interface EmoticonItemContentProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof contentVariants> {}

function EmoticonItemContent({ children, ...props }: EmoticonItemContentProps) {
  const { imageUrl, isUploading, isDragging } = useEmoticonItem();

  return (
    <>
      {
        <div
          className={contentVariants({ isDragging })}
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
          {...props}
        >
          {children}
        </div>
      }
      {/* {shouldShowErrorIcon && (
        <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
          <Icon name='alert-circle' size={16} className='icon-danger' />
          <span className='text-body-sm text-danger'>이미지 로딩 실패</span>
        </div>
      )} */}
      {isUploading && (
        <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
          <Spinner />
          {isUploading && (
            <span className='text-body-sm text-secondary'>업로드 중...</span>
          )}
        </div>
      )}
    </>
  );
}

function EmoticonItemHeader({}: PropsWithChildren) {
  const {
    imageNumber,
    showCheckbox,

    isChecked,
    handleCheck,
  } = useEmoticonItem();

  return (
    <div className='padding-8 flex w-full items-center justify-between'>
      <ImageNumberBadge imageNumber={imageNumber} />
      {showCheckbox ? (
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          checked={isChecked}
          onChange={handleCheck}
        />
      ) : (
        <div className='width-24 height-24' />
      )}
    </div>
  );
}

function EmoticonItemBody({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-1 items-center justify-center'>{children}</div>
  );
}

function EmoticonItemFooter({}: PropsWithChildren) {
  const { showGripIcon } = useEmoticonItem();

  return (
    <div className='padding-8 flex w-full items-center justify-end'>
      {showGripIcon ? (
        <Icon
          name='grip-vertical'
          size={24}
          className='icon-secondary border-radius-rounded padding-4 bg-white/60'
        />
      ) : (
        <div className='width-24 height-24' />
      )}
    </div>
  );
}

const EmoticonItem = {
  Root: EmoticonItemRoot,
  Content: EmoticonItemContent,
  Body: EmoticonItemBody,
  Header: EmoticonItemHeader,
  Footer: EmoticonItemFooter,
};

export default EmoticonItem;
