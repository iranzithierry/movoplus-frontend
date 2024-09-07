import { cn } from '@/lib/utils';
import { ProductSize } from '@/api_';
import { RadioGroup, Radio } from '@headlessui/react';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) => (
  <fieldset className="mt-10" aria-label="Choose a size">
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-900">Size</div>
    </div>
    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4 grid grid-cols-4 gap-4">
      {sizes.map((size, idx) => (
        <Radio key={idx} value={size.size} disabled={!size.in_stock} className={({ focus }) => cn(size.in_stock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', focus ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1')}>
          {({ checked, focus }) => (
            <>
              <span>{size.size}</span>
              {size.in_stock ? (
                <span className={cn(checked ? 'border-indigo-500' : 'border-transparent', focus ? 'border' : 'border-2', 'pointer-events-none absolute -inset-px rounded-md')} aria-hidden="true" />
              ) : (
                <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                  <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              )}
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  </fieldset>
);

export default SizeSelector;
