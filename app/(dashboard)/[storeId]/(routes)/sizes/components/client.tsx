"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface SizesClientProps {
    data: SizeColumn[]
}

const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();


    console.log("Data Column :", data); // Log the data prop



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage Sizes for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Heading title="API" description="API Calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}

export default SizesClient