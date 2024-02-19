import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps {
  className?: string;
  onValueChange?: (value: number[]) => void;
  step?: number;
  min?: number;
  max?: number;
}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const [sliderValue, setSliderValue] = React.useState([0]);
    const handleChange = (values: number[]) => {
      setSliderValue(values);
      if (onValueChange) {
        onValueChange(values);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
        onValueChange={handleChange}
        value={sliderValue}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-white" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
