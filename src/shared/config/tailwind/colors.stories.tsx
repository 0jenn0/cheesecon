import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default {
  title: 'Design Tokens/Colors',
};

const colorTokens = {
  cheese: [
    { name: 'cheese-50', hex: '#fffcdb' },
    { name: 'cheese-100', hex: '#fff7b2' },
    { name: 'cheese-200', hex: '#fff49a' },
    { name: 'cheese-300', hex: '#fff081' },
    { name: 'cheese-400', hex: '#ffe75c' },
    { name: 'cheese-500', hex: '#fbd93c' },
    { name: 'cheese-600', hex: '#e9bf2e' },
    { name: 'cheese-700', hex: '#d2a42a' },
    { name: 'cheese-800', hex: '#a6781e' },
  ],
  gray: [
    { name: 'gray-50', hex: '#f8f9fa' },
    { name: 'gray-100', hex: '#f1f3f4' },
    { name: 'gray-200', hex: '#e8eaed' },
    { name: 'gray-300', hex: '#dadce0' },
    { name: 'gray-400', hex: '#bdc1c6' },
    { name: 'gray-500', hex: '#9aa0a6' },
    { name: 'gray-600', hex: '#80868b' },
    { name: 'gray-700', hex: '#5f6368' },
    { name: 'gray-800', hex: '#3c4043' },
    { name: 'gray-900', hex: '#202124' },
  ],
  green: [
    { name: 'green-50', hex: '#f0fdf4' },
    { name: 'green-100', hex: '#dcfce7' },
    { name: 'green-200', hex: '#bbf7d0' },
    { name: 'green-300', hex: '#86efac' },
    { name: 'green-400', hex: '#69d886' },
    { name: 'green-500', hex: '#4ade80' },
    { name: 'green-600', hex: '#22c55e' },
    { name: 'green-700', hex: '#16a34a' },
    { name: 'green-800', hex: '#15803d' },
    { name: 'green-900', hex: '#166534' },
  ],
  blue: [
    { name: 'blue-50', hex: '#eff6ff' },
    { name: 'blue-100', hex: '#dbeafe' },
    { name: 'blue-200', hex: '#bfdbfe' },
    { name: 'blue-300', hex: '#93c5fd' },
    { name: 'blue-400', hex: '#91cfff' },
    { name: 'blue-500', hex: '#60a5fa' },
    { name: 'blue-600', hex: '#3b82f6' },
    { name: 'blue-700', hex: '#2563eb' },
    { name: 'blue-800', hex: '#1d4ed8' },
    { name: 'blue-900', hex: '#1e40af' },
  ],
  red: [
    { name: 'red-50', hex: '#fef2f2' },
    { name: 'red-100', hex: '#fee2e2' },
    { name: 'red-200', hex: '#fecaca' },
    { name: 'red-300', hex: '#fca5a5' },
    { name: 'red-400', hex: '#f87171' },
    { name: 'red-500', hex: '#ef4444' },
    { name: 'red-600', hex: '#dc2626' },
    { name: 'red-700', hex: '#b91c1c' },
    { name: 'red-800', hex: '#991b1b' },
    { name: 'red-900', hex: '#7f1d1d' },
  ],
};

const ColorChip = ({
  color,
  onCopy,
  copied,
}: {
  color: { name: string; hex: string };
  onCopy: (hex: string) => void;
  copied: string | null;
}) => (
  <div className='group relative'>
    <div
      className='aspect-square rounded-lg transition-transform group-hover:scale-[1.02]'
      style={{ backgroundColor: color.hex }}
    />
    <div className='mt-2 space-y-1'>
      <div className='flex items-center justify-between'>
        <span className='text-label-md font-mono text-gray-900'>
          {color.name}
        </span>
        <button
          onClick={() => onCopy(color.hex)}
          className='rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100'
        >
          {copied === color.hex ? (
            <Check className='h-3 w-3 text-green-600' />
          ) : (
            <Copy className='h-3 w-3 text-gray-600' />
          )}
        </button>
      </div>
      <div className='text-label-sm text-gray-600'>{color.hex}</div>
    </div>
  </div>
);

const ColorScale = ({
  name,
  colors,
  onCopy,
  copied,
}: {
  name: string;
  colors: { name: string; hex: string }[];
  onCopy: (hex: string) => void;
  copied: string | null;
}) => (
  <div className='space-y-4'>
    <h3 className='text-title-sm capitalize'>{name}</h3>
    <div className='grid grid-cols-6 gap-4'>
      {colors.map((color) => (
        <ColorChip
          key={color.name}
          color={color}
          onCopy={onCopy}
          copied={copied}
        />
      ))}
    </div>
  </div>
);

export function AllColors() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('palette');

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1000);
  };

  const tabs = [
    { id: 'palette', label: 'Color Palette' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  return (
    <div className='mx-auto max-w-7xl p-6'>
      <div className='mb-8'>
        <h1 className='text-headline-md mb-2 text-gray-900'>
          Design Tokens - Colors
        </h1>
        <p className='text-body-sm text-gray-600'>
          애플리케이션 전반에서 사용되는 컬러 토큰입니다. 원하는 색상을 클릭하면
          해당 색상의 HEX 값을 복사할 수 있습니다.
        </p>
      </div>

      <div className='space-y-12'>
        {Object.entries(colorTokens).map(([name, colors]) => (
          <ColorScale
            key={name}
            name={name}
            colors={colors}
            onCopy={handleCopy}
            copied={copied}
          />
        ))}
      </div>
    </div>
  );
}
