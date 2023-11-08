"use client"

import { Modal } from "@/components/ui/modal";
import { UseStoreModal } from "@/hooks/use-store-modal";
import { useEffect, useState } from 'react';

const SetupPage = () => {

    const onOpen = UseStoreModal((state) => state.onOpen)
    const isOpen = UseStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
};

export default SetupPage;
