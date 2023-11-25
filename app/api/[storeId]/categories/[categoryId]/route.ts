// Here we will target individual stores

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Billboard Id is required", { status: 400 })
        }

        const categories = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true
            }
        });

        return NextResponse.json(categories)

    }
    catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json();

        const { name, billboardId } = body;


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 })
        }


        if (!params.categoryId) {
            return new NextResponse("Billboard Id is required", { status: 400 })
        }


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const categories = await prismadb.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(categories)

    }
    catch (error) {
        console.log('[CATEGORIES_PATCH]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth()


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        if (!params.categoryId) {
            return new NextResponse("category Id is required", { status: 400 })
        }


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const categories = await prismadb.category.delete({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(categories)

    }
    catch (error) {
        console.log('[CATEGORIES_DELETE]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

