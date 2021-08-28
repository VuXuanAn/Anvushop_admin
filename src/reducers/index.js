import auth from "./auth.reducer";
import user from './user.reducer'
import category from "./category.reducer"
import product from "./product.reducer"
import page from './page.reducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth,
    user,
    category,
    product,
    page,
})

export default rootReducer