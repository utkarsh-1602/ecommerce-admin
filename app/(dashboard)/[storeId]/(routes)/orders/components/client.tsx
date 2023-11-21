"use client"

import { useParams, useRouter } from "next/navigation"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface orderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<orderClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();


    console.log("Data Column :", data); // Log the data prop



    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage Orders for your store"
            />
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="products"
            />
        </>
    )
}

export default OrderClient