import { IContact } from "./types";

export const contactsReducer = (state: IContact[], action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return [action.payload, ...state];
        case 'DELETE_CONTACT':
            return state.filter((contact: IContact) => contact.id !== action.payload);
        case 'EDIT_CONTACT':
            // Find the contact to edit by its ID
            const editedContactIndex = state.findIndex((contact) => contact.id === action.payload.id);
            if (editedContactIndex !== -1) {
                // Create a new array with the edited contact
                const updatedState = [...state];
                updatedState[editedContactIndex] = action.payload;
                return updatedState;
            }
            // If the contact with the provided ID was not found, return the current state
            return state;
        case 'SET_CONTACTS':
            return action.payload;
        default:
            return state;
    }
};