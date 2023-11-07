"use client"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Modal onClose={() => { }} isOpen={true} title="Test" description="Test Desc">
                Children
            </Modal>
            {/* <UserButton /> */}
        </div>
    )
}
