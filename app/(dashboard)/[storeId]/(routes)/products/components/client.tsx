"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface billboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: React.FC<billboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();


    console.log("Data Column :", data); // Log the data prop



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage Billboard for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="label"
            />
            <Heading title="API" description="API Calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}

export default BillboardClient