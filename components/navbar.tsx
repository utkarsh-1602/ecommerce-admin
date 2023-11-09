import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'

const Navbar = () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <div>
                    This will be a store switcher
                </div>
                <MainNav />
                <div className='ml-auto flex item-center space-x-4'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar