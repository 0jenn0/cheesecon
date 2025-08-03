'use client';

import { useEffect } from 'react';
import StepIndicator from '@/shared/ui/display/step-indicator/step-indicator';
import { RegisterBottomBarMobile } from '@/feature/register-emoticon/ui';
import { useEmoticonRegisterContext, useStep } from './model';
import {
  EmoticonRegisterStep1Screen,
  EmoticonRegisterStep2Screen,
} from './responsive';

const INITIAL_STEP = 0;
const STEP_COUNT = 2;

export default function EmoticonRegisterMobileScreen() {
  const { currentStep, handleStepChange } = useStep(INITIAL_STEP, STEP_COUNT);
  const { isEmoticonSectionVisible } = useEmoticonRegisterContext();

  useEffect(() => {
    if (isEmoticonSectionVisible && currentStep === 0) {
      handleStepChange(STEP_COUNT - 1);
    }
  }, [isEmoticonSectionVisible, currentStep]);

  return (
    <>
      <section className='padding-y-16 margin-b-64 flex h-full w-full flex-col items-center gap-24'>
        <StepIndicator currentStep={currentStep} totalStep={STEP_COUNT} />
        {currentStep === 0 && <EmoticonRegisterStep1Screen />}
        {currentStep === 1 && <EmoticonRegisterStep2Screen />}
      </section>
      <RegisterBottomBarMobile
        currentStep={currentStep}
        STEP_COUNT={STEP_COUNT}
        handleStepChange={handleStepChange}
      />
    </>
  );
}
