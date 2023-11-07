"use client"

import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from 'react';

const SetupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            {isModalOpen && (
                <Modal title="Test" description="Test Desc" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    Children
                </Modal>
            )}
        </div>
    );
};

export default SetupPage;
