"use client"

import { Store } from "@prisma/client"

import { PopoverTrigger } from "@/components/ui/popover"
import { UseStoreModal } from "@/hooks/use-store-modal";
import { useParams } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}


// here StoreSwitcher function has parameters classname and items array which has the object type of storeSwitcherProps
const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {

    const storeModal = UseStoreModal();
    const params = useParams();

    return (

        <div>StoreSwitcher</div>
    )
}

export default StoreSwitcher