'use client';

import { useEffect } from 'react';
import StepIndicator from '@/shared/ui/display/step-indicator/step-indicator';
import { RegisterBottomBarMobile } from '@/feature/register-emoticon/ui';
import { useEmoticonRegisterContext, useStep } from '../model';
import {
  EmoticonFormStep1Screen,
  EmoticonFormStep2Screen,
} from './mobile-screen/index';

const INITIAL_STEP = 0;
const STEP_COUNT = 2;

interface EmoticonFormMobileScreenProps {
  action: 'create' | 'update';
}

export default function EmoticonFormMobileScreen({
  action,
}: EmoticonFormMobileScreenProps) {
  const { currentStep, handleStepChange } = useStep(INITIAL_STEP, STEP_COUNT);
  const { isEmoticonSectionVisible } = useEmoticonRegisterContext();

  useEffect(() => {
    if (isEmoticonSectionVisible && currentStep === 0) {
      handleStepChange(STEP_COUNT - 1);
    }
  }, [isEmoticonSectionVisible, currentStep, handleStepChange]);

  return (
    <>
      <section className='padding-y-16 margin-b-64 flex h-full w-full flex-col items-center gap-24'>
        <StepIndicator currentStep={currentStep} totalStep={STEP_COUNT} />
        {currentStep === 0 && <EmoticonFormStep1Screen action={action} />}
        {currentStep === 1 && <EmoticonFormStep2Screen />}
      </section>
      <RegisterBottomBarMobile
        currentStep={currentStep}
        STEP_COUNT={STEP_COUNT}
        handleStepChange={handleStepChange}
        action={action}
      />
    </>
  );
}
