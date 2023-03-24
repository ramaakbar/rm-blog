import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentPropsWithRef<"button"> & {
  isLoading?: boolean;
};

export default function Button({
  children,
  type,
  isLoading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type || "button"}
      disabled={isLoading}
      className={twMerge(
        "rounded-md py-2 px-4 text-sm bg-info font-semibold text-info-content",
        "hover:bg-info-focus",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Please wait
        </div>
      )}

      {!isLoading && children}
    </button>
  );
}
