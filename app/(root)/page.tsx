"use client"

import { Modal } from "@/components/ui/modal";

const SetupPage = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Modal title="Test" description="Test Desc" isOpen onClose={() => { }}>
                Children
            </Modal>
        </div>
    )
}

export default SetupPage;