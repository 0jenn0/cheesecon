import { useState } from 'react';
import { Icon } from '@/shared/ui/display';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';

export interface GridItemProps {
  imageNumber: number;
  showCheckbox?: boolean;
}

export default function GridItem({
  imageNumber,
  showCheckbox = false,
}: GridItemProps) {
  const [showGripIcon, setShowGripIcon] = useState(false);

  const handleMouseEnter = () => {
    if (showCheckbox) {
      return null;
    }

    setShowGripIcon(true);
  };

  const handleMouseLeave = () => {
    setShowGripIcon(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <EmoticonItem.Root
        imageNumber={imageNumber}
        showCheckbox={showCheckbox}
        showGripIcon={showGripIcon}
      >
        <EmoticonItem.Content>
          <EmoticonItem.Header />
          <EmoticonItem.Body>
            <Icon name='image-plus' size={32} className='icon-ghost' />
          </EmoticonItem.Body>
          <EmoticonItem.Footer />
        </EmoticonItem.Content>
      </EmoticonItem.Root>
    </div>
  );
}
