/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Tüm yanıtlarını sadece Türkçe olarak ver. Başka bir dil kullanma. Hikayeler ve açıklamalar tamamen Türkçe olmalı: 5-8 yaş arası çocuklar için açıklamaya dayalı bir hikaye oluşturun, eğitici bir hikaye ve tüm resimler kağıt kesim tarzında olsun: bir erkek ve kız çocuğunun sevgisini anlatan bir hikaye, 5 bölüm olsun. Her bir bölüm için ayrıntılı görsel metin istemi ve hikaye kapağı için, hikaye adını içeren bir görsel istem oluşturun. Tüm bunları JSON formatında alanlar halinde yazın."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"story_cover\": {\n    \"image_prompt\": \"Kağıt kesim tarzında bir erkek ve kız çocuğu el ele tutuşmuş, gülümsüyor, renkli çiçekler ve kalpler ile çevrili. Hikayenin başlığı 'Sevginin Gücü' oyuncu bir yazı tipiyle üstlerinde yazılı.\",\n    \"title\": \"Sevginin Gücü\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"Güneşli Bir Gün\",\n      \"chapter_text\": \"Bir zamanlar, güneş ışığı ve kahkahalarla dolu bir kasabada Can adında bir çocuk yaşarmış. Can'ın kalbi güneş kadar parlak ve arkadaşlarıyla oynamayı çok severmiş. Bir gün, nehir kenarında kum kalesi yaparken gökyüzü kadar mavi gözleri olan Defne adında bir kız görmüş. Defne, bahar meltemi kadar nazikmiş.\",\n      \"image_prompt\": \"Kağıt kesim tarzında Can ve Defne güneşli bir sahilde kum kalesi yapıyor. Can mavi tişört ve kırmızı şort giymiş, Defne sarı elbise giymiş. Kum kalesi renkli deniz kabukları ve küçük kağıt kesim çiçeklerle çevrili.\"\n    },\n    {\n      \"chapter_title\": \"Paylaşılan Gülümseme\",\n      \"chapter_text\": \"Can biraz utangaçtı, ama Defne'nin gülümsemesi o kadar sıcaktı ki utangaçlığı eriyip gitti. Konuşmaya başladılar, en sevdikleri hikayeleri paylaştılar ve birbirlerinin komik şakalarına güldüler. Can, Defne gülümsediğinde kalbinde bir çırpınma hissetti ve ona karşı çok güzel duygular beslemeye başladığını anladı.\",\n      \"image_prompt\": \"Kağıt kesim tarzında Can ve Defne bir bankta oturuyor, gülüyor ve elma sepetini paylaşıyorlar. Can kızarıyor ve Defne'ye bakıyor, Defne kırmızı bir elma tutup ona sıcacık gülümsüyor.\"\n    },\n    {\n      \"chapter_title\": \"Özel Bir Hediye\",\n      \"chapter_text\": \"Bir gün, Can Defne'ye onun kendisi için ne kadar önemli olduğunu göstermeye karar verdi. Bahçesinden en güzel çiçeği, altın kalpli bir ayçiçeğini seçti ve özenle kağıda sarıp küçük bir kutuya yerleştirdi. Defne'nin beğenmesini umarak heyecanlı bir gülümsemeyle ona verdi.\",\n      \"image_prompt\": \"Kağıt kesim tarzında Can kağıt kutu içinde bir ayçiçeğini Defne'ye sunuyor. Defne şaşkın ve duygulanmış, gözleri sevinçle parlıyor. Arka planda renkli çiçeklerle dolu bir çayır ve parlak güneş var.\"\n    },\n    {\n      \"chapter_title\": \"Büyüyen Duygular\",\n      \"chapter_text\": \"Defne ayçiçeğine bayıldı. Can'ın da kendisini sevdiğini anladı ve aralarında özel bir duygu filizlendi. Giderek daha çok vakit geçirmeye başladılar, oyunlar oynadılar, sırlar paylaştılar ve yeni maceralar keşfettiler. En iyi arkadaş oldular ve dostlukları sevgi ve şefkatle doluydu.\",\n      \"image_prompt\": \"Kağıt kesim tarzında Can ve Defne el ele tutuşmuş, çiçek tarlasında yürüyorlar. Mutlulukla gülümsüyorlar ve arka planda güneş batıyor. Etraflarındaki çiçekler pembe, mavi ve sarı tonlarında.\"\n    },\n    {\n      \"chapter_title\": \"Büyüyen Sevgi\",\n      \"chapter_text\": \"Zaman geçtikçe, Can ve Defne'nin birbirlerine olan sevgisi daha da güçlendi. Birbirlerini anlamayı öğrendiler ve her gün yeni bir şey keşfettiler. Onların hikayesi, gerçek dostluğun ve sevginin ne kadar güzel olabileceğini herkese gösterdi.\",\n      \"image_prompt\": \"Kağıt kesim tarzında Can ve Defne bir ağacın altında oturmuş, gökkuşağını izliyorlar. Etraflarında uçuşan kelebekler ve çiçekler var. İkisi de mutlulukla gülümsüyor ve omuz omuza oturuyorlar.\"\n    }\n  ]\n}```"},
          ],
        },
      ],
    });
  
  