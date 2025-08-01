import { ComponentPropsWithRef, PropsWithChildren } from 'react';
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
  children,
}: PropsWithChildren<{
  imageNumber: number;
  showCheckbox?: boolean;
  showGripIcon?: boolean;
  imageUrl?: string;
  isUploading?: boolean;
}>) {
  return (
    <EmoticonItemProvider
      showGripIcon={showGripIcon}
      imageNumber={imageNumber}
      showCheckbox={showCheckbox}
      imageUrl={imageUrl}
      isUploading={isUploading}
    >
      <div className='border-interactive-secondary flex aspect-square w-full flex-col gap-0 border-b'>
        {children}
      </div>
    </EmoticonItemProvider>
  );
}

function EmoticonItemContent({ children }: PropsWithChildren) {
  const { imageUrl, isUploading } = useEmoticonItem();

  return (
    <>
      {
        <div
          className='flex h-full w-full flex-col bg-cover bg-center bg-no-repeat'
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
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
