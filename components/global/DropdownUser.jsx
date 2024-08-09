'use client';

import useAuthStore from '@/store/authStore';
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DropdownUser() {
  const { logOut } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push('/');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-11 h-11 justify-center items-center gap-x-1.5 py-2 px-3 text-[16px] rounded-md border border-accent">
          <i aria-hidden className="fa-solid fa-user"></i>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in bg-[#1D1D1D] text-white border border-accent"
      >
        <div className="py-1">
          <MenuItem>
            <a href="#" className="flex px-4 py-2 text-sm text-gray-700 items-center gap-2 data-[focus]:text-secondary">
              <i aria-hidden className="fa-solid fa-user"></i>
              Profile
            </a>
          </MenuItem>
          <MenuItem>
            <Link href="#" className="flex px-4 py-2 text-sm text-gray-700 items-center gap-2 data-[focus]:text-secondary">
              <i aria-hidden className="fa-solid fa-clock-rotate-left"></i>
              History
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/auth/reset-password" className="flex px-4 py-2 text-sm text-gray-700 items-center gap-2 data-[focus]:text-secondary">
              <i aria-hidden className="fa-solid fa-key"></i>
              Reset Password
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              className="flex w-full px-4 py-2 text-left text-sm text-gray-700 items-center gap-2 data-[focus]:text-secondary"
              onClick={handleLogout}
            >
              <i aria-hidden className="fa-solid fa-arrow-right-from-bracket"></i>
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
