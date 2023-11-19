import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { ColorColumn } from "./components/columns"
import ColorsClient from "./components/client"

const ColorsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the billboards created for the specific active store 
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => (
        {
            id: item.id,
            name: item.name,
            value: item.value,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Colors:", colors);
    console.log("Formatted Colors:", formattedColors);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage