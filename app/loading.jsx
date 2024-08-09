import { cn } from "@/lib/cn";

const Loading = ({ ...props }) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center",
        props.className,
      )}
    >
      <i
        aria-hidden
        className="fa-solid fa-bicycle fa-bounce mb-2 text-[64px]"
      ></i>
      <p className="text-[20px] font-bold">gowesmart</p>
    </div>
  );
};

export default Loading;
