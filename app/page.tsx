import { Button } from "@nextui-org/button";
import Hero from "./components/Hero";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "🔬",
      title: "Bilgilendirici Hikayeler",
      description: "Bilimin tadını çıkarın aynı zamanda bilginize bilgi katın!"
    },
    {
      icon: "📖",
      title: "Macera hikayeleri",  
      description: "Çocuğunuzun hayal gücünü maceralarıyla test edin"
    },
    {
      icon: "🚀",
      title: "Eğitici hikayeler",
      description: "Öğrenmeyi eğlenceli hale getiren eğitimsel hikayeler"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] paper-texture">
      <Hero />
      
      <section className="px-4 md:px-20 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-12 animate-bounce">
          
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 hover:animate-wiggle"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                {feature.title}
              </h3>
              <p className="text-[var(--foreground)] opacity-70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--background-secondary)] py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--secondary-color)] mb-8">
            Hikayelerinizi başlatın!
          </h2>
          <p className="text-xl text-[var(--foreground)] mb-12 max-w-2xl mx-auto">
            Hikayelerinizi oluşturmak için AI'yı kullanın!
          </p>
          <Link href="/create-story">
            <Button 
              size="lg" 
              className="bg-[var(--primary-color)] text-white text-xl px-10 py-6 
              hover:bg-[var(--secondary-color)] transition-colors duration-300 
              animate-bounce"
            >
              Hikayenizi Oluşturun
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
