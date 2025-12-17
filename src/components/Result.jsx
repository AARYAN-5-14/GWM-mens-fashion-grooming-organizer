import React from "react";
import { useParams } from "react-router-dom";
import Clean from "../assets/Clean.jpeg";
import ItalianBeard from '../assets/Balbo.jpeg';
import Stubble from '../assets/Stubble.jpeg';
import Goatee from '../assets/Goatee.jpeg';
import Anchor from '../assets/Anchor.jpeg';
import ChinStrap from '../assets/Chin Strap.jpeg';
import NavbarLogo from "./NavbarLogo"; 
import party from "../assets/party.mp4";
import "../index.css";
// ✅ Results Data (add all 28 combos here)

const beardResults = {
  "round_uneven_patch_light": {
    title: "Round Face + Uneven Patch Beard + Light Volume",
    products: [
      {
        img: Stubble,
        link: "https://youtu.be/Q4rVRhcz8uk?si=FRD3rfgPantgEP2H",
        name: "Stubble",
      },
      {
        img: Clean,
        link: "https://youtube.com/shorts/XHwfY9zBWNc?si=c8GNsXpo1Milc6Xa",
        name: "Clean Shaven",
      },
      {
        img: ItalianBeard,
        link: "https://youtu.be/8JWLQHqurf0?si=JvZavYoH-ERfyBuc",
        name: "Italian Beard",
      },
      {
        img: Anchor,
        link: "https://youtu.be/tXJkP2PUyPI?si=4ppNFPoT-r6-fskT",
        name: "Anchor Beard",
      },
      {
        img: ChinStrap,
        link: "https://www.myntra.com/beard-oil",
        name: "Chin Strap Beard",
      },
      {
        img: Goatee,
        link: "https://www.myntra.com/beard-oil",
        name: "Goatee Beard",
      },
    ],
  },
  "round_uneven_patch_medium": {
    title: "round_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "round_uneven_patch_dense": {
    title: "round_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
  "round_light_cheeks_light": {
    title: "Round_Light_on_cheeks_Light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "round_light_cheeks_medium": {
    title: "Round_Light on cheeks_Medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "round_light_cheeks_dense": {
    title: "Round_Light on cheeks_Dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "round_chin_only_light": {
    title: "Round_On chin only_Light",
    products: [
      {
        img: Goatee,
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: ItalianBeard,
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "round_chin_only_medium": {
    title: "Oval Face + Chin Only Beard",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "round_chin_only_dense": {
    title: "round_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "round_light_connection_light": {
    title: "round_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "round_light_connection_medium": {
    title: "round_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "round_light_connection_dense": {
    title: "round_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_uneven_patch_light": {
    title: "Square Face + Light Cheeks Beard",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_uneven_patch_medium": {
    title: "long_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_uneven_patch_dense": {
    title: "long_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_light_cheeks_light": {
    title: "long_light_cheeks_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_light_cheeks_medium": {
    title: "long_light_cheeks_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_light_cheeks_dense": {
    title: "long_light_cheeks_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_chin_only_light": {
    title: "long_chin_only_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_chin_only_medium": {
    title: "long_chin_only_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_chin_only_dense": {
    title: "long_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_light_connection_light": {
    title: "long_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "long_light_connection_medium": {
    title: "long_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "long_light_connection_dense": {
    title: "long_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_uneven_patch_light": {
    title: "oval_uneven_patch_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_uneven_patch_medium": {
    title: "oval_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_uneven_patch_dense": {
    title: "oval_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_light_cheeks_light": {
    title: "oval_light_cheeks_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_light_cheeks_medium": {
    title: "oval_light_cheeks_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_light_cheeks_dense": {
    title: "oval_light_cheeks_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_chin_only_light": {
    title: "oval_chin_only_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_chin_only_medium": {
    title: "oval_chin_only_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_chin_only_dense": {
    title: "oval_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_light_connection_light": {
    title: "oval_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "oval_light_connection_medium": {
    title: "oval_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "oval_light_connection_dense": {
    title: "oval_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_uneven_patch_light": {
    title: "square_uneven_patch_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "square_uneven_patch_medium": {
    title: "square_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_uneven_patch_dense": {
    title: "square_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "square_light_cheeks_light": {
    title: "square_light_cheeks_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_light_cheeks_medium": {
    title: "square_light_cheeks_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
   "square_light_cheeks_dense": {
    title: "square_light_cheeks_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_chin_only_light": {
    title: "square_chin_only_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "square_chin_only_medium": {
    title: "square_chin_only_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_chin_only_dense": {
    title: "square_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "square_light_connection_light": {
    title: "square_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "square_light_connection_medium": {
    title: "square_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "square_light_connection_dense": {
    title: "square_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "heart_uneven_patch_light": {
    title: "heart_uneven_patch_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "heart_uneven_patch_medium": {
    title: "heart_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "heart_uneven_patch_dense": {
    title: "heart_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "heart_light_cheeks_light": {
    title: "heart_light_cheeks_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "heart_light_cheeks_medium": {
    title: "heart_light_cheeks_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "heart_light_cheeks_dense": {
    title: "heart_light_cheeks_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
   "heart_chin_only_light": {
    title: "heart_chin_only_light",
    products: [
      {
        img: Stubble,
        link: "https://youtu.be/Q4rVRhcz8uk?si=FRD3rfgPantgEP2H",
        name: "Stubble",
      },
      {
        img: Clean,
        link: "https://youtube.com/shorts/XHwfY9zBWNc?si=c8GNsXpo1Milc6Xa",
        name: "Clean Shaven",
      },
      {
        img: ItalianBeard,
        link: "https://youtu.be/8JWLQHqurf0?si=JvZavYoH-ERfyBuc",
        name: "Italian Beard",
      },
      {
        img: Anchor,
        link: "https://youtu.be/tXJkP2PUyPI?si=4ppNFPoT-r6-fskT",
        name: "Anchor Beard",
      },
      {
        img: ChinStrap,
        link: "https://www.myntra.com/beard-oil",
        name: "Chin Strap Beard",
      },
      {
        img: Goatee,
        link: "https://www.myntra.com/beard-oil",
        name: "Goatee Beard",
      },
    ],
  },
  "heart_chin_only_medium": {
    title: "heart_chin_only_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "heart_chin_only_dense": {
    title: "heart_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "heart_light_connection_light": {
    title: "heart_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "heart_light_connection_medium": {
    title: "heart_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "heart_light_connection_dense": {
    title: "heart_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_uneven_patch_light": {
    title: "diamond_uneven_patch_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_uneven_patch_medium": {
    title: "diamond_uneven_patch_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_uneven_patch_dense": {
    title: "diamond_uneven_patch_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_light_cheeks_light": {
    title: "diamond_light_cheeks_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_light_cheeks_medium": {
    title: "diamond_light_cheeks_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_light_cheeks_dense": {
    title: "diamond_light_cheeks_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_chin_only_light": {
    title: "diamond_chin_only_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_chin_only_medium": {
    title: "diamond_chin_only_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_chin_only_dense": {
    title: "diamond_chin_only_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_light_connection_light": {
    title: "diamond_light_connection_light",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },
  "diamond_light_connection_medium": {
    title: "diamond_light_connection_medium",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Brush",
        link: "https://www.amazon.in/beard-brush",
        name: "Beard Brush",
      },
      {
        img: "https://via.placeholder.com/200x250.png?text=Beard+Shampoo",
        link: "https://www.amazon.in/beard-shampoo",
        name: "Beard Shampoo",
      },
    ],
  },
    "diamond_light_connection_dense": {
    title: "diamond_light_connection_dense",
    products: [
      {
        img: "https://via.placeholder.com/200x250.png?text=Goatee+Kit",
        link: "https://www.amazon.in/mens-grooming",
        name: "Goatee Kit",
      },
    ],
  },

  
};

const Result = () => {
  const { combination } = useParams();
  const result = beardResults[combination];

  if (!result) {
    return (
      <div className="result-container">
        <NavbarLogo />
        <h1>No result found for {combination}</h1>
      </div>
    );
  }

  return (
    
    <div className="result-container">
      <NavbarLogo />
      <div className="heading">
      
 <div className="background-video-result">
          <video src={party} autoPlay loop muted playsInline />
          <h2>RESULTS</h2>
        </div>
        </div>
        <h1 className="result-title">{result.title}</h1>
      
      <div className="result-grid">
        {result.products.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="result-card"
          >
            <img src={item.img} alt={item.name} className="result-img" />
            <p className="result-name">{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Result;
