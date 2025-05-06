"use client"
import React from 'react'
import Link from 'next/link'
import { FaGithub, FaLink, FaLinkedin } from 'react-icons/fa'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--background)] shadow-sm py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link 
            href="https://linktr.ee/Bobtory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
          >
            <FaLink size={24} />
          </Link>
        </div>
        <p className="text-sm text-[var(--foreground)]">
          Developed by Berat Çolak & Ömer Faruk Yalçın & <br></br> Ahmet Buğra Özyıldırım
        </p>
        <p className="text-xs text-[var(--foreground)] mt-2">
          © {currentYear} Bobtory. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}

export default Footer 