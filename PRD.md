# Product Requirements Document (PRD) for JoyStory  - AI-Powered Children's Story Generator

## 1. Product Overview
JoyStory is an innovative AI-powered platform that enables users to create personalized, engaging children's stories with custom illustrations in minutes.

## 2. Problem Statement
- Parents and educators struggle to find time to create unique, engaging stories for children
- Traditional storytelling methods can become repetitive
- Children need diverse, personalized content to maintain reading interest

## 3. Target Audience
- Parents
- Educators
- Caregivers
- Children aged 0-8 years

## 4. Key Features

### 4.1 Story Generation
- Custom story creation based on user-defined parameters:
  - Story Subject
  - Story Type (Story Book, Bed Story, Educational)
  - Age Group (0-2, 3-5, 5-8 years)
  - Image Style (3D Cartoon, Paper Cut, Water Color, Pixel Style)

### 4.2 AI-Powered Content Generation
- Utilizes Google's Generative AI (Gemini) to create coherent, age-appropriate stories
- Generates JSON-structured stories with multiple chapters

### 4.3 Image Generation
- AI-generated cover images and illustrations
- Multiple image styles to choose from
- Uses Replicate's image generation API

### 4.4 User Management
- User authentication via Clerk
- Credit-based system for story generation
- Dashboard to view and manage generated stories

### 4.5 Additional Features
- Text-to-speech for story chapters
- Story sharing capabilities
- Ability to purchase additional credits

## 5. Technical Architecture
- Frontend: Next.js 14 with TypeScript
- Backend: Serverless functions
- Database: Neon PostgreSQL with Drizzle ORM
- Authentication: Clerk
- AI Services:
  - Story Generation: Google Generative AI
  - Image Generation: Replicate
- Storage: Firebase Storage
- Payment: PayPal integration in the future

## 6. User Journey

### 6.1 New User Flow
1. Sign up/Sign in
2. Receive initial 3 free credits
3. Navigate to story creation page
4. Select story parameters
5. Generate story
6. View and interact with generated story

### 6.2 Returning User Flow
1. Log in
2. View dashboard
3. Browse previously created stories
4. Create new stories
5. Purchase additional credits if needed

## 7. Monetization Strategy
- Freemium model with 3 initial free credits
- Credit packages:
  - 10 credits for $1.99
  - 30 credits for $2.99
  - 75 credits for $5.99
  - 150 credits for $9.99

## 8. Technical Constraints
- Story generation time: < 30 seconds
- Image generation time: < 15 seconds
- Supported browsers: Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop

## 9. Future Roadmap
- Multiple language support
- Advanced story customization
- Printable story books
- Collaborative story creation
- Parental control features

## 10. Success Metrics
- User Acquisition
- Story Generation Rate
- User Retention
- Credit Purchase Conversion
- User Satisfaction Ratings

## 11. Privacy and Compliance
- COPPA (Children's Online Privacy Protection Act) compliance
- Data protection for user-generated content
- Age-appropriate content filtering

## 12. Risks and Mitigation
- AI content quality: Continuous model training and refinement
- Performance: Optimize AI and image generation APIs
- User experience: Regular UX testing and iteration

## 13. Technical Specifications

### 13.1 Frontend Technologies
- Framework: Next.js 14
- Language: TypeScript
- UI Library: NextUI
- State Management: React Context
- Authentication: Clerk
- Font: Nunito

### 13.2 Backend Technologies
- Database: Neon PostgreSQL
- ORM: Drizzle
- API Routes: Next.js Serverless Functions
- Image Storage: Firebase Storage

### 13.3 AI Integration
- Story Generation: Google Generative AI (Gemini)
- Image Generation: Replicate (Flux Schnell Model)

### 13.4 External Services
- Authentication: Clerk
- Payments: PayPal, Stripe in the future
- Analytics: Firebase Analytics

## 14. Development Environment
- Node.js version: 18+
- Package Manager: npm/yarn
- Development Tools:
  - ESLint
  - Prettier
  - TypeScript
  - Drizzle Kit

## 15. Deployment Strategy
- Platform: Vercel
- Continuous Integration: GitHub Actions
- Environment Variables Management
- Automatic Deployments on Push

## 16. Performance Optimization
- Server-Side Rendering (SSR)
- Image Optimization
- Lazy Loading
- Caching Strategies

## 17. Accessibility Considerations
- WCAG 2.1 Compliance
- Screen Reader Support
- High Contrast Mode
- Keyboard Navigation

## 18. Internationalization (Future)
- Multi-language Support
- Right-to-Left (RTL) Language Handling
- Locale-based Content Adaptation

## 19. Current File Structure

To get file structure you can use `tree -L 2 -I 'node_modules|.next|.git'` 
.
├── PRD.md
├── README.md
├── app
│   ├── (auth)
│   ├── _components
│   ├── _context
│   ├── api
│   ├── buy-credits
│   ├── create-story
│   ├── dashboard
│   ├── explore
│   ├── favicon.ico
│   ├── fonts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── provider.tsx
│   └── view-story
├── config
│   ├── GeminiAi.tsx
│   ├── db.tsx
│   ├── firebaseConfig.tsx
│   └── schema.tsx
├── drizzle.config.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── 02Years.png
│   ├── 35Years.png
│   ├── 3D.png
│   ├── 58Years.png
│   ├── bedstory.png
│   ├── coin.png
│   ├── educational.png
│   ├── hero.png
│   ├── loader.gif
│   ├── login.png
│   ├── logo.svg
│   ├── paperCut.png
│   ├── pixel.png
│   ├── story.png
│   └── watercolor.png
├── tailwind.config.ts
└── tsconfig.json


## Feedbacks

- Benay: 
    - (Öncelik düşük)Türkçe dil bilgisi iyleşleştirebilir --> update prompt
    - (Öncelik düşük) Hikaye uznuluğu kişiseleştirilebilir.
    - (Öncelik orta) Hikaye okuma ksımı tamamen iyileştirilebilir. --> Flipbook page style otimizeed for mobile and desktop
    - (Öncelik yüksek) Hikayenin sonuna bir buton eklenerek, hikayenin beğeip beğenmediği anket sorusu yapılabilir. --> Bu data da veritabanına kaydedilebilir. ve keşfet sayfasına yansıtılabilir.
    - (Öncelik yüksek) Hikayede birden fazla görsel olması gerekiyor. 
    - Yaşlara göre hikayelerin uzuluğu karmaşıklığı artırılabilir.
    - (Öncelik orta) Hikayelerde her bölüm için başlık olamaması gerekiyor. 

