const Review = ({ review }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <i
          key={i}
          aria-hidden
          className={`fa-solid fa-star ${i <= rating ? "text-yellow-400" : "text-gray-400"}`}
        ></i>,
      );
    }

    return stars;
  };

  return (
    <div className="flex w-full flex-col justify-center gap-5 rounded-md border border-accent p-11">
      <div className="flex items-center gap-5">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-md border border-accent">
          <i aria-hidden className="fa-solid fa-user"></i>
        </div>
        <div className="flex h-[50px] flex-col justify-center">
          <p className="text-[20px]">{review?.user_username}</p>
          <div className="flex items-center gap-2 text-[12px]">
            <div className="flex gap-1">{renderStars(review?.rating || 0)}</div>
            <p>({review?.rating || 0})</p>
          </div>
        </div>
      </div>
      <div className="mih-h-[220px] border border-accent bg-primary p-3">
        <p>{review?.comment}</p>
      </div>
    </div>
  );
};

export default Review;
