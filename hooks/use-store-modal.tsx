import { create } from "zustand";

// Defining an interface for the state of the modal store
interface useStoreModalStore {
    isOpen: boolean; // Indicates whether the modal is open or closed
    onOpen: () => void;   // Function to open the modal
    onClose: () => void; // Function to close the modal
}

// Creating a Zustand store for managing the modal state
export const UseStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false, // Initial state: modal is closed
    onOpen: () => set({ isOpen: true }), // Function to open the modal by setting `isOpen` to `true`
    onClose: () => set({ isOpen: false }) // Function to close the modal by setting `isOpen` to `false`
}))