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
          className={`absolute right-0 top-0 mt-[15px] flex flex-col rounded-md border border-accent bg-primary p-10 text-[14px] shadow-2xl mx-5 xl:mx-0 ${isModal ? "header-modal-in" : "header-modal-out"}`}
        >
          {
            role ?
              <>
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
                        Cart
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
              </>
              :
              <>
                <Link
                  href={"/"}
                  className="flex items-center rounded-md duration-150 hover:bg-secondary"
                >
                  <div className="flex h-[50px] w-[50px] items-center justify-center">
                    <i aria-hidden className="fa-solid fa-house"></i>
                  </div>
                  <p className="pr-[25px] text-left font-semibold">Home</p>
                </Link>
                <Link
                  href={"/cart"}
                  className="flex items-center rounded-md duration-150 hover:bg-secondary"
                >
                  <div className="flex h-[50px] w-[50px] items-center justify-center">
                    <i aria-hidden className="fa-solid fa-cart-shopping"></i>
                  </div>
                  <p className="pr-[25px] text-left font-semibold">Cart</p>
                </Link>
                <Link
                  href={"/bikes"}
                  className="flex items-center rounded-md duration-150 hover:bg-secondary"
                >
                  <div className="flex h-[50px] w-[50px] items-center justify-center">
                    <i aria-hidden className="fa-solid fa-bicycle"></i>
                  </div>
                  <p className="pr-[25px] text-left font-semibold">Products</p>
                </Link>
                <Link
                  href={"/auth/register"}
                  className="flex justify-center font-semibold h-[40px] items-center rounded-md duration-150 hover:bg-gray-dark border border-accent my-2"
                >
                  Register
                </Link>
                <Link
                  href={"/auth/login"}
                  className="flex justify-center font-semibold h-[40px] items-center rounded-md duration-150 bg-secondary"
                >
                  Login
                </Link>
              </>
          }
        </div>
      </div>
      {
        role &&
        <div className={`absolute bottom-[15px] left-0 right-0 flex justify-center text-[14px] xl:hidden ${isModal ? "bottom-in" : "bottom-out"}`}>
          <div className="flex justify-center bg-primary p-4 rounded-md border border-accent shadow-md gap-4">
            <Link
              onClick={() => {
                setIsModal(false);
              }}
              href={"/"}
              className="z-50 flex h-[35px] w-[35px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
            >
              <i aria-hidden className="fa-solid fa-house"></i>
            </Link>
            <Link
              onClick={() => {
                setIsModal(false);
              }}
              href={"/bikes"}
              className="z-50 flex h-[35px] w-[35px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
            >
              <i aria-hidden className="fa-solid fa-bicycle"></i>
            </Link>
            <Link
              onClick={() => {
                setIsModal(false);
              }}
              href={"/cart"}
              className="z-50 flex h-[35px] w-[35px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
            >
              <i aria-hidden className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      }
    </section>
  );
};

export default HeaderModal;
