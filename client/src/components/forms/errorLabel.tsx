type ErrorLabelProps = {
  children: React.ReactNode;
};

export const ErrorLabel = ({ children }: ErrorLabelProps) => {
  return <div className="text-sm text-danger font-semibold">{children}</div>;
};
