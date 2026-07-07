import React from 'react';
import { Search, MapPin, Tag, Maximize2, DollarSign, RotateCcw } from 'lucide-react';

export default function Filters({ filters, setFilters, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="search-container">
      <div className="filter-card">
        <div className="filter-grid">
          {/* Location Search */}
          <div className="filter-group">
            <label htmlFor="location">
              <MapPin /> Localisation
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              placeholder="Ex: Cocody, Marcory, Bassam..."
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          {/* Type of Property */}
          <div className="filter-group">
            <label htmlFor="type">
              <Tag /> Type de bien
            </label>
            <select
              id="type"
              name="type"
              className="form-control"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Tous les types</option>
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
              <option value="Terrain">Terrain</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>
              <DollarSign /> Prix (FCFA)
            </label>
            <div className="range-inputs">
              <input
                type="number"
                name="priceMin"
                className="form-control"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleChange}
              />
              <span className="range-separator">-</span>
              <input
                type="number"
                name="priceMax"
                className="form-control"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Surface Range */}
          <div className="filter-group">
            <label>
              <Maximize2 /> Surface (m²)
            </label>
            <div className="range-inputs">
              <input
                type="number"
                name="surfaceMin"
                className="form-control"
                placeholder="Min"
                value={filters.surfaceMin}
                onChange={handleChange}
              />
              <span className="range-separator">-</span>
              <input
                type="number"
                name="surfaceMax"
                className="form-control"
                placeholder="Max"
                value={filters.surfaceMax}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button className="btn-reset" onClick={onReset}>
            <RotateCcw size={16} /> Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  );
}
