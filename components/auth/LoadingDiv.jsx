export default function LoadingDiv() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <div>
        <div className="flex h-screen flex-col items-center justify-center">
          <i
            aria-hidden
            className="fa-solid fa-bicycle fa-bounce text-[64px]"
          ></i>
          <p className="text-[20px] font-bold">gowesmart</p>
        </div>
      </div>
    </main>
  );
}
