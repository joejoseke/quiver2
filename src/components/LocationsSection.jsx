import React, { useState } from 'react';
import { LOCATIONS, COUNTIES, BRANDS } from '../data/locations';
import { MapPin, Phone, Users, Sparkles, Search, CheckCircle2, ChevronRight } from 'lucide-react';

export default function LocationsSection({ onSelectLocation }) {
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = LOCATIONS.filter(loc => {
    const matchesCounty = selectedCounty === "All Counties" || loc.county === selectedCounty;
    const matchesBrand = selectedBrand === "All Brands" || loc.brand === selectedBrand;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCounty && matchesBrand && matchesSearch;
  });

  return (
    <section id="locations" style={{ padding: '6rem 0', background: 'rgba(12, 12, 18, 0.5)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
            <MapPin size={14} /> NATIONWIDE PRESENCE
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            EXPLORE OUR <span className="text-gradient-gold">20+ LOCATIONS</span> ACROSS KENYA
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Operating under iconic brand names in Nairobi, Kiambu, Coast, Rift Valley, Central & Nyanza regions. Every location offers world-class sound, signature grills, VIP spaces & security.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Search bar */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
            <input 
              type="text"
              placeholder="Search by venue name, county or highway (e.g. Kilimani, Thika Road, Nyali, Kitengela)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-full)',
                padding: '0.85rem 1rem 0.85rem 3rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          {/* County Filter Pills */}
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              Filter by County:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {COUNTIES.map(county => (
                <button
                  key={county}
                  onClick={() => setSelectedCounty(county)}
                  style={{
                    background: selectedCounty === county ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedCounty === county ? '#000' : 'var(--text-secondary)',
                    fontWeight: selectedCounty === county ? 700 : 500,
                    border: selectedCounty === county ? 'none' : '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 1rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {county}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredLocations.map(loc => (
            <div 
              key={loc.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
              }}
            >
              {/* Card Image Header */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(12,12,18,1) 0%, transparent 60%)'
                }} />

                {/* County Badge */}
                <span className="badge-gold" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {loc.county} County
                </span>

                {/* Open Status Pill */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></span>
                  Open 24/7
                </span>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem', color: '#fff' }}>
                  {loc.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
                  <MapPin size={14} color="var(--gold-primary)" /> {loc.address}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Capacity: <strong style={{ color: '#fff' }}>{loc.capacity}</strong></span>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>★ {loc.rating} Rating</span>
                </div>

                {/* Highlights */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {loc.highlights.map((hl, i) => (
                    <span key={i} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      • {hl}
                    </span>
                  ))}
                </div>

                {/* Bottom Action */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn-gold" 
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem' }}
                    onClick={() => onSelectLocation(loc)}
                  >
                    <Sparkles size={16} />
                    <span>Book Table Here</span>
                  </button>

                  <a 
                    href={`tel:${loc.phone}`}
                    className="btn-glass"
                    style={{ padding: '0.75rem' }}
                    title="Call Venue Direct"
                  >
                    <Phone size={16} color="var(--gold-primary)" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
