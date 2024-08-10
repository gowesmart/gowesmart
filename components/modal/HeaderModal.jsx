import Link from "next/link";

const HeaderModal = ({ isModal, setIsModal, handleLogout, role }) => {
  return (
    <section
      onClick={() => {
        setIsModal(false);
      }}
      className={`fixed inset-0 bg-black bg-opacity-5 ${isModal ? "modal-in" : "modal-out"}`}
    >
      <div className="container relative mx-auto mt-[80px] xl:max-w-[1280px]">
        <div
          className={`absolute right-0 top-0 mt-[15px] flex flex-col rounded-md border border-accent bg-primary p-10 text-[14px] shadow-2xl ${isModal ? "header-modal-in" : "header-modal-out"}`}
        >
          {role === "USER" ? (
            <>
              <Link
                href={"/profile"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-user"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">Profile</p>
              </Link>
              <Link
                href={"/cart"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-cart-shopping"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">
                  Shopping Cart
                </p>
              </Link>
              <Link
                href={"/history"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-history"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">History</p>
              </Link>
              <Link
                href={"/auth/reset-password"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-key"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">
                  Reset Password
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/dashboard/user"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-user"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">User</p>
              </Link>
              <Link
                href={"/dashboard/bike"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-gear"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">Bike</p>
              </Link>
              <Link
                href={"/dashboard/category"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-layer-group"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">Category</p>
              </Link>
              <Link
                href={"/dashboard/transaction"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-receipt"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">Transaction</p>
              </Link>
              <Link
                href={"/dashboard/review"}
                className="flex items-center rounded-md duration-150 hover:bg-secondary"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center">
                  <i aria-hidden className="fa-solid fa-comments"></i>
                </div>
                <p className="pr-[25px] text-left font-semibold">Review</p>
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center rounded-md text-[#FF0000] duration-150 hover:bg-secondary hover:text-white"
          >
            <div className="flex h-[50px] w-[50px] items-center justify-center">
              <i aria-hidden className="fa-solid fa-right-from-bracket"></i>
            </div>
            <p className="pr-[25px] text-left font-bold">Logout</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeaderModal;
