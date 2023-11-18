import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { CategoryColumn } from "./components/columns"
import CategoryClient from "./components/client"

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the categories created for the specific active store 
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => (
        {
            id: item.id,
            name: item.name,
            billboardLabel: item.billboard.label,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Billboards:", categories);
    console.log("Formatted Billboards:", formattedCategories);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage