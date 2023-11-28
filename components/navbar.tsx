import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'


import prismadb from '@/lib/prismadb'
import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { ThemeToggle } from './theme-toggle'

const Navbar = async () => {

    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId: userId
        }
    })

    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <StoreSwitcher items={stores} />
                <MainNav />
                <div className='ml-auto flex item-center space-x-4'>
                    <ThemeToggle />
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar