import { configureStore } from "@reduxjs/toolkit";
import contactsListReducer from "../components/contactsList/contactsListSlice";

export const store = configureStore({
    reducer: {
        contactsList: contactsListReducer,
    },
});

