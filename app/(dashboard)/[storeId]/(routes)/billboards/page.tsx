import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/client"
import { BillboardColumn } from "./components/columns"

const BillboardPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the billboards created for the specific active store 
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => (
        {
            id: item.id,
            label: item.label,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Billboards:", billboards);
    console.log("Formatted Billboards:", formattedBillboards);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    )
}

export default BillboardPage