import { cn } from "@/lib/cn";

const InputGroup = ({ className, children, error }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export { InputGroup };
