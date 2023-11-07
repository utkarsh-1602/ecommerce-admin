"use client";

import { UseStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

const StoreModal = () => {

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

export default StoreModal;