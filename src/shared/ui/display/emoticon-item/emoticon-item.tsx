'use client';

import Image from 'next/image';
import { ComponentPropsWithRef, PropsWithChildren, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import useEmoticonContext from '@/feature/register-emoticon/ui/emoticon-section/provider/emotion-provider';
import { Spinner } from '../../feedback';
import Icon from '../../icon/icon';
import { Checkbox } from '../../input';
import useEmoticonItem, {
  EmoticonItemProvider,
} from './provider/emoticon-item-provider';
import { ImageNumberBadge } from './ui';

export interface EmoticonItemProps extends ComponentPropsWithRef<'div'> {
  imageNumber: number;
  commentsCount?: number;
  likesCount?: number;
  showCheckbox?: boolean;
  showGripIcon?: boolean;
  showNumberBadge?: boolean;
  imageUrl?: string;
  blurUrl?: string | null;
  isUploading?: boolean;
  isDragging?: boolean;
}

function EmoticonItemRoot({
  imageNumber,
  showCheckbox,
  showGripIcon,
  showNumberBadge,
  imageUrl,
  blurUrl,
  isUploading,
  isDragging,
  children,
  className,
  commentsCount,
  likesCount,
}: EmoticonItemProps) {
  return (
    <EmoticonItemProvider
      blurUrl={blurUrl ?? null}
      showGripIcon={showGripIcon}
      imageNumber={imageNumber}
      showCheckbox={showCheckbox}
      showNumberBadge={showNumberBadge}
      imageUrl={imageUrl}
      isUploading={isUploading}
      isDragging={isDragging}
      commentsCount={commentsCount}
      likesCount={likesCount}
    >
      <div className={cn('flex flex-col gap-0', className)}>{children}</div>
    </EmoticonItemProvider>
  );
}

const contentVariants = cva(
  'flex aspect-square h-full w-full flex-col items-center justify-center gap-0',
  {
    variants: {
      isDragging: {
        false: 'border-interactive-secondary border-b-[0.6px]',
        true: 'border-radius-xl cursor-grab border-2 border-[var(--color-cheesecon-primary-300)] opacity-70',
      },
    },
  },
);

interface EmoticonItemContentProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof contentVariants> {}

function EmoticonItemContent({
  children,
  className,
  ...props
}: EmoticonItemContentProps) {
  const { imageUrl, blurUrl, isUploading, imageNumber, isDragging } =
    useEmoticonItem();

  return (
    <>
      {!isUploading && (
        <>
          {imageUrl ? (
            <div className='relative'>
              <div
                className={cn(contentVariants({ isDragging }), className)}
                {...props}
              >
                <div className='b absolute inset-0 z-30 flex flex-col'>
                  {children}
                </div>
              </div>
              {blurUrl ? (
                <Image
                  src={imageUrl}
                  placeholder='blur'
                  blurDataURL={blurUrl ?? ''}
                  alt='emoticon'
                  priority={imageNumber <= 8}
                  className={cn(
                    contentVariants({ isDragging }),
                    'absolute inset-0',
                  )}
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={imageUrl}
                  alt='emoticon'
                  priority={imageNumber <= 8}
                  // fetchPriority={imageNumber <= 8 ? 'high' : 'low'}
                  // loading={imageNumber <= 8 ? 'eager' : 'lazy'}
                  width={100}
                  height={100}
                  className={cn(
                    contentVariants({ isDragging }),
                    'absolute inset-0',
                  )}
                />
              )}
            </div>
          ) : (
            <div
              className={cn(contentVariants({ isDragging }), className)}
              {...props}
            >
              {children}
            </div>
          )}
        </>
      )}
      {/* {shouldShowErrorIcon && (
        <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
          <Icon name='alert-circle' size={16} className='icon-danger' />
          <span className='text-body-sm text-danger'>이미지 로딩 실패</span>
        </div>
      )} */}
      {isUploading && (
        <div className={contentVariants({ isDragging })}>
          <Spinner size='lg' />
        </div>
      )}
    </>
  );
}

function EmoticonItemHeader({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) {
  const { showNumberBadge, imageNumber, showCheckbox } = useEmoticonItem();

  const { items, handleEmoticonItem } = useEmoticonContext();
  const isChecked = items.find(
    (item) => item.imageNumber === imageNumber,
  )?.isChecked;
  const hasImage = items.find(
    (item) => item.imageNumber === imageNumber,
  )?.imageUrl;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEmoticonItem(imageNumber, e.target.checked ? 'CHECK' : 'UNCHECK');
  };

  return (
    <div
      className={cn(
        'padding-8 flex w-full items-center justify-between',
        className,
      )}
      {...props}
    >
      {showNumberBadge ? (
        <ImageNumberBadge imageNumber={imageNumber} />
      ) : (
        <div className='width-24 height-24' />
      )}
      {showCheckbox ? (
        <Checkbox
          disabled={!hasImage}
          status={isChecked ? 'checked' : 'unchecked'}
          checked={isChecked}
          onChange={handleCheckboxClick}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className='width-24 height-24' />
      )}
    </div>
  );
}

function EmoticonItemBody({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentPropsWithRef<'div'>>) {
  return (
    <div
      className={cn('flex flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function EmoticonItemFooter({
  className,
  ...props
}: PropsWithChildren<ComponentPropsWithRef<'div'>>) {
  const { showGripIcon } = useEmoticonItem();

  return (
    <div
      className={cn(
        'padding-8 flex w-full items-center justify-end',
        className,
      )}
      {...props}
    >
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

function EmoticonItemBottomBar({
  className,
  ...props
}: PropsWithChildren<ComponentPropsWithRef<'div'>>) {
  const { likesCount, commentsCount } = useEmoticonItem();

  return (
    <div
      className={cn(
        'padding-8 tablet:justify-end flex w-full items-center justify-between gap-12',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <Icon name='message-circle' size={16} className='icon-disabled' />
        <p className='text-body-sm text-secondary'>{commentsCount}</p>
      </div>
      <div className='flex items-center gap-2'>
        <Icon name='heart' size={16} className='icon-disabled' />
        <p className='text-body-sm text-secondary'>{likesCount}</p>
      </div>
    </div>
  );
}

const EmoticonItem = {
  Root: EmoticonItemRoot,
  Content: EmoticonItemContent,
  Body: EmoticonItemBody,
  Header: EmoticonItemHeader,
  Footer: EmoticonItemFooter,
  BottomBar: EmoticonItemBottomBar,
};

export default EmoticonItem;
