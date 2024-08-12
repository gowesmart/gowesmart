import { cn } from "@/lib/cn";

const InputGroup = ({ className, children, error }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export { InputGroup };
