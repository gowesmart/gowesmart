import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { baseUrl } from "@/utils/constants";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      currentUser: null,
      loadingFetching: false,
      cartUser: null,
      setToken: (token) => set({ token }),
      logOut: () => set({ token: null, currentUser: null }),
      fetchCurrentUser: async () => {
        const { token } = get();
        set({ loadingFetching: true });
        try {
          const { data } = await axios.get(`${baseUrl}/api/users/current`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          set({ currentUser: data.payload });
        } catch (error) {
          set({ token: null, currentUser: null });
        }
        set({ loadingFetching: false });
      },
      fetchCartUser: async () => {
        const { token } = get();
        try {
          const { data } = await axios.get(
            `${baseUrl}/api/users/current/carts`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          set({ cartUser: data.payload });
        } catch (error) {
          console.log(error.code);
        }
      },
    }),
    {
      name: "auth-storage", // nama key di local storage
      partialize: (state) => ({ token: state.token }), // hanya menyimpan token di local storage
    },
  ),
);

export default useAuthStore;
