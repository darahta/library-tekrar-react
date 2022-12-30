import categoriesReducer from "./reducers/CategoriesReducer";

import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
   categoriesState: categoriesReducer,
});

const store = createStore(rootReducer);

export default store;
