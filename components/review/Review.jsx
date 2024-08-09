const Review = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-5 rounded-md border border-accent p-11">
      <div className="flex items-center gap-5">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-md border border-accent">
          <i aria-hidden className="fa-solid fa-user"></i>
        </div>
        <div className="flex h-[50px] flex-col justify-center">
          <p className="text-[20px]">username</p>
          <div className="flex items-center gap-2 text-[12px]">
            <div className="flex gap-1">
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <i aria-hidden className="fa-solid fa-star text-gray"></i>
            </div>
            <p>(4)</p>
          </div>
        </div>
      </div>
      <div className="h-[220px] border border-accent bg-primary"></div>
    </div>
  );
};

export default Review;
