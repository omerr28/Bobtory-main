"use client"
import React, { useContext, useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
//@ts-ignore
import uuid4 from "uuid4";
import CustomLoader from './_components/CustomLoader'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '../_context/UserDetailConext'
import { eq } from 'drizzle-orm'
import { Progress } from "@nextui-org/progress";
import { Card } from "@nextui-org/card";
import { motion } from "framer-motion";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string,
  fieldValue: string
}

export interface formDataType {
  storySubject: string,
  storyType: string,
  imageStyle: string,
  ageGroup: string
}

const stepEmojis = ["✏️", "📚", "👶", "🎨"];
const stepTitles = [
  "Hikaye konusu seçin",
  "Hikaye tipini seçin",
  "Yaş grubunu seçin",
  "Resim stilini seçin"
];

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const {user} = useUser();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  const onHandleUserSelection = (data:fieldData) => {
    setFormData((prev:any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue
    }));
  }

  const GenerateStory = async() => {
    if(userDetail.credit <= 0) {
      notifyError('Krediniz bitmiştir, lütfen daha fazla kredi alın!'); 
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT
      ?.replace('{ageGroup}', formData?.ageGroup ?? '')
      .replace('{storyType}', formData?.storyType ?? '')
      .replace('{storySubject}', formData?.storySubject ?? '')
      .replace('{imageStyle}', formData?.imageStyle ?? '');

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text().replace(/(})(,?)(\n *\})/g, "$1,"));
      
      const imageResp = await axios.post('/api/generate-image', {
        prompt: 'Hikaye başlığı:' + story?.story_cover?.title +
        " ile koyu metin ile kitap kapağı, " + story?.story_cover?.image_prompt
      });
      const AiImageUrl = imageResp?.data?.imageUrl;
      
      const imageResult = await axios.post('/api/save-image', {
        url: AiImageUrl
      });

      const FirebaseStorageImageUrl = imageResult.data.imageUrl;
      const resp:any = await SaveInDB(result?.response.text(), FirebaseStorageImageUrl);
      notify("Sihirli hikayeniz hazır! 🌟");
      await UpdateUserCredits();
      router?.replace('/view-story/' + resp[0].storyId);
      setLoading(false);
    } catch(e) {
      console.log(e);
      notifyError('hmm... Bir hata oluştu, lütfen daha sonra tekrar deneyiniz!');
      setLoading(false);
    }
  }

  const SaveInDB = async(output:string, imageUrl:string) => {
    const recordId = uuid4();
    setLoading(true);
    try {
      const result = await db.insert(StoryData).values({
        storyId: recordId,
        ageGroup: formData?.ageGroup,
        imageStyle: formData?.imageStyle,
        storySubject: formData?.storySubject,
        storyType: formData?.storyType,
        output: JSON.parse(output),
        coverImage: imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        userName: user?.fullName
      }).returning({storyId: StoryData?.storyId});
      setLoading(false);
      return result;
    } catch(e) {
      setLoading(false);
    } 
  }

  const UpdateUserCredits = async() => {
    await db.update(Users)
      .set({ credit: Number(userDetail?.credit-1) })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''))
      .returning({id: Users.id});
  }

  const getStepContent = () => {
    switch(currentStep) {
      case 1:
        return <StorySubjectInput userSelection={onHandleUserSelection} />;
      case 2:
        return <StoryType userSelection={onHandleUserSelection} />;
      case 3:
        return <AgeGroup userSelection={onHandleUserSelection} />;
      case 4:
        return <ImageStyle userSelection={onHandleUserSelection} />;
      default:
        return null;
    }
  }

  const canProceed = () => {
    switch(currentStep) {
      case 1:
        return formData?.storySubject;
      case 2:
        return formData?.storyType;
      case 3:
        return formData?.ageGroup;
      case 4:
        return formData?.imageStyle;
      default:
        return false;
    }
  }

  return (
    <div className='min-h-screen bg-[var(--background)] paper-texture overflow-x-hidden'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-8'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-3'>
            {stepEmojis[currentStep - 1]} {stepTitles[currentStep - 1]}
          </h2>
          <p className='text-lg sm:text-xl text-[var(--foreground)] opacity-80 px-4'>
            Step {currentStep} of 4 - Bir sihirli hikaye yaratmaya başlayalım! ✨
          </p>
        </motion.div>

        <div className='mb-6 sm:mb-8'>
          <Progress 
            size="md"
            radius="sm"
            classNames={{
              base: "max-w-md mx-auto",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60"
            }}
            value={(currentStep / 4) * 100}
            showValueLabel={true}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className='p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
            <div className='min-h-[300px] flex items-center justify-center'>
              {getStepContent()}
            </div>
          </Card>
        </motion.div>

        <div className='mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <Button
            color="primary"
            variant="flat"
            className='w-full sm:w-auto px-6 py-3 sm:py-4 text-base sm:text-lg'
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            ← Geri
          </Button>

          {currentStep < 4 ? (
            <Button
              color="primary"
              className='w-full sm:w-auto px-6 py-3 sm:py-4 text-base sm:text-lg 
                bg-[var(--primary-color)] text-white'
              disabled={!canProceed()}
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Sonraki Adım →
            </Button>
          ) : (
            <motion.div 
              className='w-full sm:w-auto text-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                color="primary"
                className='w-full sm:w-auto px-8 py-4 text-lg sm:text-xl 
                  bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)] 
                  transition-colors shadow-lg hover:shadow-xl'
                disabled={loading || !canProceed()}
                onClick={GenerateStory}
              >
                {loading ? '🌟 Sihirli değnek oluşturuyor...' : '✨ Hikayemizi yarat!'}
              </Button>
              <p className='text-sm mt-2 text-[var(--foreground)] opacity-70'>
                1 Kredi kullanılacak ✨
              </p>
            </motion.div>
          )}
        </div>

        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
          >
            <Card className='p-6 text-center'>
              <div className='animate-bounce text-4xl mb-4'>🌟</div>
              <h3 className='text-xl font-bold mb-2'>Hikayenizi Oluşturuyoruz...</h3>
              <p className='text-sm opacity-70'>Lütfen bekleyin, sihirimizi çalıştırıyoruz...</p>
            </Card>
          </motion.div>
        )}
      </div>

      <CustomLoader isLoading={loading} />
    </div>
  )
}

export default CreateStory