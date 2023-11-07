"use client";

import { UseStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const storeModal = () => {

    const storeModal = UseStoreModal();

    return (
        <Modal
            title="Create store"
            description="Modal description"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Create store form
        </Modal>
    )
}