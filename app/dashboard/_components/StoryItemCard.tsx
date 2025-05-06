import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { storage } from '@/config/firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';

type StoryItemType = {
    story: {
        id: number;
        storyId: string | null;
        storyType: string | null;
        ageGroup: string | null;
        coverImage: string | null;
        imageStyle: string | null;
        userEmail: string | null;
        userImage: string | null;
        userName: string | null;
        output: any | null;
        storySubject: string | null;
    };
    onDelete?: () => void;
}

function StoryItemCard({story, onDelete}: StoryItemType) {
    const router = useRouter();

    const deleteFromStorage = async (imageUrl: string) => {
        try {
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting image from storage:', error);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        try {
            e.preventDefault(); // Prevent navigation
            if (confirm('Bu hikayeyi silmek istediğinizden emin misiniz?')) {
                await db.delete(StoryData)
                    .where(eq(StoryData.id, story.id));

                if (story.coverImage) {
                    await deleteFromStorage(story.coverImage);
                }

                if (story.output?.story_pages) {
                    for (const page of story.output.story_pages) {
                        if (page.imageUrl) {
                            await deleteFromStorage(page.imageUrl);
                        }
                    }
                }
                
                onDelete?.();
                
                router.refresh();
            }
        } catch (error) {
            console.error('Hikaye silinirken hata oluştu:', error);
            alert('Hikaye silinemedi');
        }
    };

    return (
        <Link href={'/view-story/'+story?.storyId}>
            <Card 
                isFooterBlurred 
                className="w-full h-[300px] col-span-12 sm:col-span-5
                hover:scale-105 transition-all cursor-pointer relative group"
            >
                <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 
                    transition-all duration-300 hover:scale-125"
                    onClick={handleDelete}
                >
                    ×
                </Button>
                
                <Image
                    alt="Kart örnek arka plan"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={story?.coverImage || '/placeholder-image.jpg'} 
                    width={500}
                    height={500}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-xl">
                            {story?.output?.story_cover?.title}
                        </p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Şimdi Oku
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default StoryItemCard