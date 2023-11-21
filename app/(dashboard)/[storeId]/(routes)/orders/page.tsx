import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { OrderColumn } from "./components/columns"
import { formatter } from "@/lib/utils"
import OrderClient from "./components/client"

const OrderPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    // we will use prisma to fetch all the billboards created for the specific active store 
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => (
        {
            id: item.id,
            phone: item.phone,
            address: item.address,
            products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
            totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
                return total + Number(item.product.price)
            }, 0)),
            isPaid: item.isPaid,
            // converting createAt into a string (npm i date-fns)
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))



    // Log the data
    console.log("Orders:", orders);
    console.log("Formatted Orders:", formattedOrders);



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default OrderPage