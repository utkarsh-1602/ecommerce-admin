"use client"

import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronsUpDown, Store as StoreIcon } from "lucide-react"; // added using shadcn ui 

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { UseStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}


// here StoreSwitcher function has parameters classname and items array which has the object type of storeSwitcherProps
const StoreSwitcher = (
    { className,
        items = []
    }: StoreSwitcherProps) => {

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
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}

                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    Current Store
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>
                            No stores found.
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    {/* //TODO:  */}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher