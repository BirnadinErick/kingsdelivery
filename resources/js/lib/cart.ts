import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "@/lib/cartSlice";

export default configureStore({
    reducer: {
        cart: cartReducer
    },
})
