import { ICarts } from "@/interfaces/carts.interface";
import { createSlice } from "@reduxjs/toolkit";



const initialState: {
    cartInfo: ICarts[]

} = {
    cartInfo: [],
};

const cartInfoSlice = createSlice({
    name: "cartsInfo",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const cart = action.payload;
            const exist = state?.cartInfo?.find((x) => x.id === cart.id);
            if (exist) {
                state.cartInfo = state.cartInfo.map((x) =>
                    x.id === exist.id ? cart : x
                );
            } else {
                if (state.cartInfo.length === 0) {
                    state.cartInfo = [cart];
                } else {
                    state.cartInfo = [...state.cartInfo, cart];
                }
                // state.cartInfo = [...state.cartInfo, cart];
            }
        },
        removeCart: (state, action) => {
            const cart = action.payload;
            state.cartInfo = state.cartInfo.filter((x) => x.id !== cart.id);
        },
        clearCart: (state) => {
            state.cartInfo = [];
        },
        addCartQuantity: (state, action) => {
            const cart = action.payload;
            const exist = state.cartInfo.find((x) => x.id === cart.id);
            if (exist) {
                exist.qty += 1;
                state.cartInfo = state.cartInfo.map((x) =>
                    x.id === cart.id ? exist : x
                );
            }


        },
        subtractQuantity: (state, action) => {
            const cart = action.payload;
            const exist = state.cartInfo.find((x) => x.id === cart.id);
            if (exist) {
                exist.qty > 1 ? exist.qty -= 1 : exist.qty = 1;
                state.cartInfo = state.cartInfo.map((x) =>
                    x.id === cart.id ? exist : x
                );
            }
        }
        ,
        addSelectedCart: (state, action) => {
            const cart = action.payload;
            const exist = state.cartInfo.find((x) => x.id === cart.id);
            if (exist) {
                exist.selected = !exist.selected;
                state.cartInfo = state.cartInfo.map((x) =>
                    x.id === cart.id ? exist : x
                );
            }
        },
        addSelectedAllCart: (state) => {
            const selected = state.cartInfo.every((x) => x.selected === true);
            if (selected) {
                state.cartInfo = state.cartInfo.map((x) => {
                    x.selected = false;
                    return x;
                })
            } else {
                state.cartInfo = state.cartInfo.map((x) => {
                    x.selected = true;
                    return x;
                })
            }
        }


    },


    selectors: {
        getCarts: state => state?.cartInfo,
    },

});

export default cartInfoSlice.reducer;
export const { addCart, removeCart, clearCart, addCartQuantity, subtractQuantity, addSelectedAllCart, addSelectedCart } = cartInfoSlice.actions;
export const { getCarts } = cartInfoSlice.selectors;