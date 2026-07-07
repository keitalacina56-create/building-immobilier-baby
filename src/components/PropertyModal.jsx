import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Tag, Calendar, User, Phone } from 'lucide-react';

export default function PropertyModal({ property, onClose }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  if (!property) return null;

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (property.photos && property.photos.length > 0) {
      setActivePhotoIndex((prev) => (prev + 1) % property.photos.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (property.photos && property.photos.length > 0) {
      setActivePhotoIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      alert("Votre demande de contact a été envoyée avec succès ! Un agent vous contactera très rapidement.");
    }, 800);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {/* Gallery Section */}
        <div className="modal-gallery">
          <img 
            src={property.photos && property.photos[activePhotoIndex] ? property.photos[activePhotoIndex] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'} 
            alt={`${property.title} - Photo ${activePhotoIndex + 1}`}
            className="modal-gallery-img"
          />

          {property.photos && property.photos.length > 1 && (
            <>
              <button className="gallery-nav prev" onClick={prevPhoto}>
                <ChevronLeft size={24} />
              </button>
              <button className="gallery-nav next" onClick={nextPhoto}>
                <ChevronRight size={24} />
              </button>
              
              <div className="gallery-dots">
                {property.photos.map((_, index) => (
                  <span 
                    key={index}
                    className={`gallery-dot ${index === activePhotoIndex ? 'active' : ''}`}
                    onClick={() => setActivePhotoIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="modal-body">
          <div className="modal-header-info">
            <div className="modal-title-area">
              <h2>{property.title}</h2>
              <div className="card-location" style={{ fontSize: '1rem', marginTop: '4px' }}>
                <MapPin size={18} />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="modal-price">
              {formatPrice(property.price)}
            </div>
          </div>

          <div className="modal-meta-chips">
            <div className="meta-chip">
              <Maximize2 size={18} />
              <span>{property.surface} m²</span>
            </div>
            <div className="meta-chip">
              <Tag size={18} />
              <span>{property.type}</span>
            </div>
            <div className="meta-chip">
              <Calendar size={18} />
              <span>Disponible Immédiatement</span>
            </div>
          </div>

          <h3 className="modal-section-title">Description</h3>
          <p className="modal-description">{property.description}</p>

          <h3 className="modal-section-title">Intéressé par ce bien ?</h3>
          <div className="modal-contact-section">
            <div className="contact-agent-info">
              <h4>Building Immobilier Baby</h4>
              <p>Votre conseiller dédié est disponible pour organiser une visite ou répondre à vos questions.</p>
            </div>
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Votre nom" 
                required 
                style={{ width: '200px', backgroundColor: 'var(--bg-primary)' }}
              />
              <input 
                type="tel" 
                className="form-control" 
                placeholder="Votre téléphone" 
                required 
                style={{ width: '180px', backgroundColor: 'var(--bg-primary)' }}
              />
              <button type="submit" className="btn-submit-contact">
                {contactSubmitted ? "Envoi..." : "Demander une visite"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
