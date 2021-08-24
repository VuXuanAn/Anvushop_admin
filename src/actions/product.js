import axiosIntance from "../helpers/axios";
import { productConstants } from "./constant";

export const addProduct = (form) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
            const res = await axiosIntance.post(`product/create`, form);
            if (res.status === 201) {
                dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
            } else {
                dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
            }
        } catch (error) {
            console.log(error);
        }
    };
};