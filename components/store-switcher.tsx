"use client"

import { Store } from "@prisma/client"
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { UseStoreModal } from "@/hooks/use-store-modal";
import { useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}


// here StoreSwitcher function has parameters classname and items array which has the object type of storeSwitcherProps
const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {

    const storeModal = UseStoreModal();
    const params = useParams();
    const router = useRouter();

    // iterate over all items
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    // which is the currently active store from all stores 
    const currentStore = formattedItems.find((item) => item.value === params.storeId)


    const [open, setOpen] = useState(false);

    // function that will trigger when what happens when we click on different store 
    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>

            </PopoverTrigger>
        </Popover>
    )
}

export default StoreSwitcher