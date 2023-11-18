"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface categoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient: React.FC<categoryClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();


    console.log("Data Column :", data); // Log the data prop



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage Categories for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
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
            <Heading title="API" description="API Calls for Categories" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}

export default CategoryClient