import { Indicator } from './ui';

export interface StepIndicatorProps {
  steps: number[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className='flex items-center gap-4'>
      {steps.map((step) => (
        <Indicator key={step} step={step} currentStep={currentStep} />
      ))}
    </div>
  );
}
