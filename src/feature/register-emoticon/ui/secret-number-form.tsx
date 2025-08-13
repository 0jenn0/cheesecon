import { Icon } from '@/shared/ui/display';
import { Checkbox } from '@/shared/ui/input';
import useEmoticonRegister from '../model/hook';

export default function SecretCheckForm() {
  const {
    createEmoticonSetForm: emoticonSetWithRepresentativeImage,
    setEmoticonSet,
  } = useEmoticonRegister();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmoticonSet({
      ...emoticonSetWithRepresentativeImage,
      is_private: e.target.checked,
    });
  };

  return (
    <div className='flex w-full flex-col gap-12'>
      <div className='flex w-full items-center gap-12'>
        <Checkbox
          checked={emoticonSetWithRepresentativeImage.is_private ?? false}
          onChange={handleCheckboxChange}
          status={
            emoticonSetWithRepresentativeImage.is_private
              ? 'checked'
              : 'unchecked'
          }
          id='secretNumberCheck'
        />
        <div className='flex items-center gap-4'>
          <label
            className='text-body-lg cursor-pointer font-semibold select-none'
            htmlFor='secretNumberCheck'
          >
            비밀 게시물로 설정
          </label>
          <Icon name='lock' />
        </div>
      </div>

      <span className='text-body-sm text-tertiary'>
        비밀 게시물로 설정하면 작가의 공유 링크를 통해서만 이모티콘을 볼 수
        있어요.
      </span>
    </div>
  );
}
