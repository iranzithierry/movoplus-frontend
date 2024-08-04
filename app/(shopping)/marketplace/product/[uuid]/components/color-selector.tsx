import { ProductColor } from '@/api';
import { cn, getColorAttributes } from '@/lib/utils';
import { RadioGroup, Radio } from '@headlessui/react';

interface ColorSelectorProps {
    colors: ProductColor[];
    selectedColor: string;
    setSelectedColor:  React.Dispatch<React.SetStateAction<string>>;
}

const ColorSelector = ({ colors, selectedColor, setSelectedColor }: ColorSelectorProps) => (
    <fieldset aria-label="Choose a color">
        <legend className="text-sm font-medium text-gray-900">Color</legend>
        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4 flex items-center space-x-3">
            {colors.map((color, idx) => (
                <Radio key={idx} value={color.color} aria-label={color.color} className={({ focus, checked }) => cn(getColorAttributes(color.color).split(' ')[1],focus && checked ? 'ring ring-offset-1' : '',!focus && checked ? 'ring-2' : '','relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none')}>
                    <span aria-hidden="true" className={cn(getColorAttributes(color.color).split(' ')[0],'h-8 w-8 rounded-full border border-black border-opacity-10')}/>
                </Radio>
            ))}
        </RadioGroup>
    </fieldset>
);

export default ColorSelector;
