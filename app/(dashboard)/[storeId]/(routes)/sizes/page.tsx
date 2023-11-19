import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { SizeColumn } from "./components/columns"
import SizesClient from "./components/client"

const SizesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the billboards created for the specific active store 
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map((item) => (
        {
            id: item.id,
            name: item.name,
            value: item.value,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Sizes:", sizes);
    console.log("Formatted Sizes:", formattedSizes);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    )
}

export default SizesPage