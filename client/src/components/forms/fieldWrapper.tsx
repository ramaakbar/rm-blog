import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { ErrorLabel } from "./errorLabel";
import { Label } from "./label";

type FieldWrapperProps = {
  label?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  className?: string;
};

export const FieldWrapper = ({
  label,
  children,
  error,
  className,
}: FieldWrapperProps) => {
  return (
    <div className={twMerge("space-y-2", className)}>
      <Label htmlFor={label?.toLowerCase()}>{label}</Label>
      {children}
      {error?.message && <ErrorLabel>{error.message}</ErrorLabel>}
    </div>
  );
};
