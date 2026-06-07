# GWM — Grooming With Men
> Your personal men's grooming and lifestyle guide

## Live Demo
[Live Demo](INSERT_VERCEL_LINK_HERE)

## Screenshots
Screenshots coming soon

## About The Project
GWM is a men's lifestyle platform that helps users discover grooming styles and clothing recommendations based on their personal attributes. Creators can upload looks and products, users can explore, like, and find their perfect style.

## Features
**GROOMING:**
- Beard and Hair recommendation engine
- 4 occasions: Party, Formal, Date, Family
- Form-based combination system
- Result page with Firestore-powered uploads

**CLOTHING:**
- 5 sections: Accessories, Fragrance, Dresses, Watches, Footwears
- Attribute-based forms (skin tone, body type, height, season, wrist size)
- Same 4 occasions as grooming

**CREATOR SYSTEM:**
- Business account conversion
- Upload products with multi-select tagging
- Automatic routing to correct Result pages
- Product Analytics (views, likes, clicks)

**USER FEATURES:**
- Firebase Authentication (Email/Password + Google)
- Like products → saved to Firestore
- Liked Collection in Profile
- Explore page with search + filters + infinite scroll

## Tech Stack
- React 18 + Vite
- React Router v6 (createBrowserRouter)
- Firebase (Auth + Firestore)
- Cloudinary (image uploads)
- React Select (custom dropdowns)
- CSS Modules (modular architecture)

## Project Structure
```text
src/
├── assets/          → images, videos
├── components/      → all React components
│   ├── clothing/    → 5 clothing forms + 4 occasion pages
│   └── layout/      → Navbar, Footer, ProfilePopup, InfoButton
├── context/         → AuthContext
├── data/            → centralized data (formOptions, recommendations)
├── firebase/        → Firebase config
├── styles/          → modular CSS architecture
└── utils/           → Cloudinary upload utility
```

## Getting Started
Prerequisites: Node.js 18+

Clone the repo:
```bash
git clone https://github.com/YOUR_USERNAME/gwm.git
cd gwm
```

Install dependencies:
```bash
npm install
```

Create .env file:
```bash
cp .env.example .env
```
(Fill in your Firebase and Cloudinary credentials)

Run development server:
```bash
npm run dev
```

## Environment Variables
- `VITE_FIREBASE_API_KEY`: Firebase project API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID`: Firebase measurement/analytics ID
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary account cloud name for image uploads
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary unsigned upload preset name

## Deployment
Deployed on Vercel.
Add environment variables in Vercel dashboard under Project Settings → Environment Variables.

## Author
**Aaryan**  
Information Science Engineering Student  
DSATM Bengaluru  
AWS Cloud Practitioner  
LinkedIn: [www.linkedin.com/in/aaryan5]  
GitHub: [Add your link]

## License
MIT License
