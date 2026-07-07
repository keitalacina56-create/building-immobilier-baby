-- 1. Création de la table 'properties'
CREATE TABLE IF NOT EXISTS public.properties (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    title text NOT NULL,
    price numeric NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    surface numeric NOT NULL,
    description text,
    photos text[] DEFAULT '{}'::text[]
);

-- 2. Activation de la sécurité niveau ligne (RLS) - Optionnel mais recommandé
-- Permettre à tout le monde de lire les données
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permettre la lecture publique de tous les biens" 
ON public.properties FOR SELECT 
TO public 
USING (true);

-- 3. Insertion des données initiales (biens de démonstration)
INSERT INTO public.properties (title, price, location, type, surface, description, photos)
VALUES 
(
    'Villa Contemporaine d''Exception', 
    1250000, 
    'Abidjan, Cocody Ambassades', 
    'Villa', 
    450, 
    'Somptueuse villa contemporaine située dans le quartier le plus prestigieux de Cocody. Elle offre de grands espaces de vie lumineux, une piscine à débordement, un jardin paysager de 1000m² et 5 suites parentales avec dressings et salles de bains privatives.',
    ARRAY[
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ]
),
(
    'Penthouse de Luxe vue Lagune', 
    850000, 
    'Abidjan, Plateau', 
    'Appartement', 
    280, 
    'Penthouse exclusif offrant des prestations haut de gamme au coeur du Plateau. Grande terrasse avec vue panoramique imprenable sur la lagune Ebrié, triple séjour, cuisine équipée dernier cri, 3 chambres élégantes et sécurité assurée H24.',
    ARRAY[
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ]
),
(
    'Maison de Charme avec Piscine', 
    450000, 
    'Abidjan, Marcory Zone 4', 
    'Maison', 
    220, 
    'Jolie maison familiale très bien située en Zone 4, à proximité des commerces et des écoles. Grand séjour lumineux ouvrant sur une terrasse couverte, piscine ensoleillée, 4 chambres spacieuses et garage privé.',
    ARRAY[
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
),
(
    'Terrain constructible viabilisé', 
    180000, 
    'Grand-Bassam', 
    'Terrain', 
    600, 
    'Superbe opportunité d''investissement. Terrain constructible de 600 m², entièrement viabilisé (eau, électricité, assainissement), situé dans un secteur en plein essor à Grand-Bassam, à seulement 5 minutes de la plage.',
    ARRAY[
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ]
),
(
    'Duplex Moderne Haut Standing', 
    620000, 
    'Abidjan, Riviera Faya', 
    'Appartement', 
    190, 
    'Superbe duplex de 5 pièces construit avec des matériaux de qualité. Composé d''un séjour spacieux et aéré, d''une cuisine moderne, de 4 chambres autonomes et d''une petite cour arrière aménagée.',
    ARRAY[
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ]
),
(
    'Appartement Cosy Proche Commerces', 
    250000, 
    'Abidjan, Angré Nouveau CHU', 
    'Appartement', 
    110, 
    'Appartement de 3 pièces idéal pour un premier achat ou investissement locatif. Lumineux, moderne, cuisine semi-équipée, balcon avec vue dégagée, situé dans une résidence sécurisée.',
    ARRAY[
        'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80'
    ]
);
