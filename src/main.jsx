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
import HairPreview from './components/Hair-info-hairType.jsx';
import HairfallPreview from './components/Hair-info-hairFallType.jsx';

import FacePreview from './components/Beard-info-faceShape.jsx';
import BeardPreview from './components/Beard-info-BreadType.jsx';
import Result from './components/Result.jsx';

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
        element: <Clothing />,
      },
      {
        path: 'grooming',
        element: <Grooming />,
      
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
        children:[
          { path: "face", element: <FacePreview /> },
          { path: "beard", element: <BeardPreview /> },
          
        ],

      },
      {
        path: 'grooming/party/HairForm',
        element: <HairForm />,
        children: [
          
          { path: "hair", element: <HairPreview /> },
          { path: "fall", element: <HairfallPreview /> },
       ],
      }, 

 
      { path: 'results/:combination', 
        element: <Result /> 
      },
                        
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);