import * as React from "react"
import { OTPInput, SlotProps } from "input-otp"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & SlotProps
>(({ char, hasFakeCaret, isActive, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-10 w-10 rounded-md border border-input bg-background text-center text-sm shadow-sm transition-all",
      isActive && "ring-2 ring-offset-background ring-ring ring-offset-2",
      className
    )}
    {...props}
  >
    {char}
    {hasFakeCaret && (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
      </div>
    )}
  </div>
))
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPSlot }
