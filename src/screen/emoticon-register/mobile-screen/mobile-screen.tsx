'use client';

import { useState } from 'react';
import StepIndicator from '@/shared/ui/display/step-indicator/step-indicator';
import { Button } from '@/shared/ui/input';
import { EmoticonRegisterProvider } from '@/feature/register-emoticon/model/hook';
import { EmoticonRegisterStep1Screen, EmoticonRegisterStep2Screen } from './ui';

const STEP_COUNT = 2;

export default function EmoticonRegisterMobileScreen({
  step = 0,
}: {
  step?: number;
}) {
  const [currentStep, setCurrentStep] = useState(step);

  const handleNextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, STEP_COUNT - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <EmoticonRegisterProvider>
      <section className='padding-y-16 margin-b-64 flex h-full w-full flex-col items-center gap-24'>
        <StepIndicator currentStep={currentStep} totalStep={STEP_COUNT} />
        {currentStep === 0 && <EmoticonRegisterStep1Screen />}
        {currentStep === 1 && <EmoticonRegisterStep2Screen />}
      </section>
      <div className='padding-16 fixed right-0 bottom-0 left-0'>
        <Button
          className='w-full'
          textClassName='text-body-lg font-semibold'
          onClick={handleNextStep}
        >
          {currentStep === STEP_COUNT - 1 ? '등록하기' : '다음'}
        </Button>
      </div>
    </EmoticonRegisterProvider>
  );
}
