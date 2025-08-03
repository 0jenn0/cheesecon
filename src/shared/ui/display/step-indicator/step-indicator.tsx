import { Indicator } from './ui';

export interface StepIndicatorProps {
  currentStep: number;
  totalStep: number;
}

export default function StepIndicator({
  currentStep,
  totalStep,
}: StepIndicatorProps) {
  return (
    <div className='flex items-center gap-4'>
      {Array.from({ length: totalStep }).map((_, index) => (
        <Indicator key={index} step={index} currentStep={currentStep} />
      ))}
    </div>
  );
}
