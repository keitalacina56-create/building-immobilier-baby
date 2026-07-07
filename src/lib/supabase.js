import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock properties to fall back on if Supabase is not configured or fails
export const mockProperties = [
  {
    id: 1,
    title: "Villa Contemporaine d'Exception",
    price: 1250000,
    location: "Abidjan, Cocody Ambassades",
    type: "Villa",
    surface: 450,
    description: "Somptueuse villa contemporaine située dans le quartier le plus prestigieux de Cocody. Elle offre de grands espaces de vie lumineux, une piscine à débordement, un jardin paysager de 1000m² et 5 suites parentales avec dressings et salles de bains privatives.",
    photos: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 2,
    title: "Penthouse de Luxe vue Lagune",
    price: 850000,
    location: "Abidjan, Plateau",
    type: "Appartement",
    surface: 280,
    description: "Penthouse exclusif offrant des prestations haut de gamme au coeur du Plateau. Grande terrasse avec vue panoramique imprenable sur la lagune Ebrié, triple séjour, cuisine équipée dernier cri, 3 chambres élégantes et sécurité assurée H24.",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    title: "Maison de Charme avec Piscine",
    price: 450000,
    location: "Abidjan, Marcory Zone 4",
    type: "Maison",
    surface: 220,
    description: "Jolie maison familiale très bien située en Zone 4, à proximité des commerces et des écoles. Grand séjour lumineux ouvrant sur une terrasse couverte, piscine ensoleillée, 4 chambres spacieuses et garage privé.",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    title: "Terrain constructible viabilisé",
    price: 180000,
    location: "Grand-Bassam",
    type: "Terrain",
    surface: 600,
    description: "Superbe opportunité d'investissement. Terrain constructible de 600 m², entièrement viabilisé (eau, électricité, assainissement), situé dans un secteur en plein essor à Grand-Bassam, à seulement 5 minutes de la plage.",
    photos: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    title: "Duplex Moderne Haut Standing",
    price: 620000,
    location: "Abidjan, Riviera Faya",
    type: "Appartement",
    surface: 190,
    description: "Superbe duplex de 5 pièces construit avec des matériaux de qualité. Composé d'un séjour spacieux et aéré, d'une cuisine moderne, de 4 chambres autonomes et d'une petite cour arrière aménagée.",
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Appartement Cosy Proche Commerces",
    price: 250000,
    location: "Abidjan, Angré Nouveau CHU",
    type: "Appartement",
    surface: 110,
    description: "Appartement de 3 pièces idéal pour un premier achat ou investissement locatif. Lumineux, moderne, cuisine semi-équipée, balcon avec vue dégagée, situé dans une résidence sécurisée.",
    photos: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

// Helper to fetch properties
export async function getProperties() {
  if (!supabase) {
    console.warn("Supabase n'est pas configuré. Utilisation des données fictives.");
    return { data: mockProperties, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des données Supabase, repli sur les données fictives:", error);
      return { data: mockProperties, error: null };
    }

    // If database is connected but empty, return mock properties to ensure something is displayed
    if (!data || data.length === 0) {
      return { data: mockProperties, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Erreur de connexion Supabase, repli sur les données fictives :", err);
    return { data: mockProperties, error: null };
  }
}
