import { configureStore } from "@reduxjs/toolkit";
import contactsListReducer from "../screens/contactsList/contactsListSlice";

export const store = configureStore({
    reducer: {
        contactsList: contactsListReducer,
    },
});

