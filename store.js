import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import contactsSlice from "./src/features/contactsSlice";

export const store = configureStore({
    reducer: {
        contacts: contactsSlice,
    },
    applyMiddleware: [thunk],

});

