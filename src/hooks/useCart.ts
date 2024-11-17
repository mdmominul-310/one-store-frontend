import { ICarts } from "@/interfaces/carts.interface";
import { RootState } from "@/store/app/store";
import { addCart, addCartQuantity, addSelectedAllCart, addSelectedCart, clearCart, removeCart, subtractQuantity } from "@/store/features/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
    const [cart, setCart] = useState<ICarts[]>([]);
    const cartItems = useSelector((state: RootState) => state.local.cartReducer.cartInfo);
    const disPatch = useDispatch();

    const addToCart = (cartInfo: ICarts) => {
        disPatch(addCart(cartInfo))
    }

    const removeToCart = (id: string) => {
        disPatch(removeCart({ id }))
    }

    const clearToCart = () => {
        disPatch(clearCart())
    }

    const isExist = (id: string) => {
        return cart.some((item) => item.id === id)
    }

    const addQuantity = (id: string) => {
        disPatch(addCartQuantity({ id }))
    }

    const reduceQuantity = (id: string) => {
        disPatch(subtractQuantity({ id }))
    }

    const countDiscount = (price: number | string, regularPrice: number | string) => {
        const regPrice = typeof regularPrice === 'string' ? parseInt(regularPrice) : regularPrice;
        const salePrice = typeof price === 'string' ? parseInt(price) : price;
        return Math.floor(((regPrice - salePrice) / regPrice) * 100)
    }

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    const addSelected = (id: string) => {
        disPatch(addSelectedCart({ id }))
    }

    const addAllSelected = () => {
        disPatch(addSelectedAllCart())
    }
    // const totalSelected = cart.filter((item) => item.selected === true).length;
    const totalSelectedPrice = cart.filter((item) => item.selected === true).reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalSelectedItems = cart.filter((item) => item.selected === true).reduce((acc, item) => acc + item.qty, 0);
    const isSelectedAll = cart.every((item) => item.selected === true);
    const isSelected = (id: string) => {
        return cart.some((item) => item.id === id && item.selected === true)
    }
    const selectedItems = cart.filter((item) => item.selected === true);


    useEffect(() => {
        setCart(cartItems);
    }, [cartItems, setCart])

    return {
        cart,
        setCart,
        addToCart,
        totalPrice,
        totalItems,
        removeToCart,
        clearToCart,
        isExist,
        addQuantity,
        reduceQuantity,
        countDiscount,
        addSelected,
        addAllSelected,
        totalSelectedPrice,
        totalSelectedItems,
        isSelectedAll,
        selectedItems,
        isSelected

    }

}

export default useCart;