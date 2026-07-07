import React from 'react';
import { MapPin, Maximize2, Tag, Info } from 'lucide-react';

export default function PropertyList({ properties, onSelectProperty }) {
  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  if (properties.length === 0) {
    return (
      <div className="empty-state">
        <Info />
        <h3>Aucun bien ne correspond à vos critères</h3>
        <p>Essayez de modifier vos filtres ou de réinitialiser la recherche.</p>
      </div>
    );
  }

  return (
    <div className="properties-grid">
      {properties.map((property) => (
        <div 
          key={property.id} 
          className="property-card"
          onClick={() => onSelectProperty(property)}
        >
          <div className="card-image-wrapper">
            <span className="card-tag">{property.type}</span>
            <img 
              src={property.photos && property.photos[0] ? property.photos[0] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'} 
              alt={property.title} 
              className="card-image"
              loading="lazy"
            />
            <span className="card-price">{formatPrice(property.price)}</span>
          </div>

          <div className="card-content">
            <div className="card-location">
              <MapPin />
              <span>{property.location}</span>
            </div>
            
            <h3 className="card-title">{property.title}</h3>
            
            <div className="card-specs">
              <div className="spec-item">
                <Maximize2 />
                <span>{property.surface} m²</span>
              </div>
              <div className="spec-item">
                <Tag />
                <span>{property.type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
