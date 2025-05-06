"use client"
import React, { useState } from 'react'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

const Header: React.FC = () => {
    const { user, isSignedIn } = useUser();
    const MenuList = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Hikaye Oluştur', path: '/create-story' },
        { name: 'Hikayeleri Keşfet', path: '/explore' },
        { name: 'Bize Ulaşın', path: '/contact-us' }
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar 
            maxWidth='full' 
            onMenuOpenChange={setIsMenuOpen}
            className='bg-[var(--background)] shadow-sm'
            isBordered={false}
        >
            <NavbarContent className='flex items-center'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className='sm:hidden text-[var(--primary-color)]'
                />
                <NavbarBrand className='flex items-center space-x-2'>
                    <Link href="/">
                        <Image 
                            src='/logo.svg' 
                            alt='logo' 
                            width={40} 
                            height={40} 
                            className='rounded-full'
                        />
                    </Link>
                    <h2 className='font-bold text-xl text-[var(--primary-color)]'>JoyStory</h2>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify='center' className='hidden sm:flex'>
                {MenuList.map((item) => (
                    <NavbarItem 
                        key={item.path} 
                        className='text-lg text-[var(--foreground)] font-medium 
                        hover:text-[var(--primary-color)] transition-colors'
                    >
                        <Link href={item.path} className='px-3'>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify='end' className='space-x-2'>
                <Link href='/dashboard'>
                    <Button 
                        color='primary' 
                        className='bg-[var(--primary-color)] text-white 
                        hover:bg-[var(--secondary-color)] transition-colors'
                    >
                        {isSignedIn ? 'Hikayelerim' : 'Giriş'}
                    </Button>
                </Link>
                <UserButton afterSignOutUrl='/' />
            </NavbarContent>

            <NavbarMenu className='bg-[var(--background)] pt-10'>
                {MenuList.map((item) => (
                    <NavbarMenuItem 
                        key={item.path} 
                        className='py-2 border-b border-[var(--primary-color)]'
                    >
                        <Link 
                            href={item.path} 
                            className='text-xl text-[var(--foreground)] 
                            hover:text-[var(--primary-color)] transition-colors'
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default Header