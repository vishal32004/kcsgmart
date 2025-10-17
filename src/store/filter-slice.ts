import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { ProductListData } from "@/types/product";

export interface FilterSlice {
    productsList: ProductListData[];
    setProducts: (productsList: ProductListData[]) => void;
    clearProducts: () => void;
}

export const createFilterProductSlice: StateCreator<
    Store,
    [
        ["zustand/devtools", never],
        ["zustand/subscribeWithSelector", never],
        ["zustand/persist", unknown],
        ["zustand/immer", never]
    ],
    [],
    FilterSlice
> = (set) => ({
    productsList: [],

    setProducts: (productsList) =>
        set(
            (state) => {
                state.productsList = productsList;
            },
            false,
            "setProducts"
        ),

    clearProducts: () =>
        set(
            (state) => {
                state.productsList = [];
            },
            false,
            "clearProducts"
        ),
});
