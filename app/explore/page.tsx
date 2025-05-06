"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from '../dashboard/_components/StoryItemCard'
import { Button } from '@nextui-org/button'
import CustomLoader from '../create-story/_components/CustomLoader'

// Define the type for story items
type Story = {
    id: number;
    storyId: string;
    storyType: string;
    ageGroup: string;
    coverImage: string;
    imageStyle: string;
    userEmail: string;
    userImage: string;
    userName: string;
    output: any;
    storySubject: string;
}

function ExploreMore() {
    const [offset,setOffset]=useState(0);
    const [storyList,setStoryList]=useState<Story[]>([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        GetAllStories(0);
    },[])

    const GetAllStories=async(offset:number)=>{
        try {
            setLoading(true);
            setOffset(offset);
            
            const result = await db.select()
                .from(StoryData)
                .orderBy(desc(StoryData.id))
                .limit(8)
                .offset(offset);
            
            const convertedResults = result.map(item => ({
                id: item.id,
                storyId: item.storyId || '',
                storyType: item.storyType || '',
                ageGroup: item.ageGroup || '',
                coverImage: item.coverImage || '',
                imageStyle: item.imageStyle || '',
                userEmail: item.userEmail || '',
                userImage: item.userImage || '',
                userName: item.userName || '',
                output: item.output || {},
                storySubject: item.storySubject || ''
            }));
            
            if (offset === 0) {
                setStoryList(convertedResults);
            } else {
                setStoryList((prev) => [...prev, ...convertedResults]);
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    }

    const refreshStories = () => {
        setOffset(0);
        GetAllStories(0);
    };

    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40'>
            <h2 className='font-bold text-4xl text-primary text-center'>Hikayeleri Keşfet</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-4 mt-10
            gap-10'>
                {storyList.length>0&&storyList?.map((item)=>(
                    <StoryItemCard 
                        key={item.id} 
                        story={item}
                        onDelete={refreshStories} 
                    />
                ))}
            </div>
            <div className='text-center mt-10'>
                <Button 
                    className='' 
                    color='primary' 
                    onClick={()=>GetAllStories(offset+8)}
                >
                    Daha Fazla Yükle
                </Button>
            </div>
            <CustomLoader isLoading={loading} />
        </div>
    )
}

export default ExploreMore