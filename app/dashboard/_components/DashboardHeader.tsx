"use client"
import { UserDetailContext } from '@/app/_context/UserDetailConext'
import { Button } from '@nextui-org/button';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-primary p-4 text-white shadow-lg transition-all sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hikayelerim</h2>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Image
              src="/coin.png"
              alt="credit coins"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 2rem, 2.5rem"
              priority
            />
          </div>
          <span className="text-lg font-medium sm:text-xl">
            {userDetail?.credit || 0} Krediniz mevcut
          </span>
        </div>
        
        <Link href="/buy-credits" className="ml-auto sm:ml-0">
          <Button
            className="bg-white/10 font-medium text-white backdrop-blur-sm hover:bg-white/20"
            size="sm"
            radius="full"
          >
            Kredi satın al
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default DashboardHeader