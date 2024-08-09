import { create } from "zustand"

const useFilter = create((set) => ({
    filters: {
        name: "",
        categoryId: { value: 0, isAdapt: false },
        minPrice: { value: "", isAdapt: false },
        maxPrice: { value: "", isAdapt: false },
        minYear: { value: "", isAdapt: false },
        maxYear: { value: "", isAdapt: false },
        marker: false

    },
    setFilters: (payload) => set((state) => ({
        filters: {
            ...state.filters,
            ...payload
        }
    })),
    clearFilters: () => set((state) => ({
        filters: {
            name: state.filters.name,
            categoryId: { value: 0, isAdapt: false },
            minPrice: { value: "", isAdapt: false },
            maxPrice: { value: "", isAdapt: false },
            minYear: { value: "", isAdapt: false },
            maxYear: { value: "", isAdapt: false },
            marker: false
        },
        adaptFilter: 0
    })),
    adaptFilter: 0,
    increaseAdaptFilter: () => set((state) => ({ adaptFilter: state.adaptFilter + 1 })),
    decreaseAdaptFilter: () => set((state) => ({ adaptFilter: state.adaptFilter - 1 }))
}))

export default useFilter