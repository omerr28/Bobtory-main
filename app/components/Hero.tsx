import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className='px-4 md:px-10 lg:px-20 py-10 min-h-screen flex items-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        <div className='text-center md:text-left space-y-6'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary-color)] leading-tight'>
            Çocuklarınız için Sihirli Hikayeler Oluşturun
          </h2>
          <p className='text-lg md:text-xl text-[var(--foreground)] font-medium opacity-80'>
            Çocuklarınız için kişiselleştirilmiş, ilgi çekici hikayeler oluşturun!
          </p>
          <Link href='/create-story' className='block'>
            <Button 
              size='lg' 
              color='primary' 
              className='w-full md:w-auto text-lg md:text-xl font-bold px-8 py-6 
              bg-[var(--primary-color)] text-white 
              hover:bg-[var(--secondary-color)] transition-colors duration-300'
            >
              Hikaye Oluştur
            </Button>
          </Link>
        </div>
        <div className='flex justify-center items-center'>
          <Image 
            src='/hero.png' 
            alt='Magical Storytelling' 
            width={600} 
            height={400} 
            className='max-w-full h-auto object-contain rounded-xl shadow-lg'
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Hero