import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

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
            <div>This will be a Navbar</div>
            {children}
        </>
    )
}