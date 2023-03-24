import { twMerge } from "tailwind-merge";

type LabelProps = React.ComponentPropsWithoutRef<"label">;

export const Label = ({
  htmlFor,
  children,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("block text-sm font-medium", className)}
      {...props}
    >
      {children}
    </label>
  );
};
