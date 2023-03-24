import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  register: Partial<UseFormRegisterReturn>;
};

export const Input = ({
  children,
  className,
  name,
  register,
  type,
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      <input
        className={twMerge(
          "block w-full rounded-md border border-line bg-input py-2 px-3 text-sm leading-6 text-input-content placeholder-input-content-2",
          "focus:ring-2 focus:outline-none focus:ring-line-focus",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        type={type}
        {...register}
        {...props}
      />
    </div>
  );
};
