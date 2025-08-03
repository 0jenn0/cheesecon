import { useState } from 'react';

export function useStep(initialStep: number, totalStep: number) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleStepChange = (step: number) => {
    if (step < initialStep || step >= totalStep) {
      return;
    }

    setCurrentStep(step);
  };

  return { currentStep, handleStepChange };
}
