import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Clothing from './components/clothing.jsx';
import Grooming from './components/grooming.jsx';
import Main from './components/Main.jsx';
import Party from './components/party.jsx';
import Formal from './components/formal.jsx';
import Date from './components/date.jsx';
import Family from './components/family.jsx';
import BeardForm from './components/BeardForm.jsx';
import HairForm from './components/HairForm.jsx';
import FormalBeardForm from './components/FormalBeardForm.jsx';
import FormalHairForm from './components/FormalHairForm.jsx';
import DateBeardForm from './components/DateBeardForm.jsx';
import DateHairForm from './components/DateHairForm.jsx';
import FamilyBeardForm from './components/FamilyBeardForm.jsx';
import FamilyHairForm from './components/FamilyHairForm.jsx';

import Result from './components/Result.jsx';
import Explore from './components/Explore.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import LikedCollection from './components/LikedCollection.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Settings from './components/Settings.jsx';
import BusinessPage from './components/BusinessPage.jsx';
import NewUpload from './components/NewUpload.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ProductAnalytics from './components/ProductAnalytics.jsx';

import ClothingParty from './components/clothing/ClothingParty';
import ClothingFormal from './components/clothing/ClothingFormal';
import ClothingDate from './components/clothing/ClothingDate';
import ClothingFamily from './components/clothing/ClothingFamily';
import AccessoriesForm from './components/clothing/AccessoriesForm';
import FragranceForm from './components/clothing/FragranceForm';
import DressesForm from './components/clothing/DressesForm';
import WatchForm from './components/clothing/WatchForm';
import FootwearForm from './components/clothing/FootwearForm';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'clothing',
        element: <ProtectedRoute><Clothing /></ProtectedRoute>,
      },
      {
        path: 'grooming',
        element: <ProtectedRoute><Grooming /></ProtectedRoute>,
      
      },
      {
        path: 'grooming/party',
        element: <Party />,

      },
      
      {
        path: 'grooming/formal',
        element: <Formal />,

      },
      {
        path: 'grooming/date',
        element: <Date />,

      },
      {
        path: 'grooming/family',
        element: <Family />,
      },

      {
        path: 'grooming/party/BeardForm',
        element: <BeardForm />,
      },
      {
        path: 'grooming/party/HairForm',
        element: <HairForm />,
      }, 
      {
        path: 'grooming/formal/BeardForm',
        element: <FormalBeardForm />,
      },
      {
        path: 'grooming/formal/HairForm',
        element: <FormalHairForm />,
      },
      {
        path: 'grooming/date/BeardForm',
        element: <DateBeardForm />,
      },
      {
        path: 'grooming/date/HairForm',
        element: <DateHairForm />,
      },
      {
        path: 'grooming/family/BeardForm',
        element: <FamilyBeardForm />,
      },
      {
        path: 'grooming/family/HairForm',
        element: <FamilyHairForm />,
      },
      
      { path: 'clothing/party', 
        element: <ProtectedRoute><ClothingParty /></ProtectedRoute> },
      { path: 'clothing/formal', 
        element: <ProtectedRoute><ClothingFormal /></ProtectedRoute> },
      { path: 'clothing/date', 
        element: <ProtectedRoute><ClothingDate /></ProtectedRoute> },
      { path: 'clothing/family', 
        element: <ProtectedRoute><ClothingFamily /></ProtectedRoute> },

      { path: 'clothing/party/accessories', 
        element: <ProtectedRoute><AccessoriesForm occasion="party" /></ProtectedRoute> },
      { path: 'clothing/party/fragrance', 
        element: <ProtectedRoute><FragranceForm occasion="party" /></ProtectedRoute> },
      { path: 'clothing/party/dresses', 
        element: <ProtectedRoute><DressesForm occasion="party" /></ProtectedRoute> },
      { path: 'clothing/party/watches', 
        element: <ProtectedRoute><WatchForm occasion="party" /></ProtectedRoute> },
      { path: 'clothing/party/footwears', 
        element: <ProtectedRoute><FootwearForm occasion="party" /></ProtectedRoute> },

      { path: 'clothing/formal/accessories', 
        element: <ProtectedRoute><AccessoriesForm occasion="formal" /></ProtectedRoute> },
      { path: 'clothing/formal/fragrance', 
        element: <ProtectedRoute><FragranceForm occasion="formal" /></ProtectedRoute> },
      { path: 'clothing/formal/dresses', 
        element: <ProtectedRoute><DressesForm occasion="formal" /></ProtectedRoute> },
      { path: 'clothing/formal/watches', 
        element: <ProtectedRoute><WatchForm occasion="formal" /></ProtectedRoute> },
      { path: 'clothing/formal/footwears', 
        element: <ProtectedRoute><FootwearForm occasion="formal" /></ProtectedRoute> },

      { path: 'clothing/date/accessories', 
        element: <ProtectedRoute><AccessoriesForm occasion="date" /></ProtectedRoute> },
      { path: 'clothing/date/fragrance', 
        element: <ProtectedRoute><FragranceForm occasion="date" /></ProtectedRoute> },
      { path: 'clothing/date/dresses', 
        element: <ProtectedRoute><DressesForm occasion="date" /></ProtectedRoute> },
      { path: 'clothing/date/watches', 
        element: <ProtectedRoute><WatchForm occasion="date" /></ProtectedRoute> },
      { path: 'clothing/date/footwears', 
        element: <ProtectedRoute><FootwearForm occasion="date" /></ProtectedRoute> },

      { path: 'clothing/family/accessories', 
        element: <ProtectedRoute><AccessoriesForm occasion="family" /></ProtectedRoute> },
      { path: 'clothing/family/fragrance', 
        element: <ProtectedRoute><FragranceForm occasion="family" /></ProtectedRoute> },
      { path: 'clothing/family/dresses', 
        element: <ProtectedRoute><DressesForm occasion="family" /></ProtectedRoute> },
      { path: 'clothing/family/watches', 
        element: <ProtectedRoute><WatchForm occasion="family" /></ProtectedRoute> },
      { path: 'clothing/family/footwears', 
        element: <ProtectedRoute><FootwearForm occasion="family" /></ProtectedRoute> },


 
      { path: 'results/:combination', 
        element: <Result /> 
      },
      { path: 'explore', 
        element: <ProtectedRoute><Explore /></ProtectedRoute> 
      },
      { path: 'login', 
        element: <Login /> 
      },
      { path: 'signup', 
        element: <Signup /> 
      },
      { path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: 'profile/liked',
        element: <ProtectedRoute><LikedCollection /></ProtectedRoute>
      },
      {
        path: 'settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>
      },
      {
        path: 'business/:creatorId',
        element: <ProtectedRoute><BusinessPage /></ProtectedRoute>
      },
      {
        path: 'new-upload',
        element: <ProtectedRoute><NewUpload /></ProtectedRoute>
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'analytics/:uploadId',
        element: <ProtectedRoute><ProductAnalytics /></ProtectedRoute>
      },
                        
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);