import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/client"
import { ProductColumn } from "./components/columns"
import { formatter } from "@/lib/utils"

const ProductPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the billboards created for the specific active store 
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => (
        {
            id: item.id,
            name: item.name,
            isFeatured: item.isFeatured,
            isArchived: item.isArchived,
            price: formatter.format(item.price.toNumber()),
            category: item.category.name,
            size: item.size.name,
            color: item.color.value,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Billboards:", products);
    console.log("Formatted Billboards:", formattedProducts);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedProducts} />
            </div>
        </div>
    )
}

export default ProductPage