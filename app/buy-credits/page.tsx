"use client"
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailConext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import { FaWhatsapp } from 'react-icons/fa';

function BuyCredits() {
    const EXCHANGE_RATE = 35; // 1 USD = 35 TL
    const Options = [
        {
            id: 1,
            priceUSD: 1.99,
            priceTRY: Math.round(1.99 * EXCHANGE_RATE),
            credits: 10
        },
        {
            id: 2,
            priceUSD: 2.99,
            priceTRY: Math.round(2.99 * EXCHANGE_RATE),
            credits: 30
        },
        {
            id: 3,
            priceUSD: 5.99,
            priceTRY: Math.round(5.99 * EXCHANGE_RATE),
            credits: 75
        },
        {
            id: 4,
            priceUSD: 9.99,
            priceTRY: Math.round(9.99 * EXCHANGE_RATE),
            credits: 150
        },
    ]
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const notify = (msg: string) => toast(msg);
    const notifyError = (msg: string) => toast.error(msg);

    useEffect(() => {
        if (selectedOption != 0) {
            const price = Options[selectedOption - 1].priceUSD;
            setSelectedPrice(price)
        }
    }, [selectedOption])

    const OnPaymentSuccess = async () => {
        const result = await db.update(Users)
            .set({
                credit: Options[selectedOption - 1]?.credits + userDetail?.credit
            }).where(eq(Users.userEmail, userDetail.userEmail));
        
        if (result) {
            notify("Kredi başarıyla eklendi");
            setUserDetail((prev: any) => ({
                ...prev,
                ['credit']: Options[selectedOption - 1]?.credits + userDetail?.credit
            }))
            router.replace('/dashboard');
        } else {
            notifyError('Sunucu hatası')
        }
    }

    const handleWhatsAppContact = () => {
        const message = encodeURIComponent("Merhaba, kredi satın alma hakkında bilgi almak istiyorum.");
        window.open(`https://wa.me/+905349625225?text=${message}`, '_blank');
    }

    const handleBetaUserJoin = () => {
        window.open('https://chat.whatsapp.com/Lv2FcEbckxl8m7cOUw9FHh', '_blank');
    }

    const addBetaUserCredits = async () => {
        try {
            const result = await db.update(Users)
                .set({
                    credit: (userDetail?.credit || 0) + 10
                }).where(eq(Users.userEmail, userDetail.userEmail));
            
            if (result) {
                notify("Beta kullanıcısı olarak 10 kredi kazandınız! 🎉");
                setUserDetail((prev: any) => ({
                    ...prev,
                    ['credit']: (prev.credit || 0) + 10
                }));
            } else {
                notifyError('Kredi eklenirken bir hata oluştu')
            }
        } catch (error) {
            console.error('Error adding beta user credits:', error);
            notifyError('Bir hata oluştu')
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white shadow-2xl rounded-2xl overflow-hidden'>
                    <div className='p-6 sm:p-10 bg-gradient-to-r from-primary to-blue-600'>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-white text-center'>
                            Hikaye Kredisi Satın Al
                        </h2>
                        <p className='text-center text-white/80 mt-3 max-w-xl mx-auto'>
                            Hayal gücünüzü sınırsız kılacak kredileri şimdi satın alın
                        </p>
                    </div>
                    
                    <div className='grid md:grid-cols-2 gap-8 p-6 sm:p-10'>
                        <div className='space-y-6'>
                            {Options.map((option) => (
                                <div 
                                    key={option.id}
                                    className={`
                                        p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 
                                        ${selectedOption === option.id 
                                            ? 'border-primary bg-primary/10 scale-105 shadow-xl' 
                                            : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'}
                                    `}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <h3 className='text-xl font-bold text-primary'>
                                                {option.credits} Kredi
                                            </h3>
                                            <p className='text-sm text-gray-500'>
                                                {option.credits} Hikaye Oluşturma
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-2xl font-extrabold text-primary'>
                                                {option.priceTRY} ₺
                                            </p>
                                            <p className='text-xs text-gray-500'>
                                                (${option.priceUSD})
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className='space-y-6'>
                            {selectedPrice > 0 && (
                                <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-md'>
                                    <PayPalButtons 
                                        style={{ 
                                            layout: "vertical",
                                            color: "blue",
                                            shape: "rect"
                                        }}
                                        disabled={!selectedOption || selectedOption === 0}
                                        onApprove={() => OnPaymentSuccess()}
                                        onCancel={() => notifyError('Ödeme iptal edildi')}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                intent: "CAPTURE",
                                                purchase_units: [{
                                                    amount: {
                                                        value: selectedPrice.toFixed(2),
                                                        currency_code: 'USD'
                                                    }
                                                }]
                                            })
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className='bg-green-50 border border-green-200 rounded-xl p-6 shadow-md'>
                                <h3 className='text-xl font-bold text-green-700 mb-4'>
                                    🚀 Beta Kullanıcısı Ol, 10 Kredi Kazan!
                                </h3>
                                <p className='text-sm text-green-600 mb-4'>
                                    WhatsApp grubumuza katılın ve ücretsiz 10 kredi kazanın. 
                                    Erken dönem kullanıcıları için özel fırsat!
                                </p>
                                <div className='flex space-x-4'>
                                    <Button 
                                        color="success" 
                                        variant="solid" 
                                        startContent={<FaWhatsapp className='text-xl' />}
                                        className='w-full py-3 text-base'
                                        onClick={handleWhatsAppContact}
                                    >
                                        WhatsApp Grubu
                                    </Button>
                                </div>
                            </div>
                            
                            <Button 
                                color="success" 
                                variant="solid" 
                                startContent={<FaWhatsapp className='text-xl' />}
                                className='w-full py-3 text-base'
                                onClick={handleWhatsAppContact}
                            >
                                Satın almak için iletişime geçin
                            </Button>
                            
                            <div className='text-center text-sm text-gray-500 mt-4'>
                                <p>Satın alımlarınız anında hesabınıza yansır</p>
                                <p className='mt-2 flex items-center justify-center gap-2'>
                                    <span>🔒</span> Güvenli Ödeme
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyCredits