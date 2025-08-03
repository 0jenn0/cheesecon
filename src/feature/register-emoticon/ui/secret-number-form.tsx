import { Icon } from '@/shared/ui/display';
import { Checkbox, TextField } from '@/shared/ui/input';
import useEmoticonRegister from '../model/hook';

export default function SecretNumberForm() {
  const { emoticonSet, setEmoticonSet } = useEmoticonRegister();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmoticonSet({
      ...emoticonSet,
      is_private: e.target.checked,
      password_hash: e.target.checked ? emoticonSet.password_hash : null,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmoticonSet({
      ...emoticonSet,
      password_hash: e.target.value || null,
    });
  };

  return (
    <section className='flex w-full flex-col gap-24'>
      <div className='flex flex-col gap-12'>
        <div className='flex w-full items-center gap-12'>
          <Checkbox
            checked={emoticonSet.is_private ?? false}
            onChange={handleCheckboxChange}
            status={emoticonSet.is_private ? 'checked' : 'unchecked'}
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
          비밀 게시물로 설정하면 비밀 번호를 입력해야 이모티콘을 확인할 수
          있습니다.
        </span>
      </div>

      {emoticonSet.is_private && (
        <div className='flex flex-col gap-16'>
          <TextField
            name='secretNumber'
            label='비밀번호'
            placeholder='****'
            labelType='required'
            direction='column'
            placeholderClassName='padding-y-12'
            onChange={handlePasswordChange}
          />
          <TextField
            name='secretNumber'
            label='비밀번호 확인'
            placeholder='****'
            labelType='required'
            direction='column'
            placeholderClassName='padding-y-12'
            onChange={handlePasswordChange}
          />
        </div>
      )}
    </section>
  );
}
