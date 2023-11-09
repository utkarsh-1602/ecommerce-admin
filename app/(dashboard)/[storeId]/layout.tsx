import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs"

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        storeId: string
    }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    // if userId is present, load the first store 
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    });

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}