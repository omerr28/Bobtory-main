"use client"
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FaWhatsapp, FaEnvelope, FaPhone, FaTelegram } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '+905349625225',
        message: ''
    });

    const contactMethods = [
        {
            icon: <FaWhatsapp className='text-3xl text-green-500' />,
            label: 'WhatsApp',
            value: '+905349625225',
            action: () => {
                const message = encodeURIComponent("Merhaba, size destek almak için iletişime geçiyorum.");
                window.open(`https://wa.me/${formData.phone}?text=${message}`, '_blank');
            }
        },
        {
            icon: <FaEnvelope className='text-3xl text-blue-500' />,
            label: 'E-posta',
            value: 'support@joystory.ai',
            action: () => window.location.href = 'mailto:eshagh@fennaver.com'
        },
        {
            icon: <FaPhone className='text-3xl text-primary' />,
            label: 'Telefon',
            value: '+905349625225',
            action: () => window.location.href = 'tel:+905349625225'
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Updated validation to include phone
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            toast.error('Lütfen tüm alanları doldurunuz');
            return;
        }

        // TODO: Implement actual form submission logic
        toast.success('Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.');
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '+905349625225',
            message: ''
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden'>
                <div className='p-6 sm:p-10 bg-gradient-to-r from-primary to-blue-600'>
                    <h2 className='text-3xl sm:text-4xl font-extrabold text-white text-center'>
                        Bize Ulaşın
                    </h2>
                    <p className='text-center text-white/80 mt-3 max-w-xl mx-auto'>
                        Herhangi bir sorunuz veya geri bildiriminiz mi var? Bize hemen ulaşın!
                    </p>
                </div>

                <div className='grid md:grid-cols-2 gap-8 p-6 sm:p-10'>
                    {/* Contact Methods */}
                    <div className='space-y-6'>
                        <h3 className='text-2xl font-bold text-primary mb-4'>
                            İletişim Kanallarımız
                        </h3>
                        {contactMethods.map((method, index) => (
                            <div 
                                key={index} 
                                className='flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-primary/5 transition-colors'
                            >
                                <div className='flex items-center space-x-4'>
                                    {method.icon}
                                    <div>
                                        <h4 className='font-semibold text-gray-800'>{method.label}</h4>
                                        <p className='text-sm text-gray-500'>{method.value}</p>
                                    </div>
                                </div>
                                <Button 
                                    size='sm' 
                                    color='primary' 
                                    variant='light'
                                    onClick={method.action}
                                >
                                    Bağlan
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className='text-2xl font-bold text-primary mb-4'>
                            Mesaj Gönder
                        </h3>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                    Ad Soyad
                                </label>
                                <input 
                                    type='text' 
                                    name='name' 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50'
                                    placeholder='Adınızı girin'
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                    E-posta
                                </label>
                                <input 
                                    type='email' 
                                    name='email' 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50'
                                    placeholder='E-posta adresinizi girin'
                                />
                            </div>
                            <div>
                                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                    Telefon Numarası
                                </label>
                                <input 
                                    type='tel' 
                                    name='phone' 
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50'
                                    placeholder='Telefon numaranızı girin'
                                />
                            </div>
                            <div>
                                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                                    Mesaj
                                </label>
                                <textarea 
                                    name='message' 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50'
                                    placeholder='Mesajınızı yazın'
                                />
                            </div>
                            <Button 
                                type='submit' 
                                color='primary' 
                                className='w-full'
                            >
                                Mesajı Gönder
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs; 