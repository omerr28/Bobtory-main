"use client"
import React from 'react'
import Link from 'next/link'
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure 
} from "@nextui-org/react"
import { 
  FaHome, 
  FaBook, 
  FaSearch, 
  FaUser 
} from 'react-icons/fa'
import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const MobileNav: React.FC = () => {
  const { user, isSignedIn } = useUser()
  const pathname = usePathname()

  const MenuList = [
    { name: 'Ana Sayfa', path: '/', icon: <FaHome className="text-2xl" /> },
    { name: 'Hikaye Oluştur', path: '/create-story', icon: <FaBook className="text-2xl" /> },
    { name: 'Keşfet', path: '/explore', icon: <FaSearch className="text-2xl" /> },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-[var(--primary-color)]/20 w-full">
        <div className="flex justify-around items-center p-3">
          {MenuList.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 
                ${pathname === item.path 
                  ? 'text-[var(--primary-color)] scale-110 -translate-y-1' 
                  : 'text-gray-500 hover:text-[var(--primary-color)] hover:scale-105'}`}
            >
              <div className="p-2 rounded-xl bg-white/80 shadow-sm">
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileNav 