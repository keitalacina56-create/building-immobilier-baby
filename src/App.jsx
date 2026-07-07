import React, { useState, useEffect } from 'react';
import { Home, Phone, ArrowUpRight, Loader } from 'lucide-react';
import { getProperties } from './lib/supabase';
import Filters from './components/Filters';
import PropertyList from './components/PropertyList';
import PropertyModal from './components/PropertyModal';

const initialFilters = {
  location: '',
  type: '',
  priceMin: '',
  priceMax: '',
  surfaceMin: '',
  surfaceMax: ''
};

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch properties from Supabase / Mock Service
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const { data, error } = await getProperties();
      if (data) {
        setProperties(data);
        setFilteredProperties(data);
      }
      setLoading(false);
    }
    loadProperties();
  }, []);

  // Filter application logic
  useEffect(() => {
    let result = properties;

    // Filter by location
    if (filters.location.trim() !== '') {
      const locQuery = filters.location.toLowerCase();
      result = result.filter(item => 
        item.location.toLowerCase().includes(locQuery) ||
        item.title.toLowerCase().includes(locQuery)
      );
    }

    // Filter by type
    if (filters.type !== '') {
      result = result.filter(item => item.type === filters.type);
    }

    // Filter by price (min)
    if (filters.priceMin !== '') {
      result = result.filter(item => item.price >= Number(filters.priceMin));
    }

    // Filter by price (max)
    if (filters.priceMax !== '') {
      result = result.filter(item => item.price <= Number(filters.priceMax));
    }

    // Filter by surface (min)
    if (filters.surfaceMin !== '') {
      result = result.filter(item => item.surface >= Number(filters.surfaceMin));
    }

    // Filter by surface (max)
    if (filters.surfaceMax !== '') {
      result = result.filter(item => item.surface <= Number(filters.surfaceMax));
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleContactClick = () => {
    alert("Building Immobilier Baby\nContactez-nous au : +225 07 00 00 00 00\nEmail : contact@building-immobilier-baby.ci");
  };

  return (
    <div className="app-container">
      {/* Premium Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo" onClick={() => setFilters(initialFilters)}>
            <Home size={28} style={{ color: 'var(--accent)' }} />
            <span>BUILDING <span>IMMOBILIER BABY</span></span>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setFilters(initialFilters); }}>Accueil</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setFilters({ ...initialFilters, type: 'Villa' }); }}>Villas</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setFilters({ ...initialFilters, type: 'Appartement' }); }}>Appartements</a>
            <button className="btn-contact" onClick={handleContactClick}>
              Nous contacter
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">L'immobilier d'exception à Abidjan</span>
          <h1>Trouvez la demeure de vos <span>rêves</span></h1>
          <p>
            Découvrez une sélection exclusive de propriétés prestigieuses, d'appartements de haut standing et de terrains stratégiques.
          </p>
        </div>
      </section>

      {/* Search and Grid Section */}
      <main className="container" style={{ flexGrow: 1, position: 'relative', zIndex: 5 }}>
        <Filters 
          filters={filters} 
          setFilters={setFilters} 
          onReset={handleResetFilters} 
        />

        <div className="section-title-wrapper">
          <h2>Propriétés disponibles</h2>
          <span className="results-count">
            {loading ? 'Chargement...' : `${filteredProperties.length} bien(s) trouvé(s)`}
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader className="animate-spin" size={48} style={{ color: 'var(--accent)', animation: 'spin 1.5s linear infinite' }} />
          </div>
        ) : (
          <PropertyList 
            properties={filteredProperties} 
            onSelectProperty={setSelectedProperty} 
          />
        )}
      </main>

      {/* Detailed Modal Window */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Elegant Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} <span>Building Immobilier Baby</span>. Tous droits réservés.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-muted)' }}>
            Conçu avec passion pour le marché immobilier ivoirien.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
