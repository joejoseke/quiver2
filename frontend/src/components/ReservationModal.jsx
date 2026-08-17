import React, { useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { X, Sparkles, Calendar, Clock, Users, Wine, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

export default function ReservationModal({ isOpen, onClose, initialLocation, onProceedToPayment }) {
  if (!isOpen) return null;

  const [occasion, setOccasion] = useState('Birthday Party');
  const [selectedLocationId, setSelectedLocationId] = useState(initialLocation?.id || LOCATIONS[0].id);
  const [date, setDate] = useState('2026-07-25');
  const [time, setTime] = useState('20:00');
  const [guestCount, setGuestCount] = useState(6);
  const [section, setSection] = useState('VVIP Sovereign Booth');
  const [bottleAddon, setBottleAddon] = useState('Moët & Chandon Brut + Hennessy VSOP');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Occasions list
  const OCCASIONS = [
    'Birthday Celebration 🎂',
    'Company Anniversary 🏢',
    'Wedding / After-Party 💍',
    'Romantic Date Night 🥂',
    'Bachelor / Bachelorette Bash 🎉',
    'Executive Business VIP Dinner 💼'
  ];

  const SECTIONS = [
    { name: 'VVIP Sovereign Glass Booth', price: 25000, desc: 'Includes dedicated butler service, priority entry & champagne bucket.' },
    { name: 'Rooftop Terrace High-Tables', price: 15000, desc: 'Prime DJ sound acoustics & open outdoor sky view.' },
    { name: 'Quiver Steakhouse Garden Pergola', price: 20000, desc: 'Ideal for dining platters, wines & romantic date atmosphere.' },
    { name: 'Standard Dancefloor Table', price: 10000, desc: 'Close to the main DJ stage and high energy crowd.' }
  ];

  const BOTTLE_PACKAGES = [
    { name: 'None (Drinks ordered at venue)', price: 0 },
    { name: 'Moët & Chandon Brut + Hennessy VSOP', price: 35000 },
    { name: 'Dom Pérignon Vintage + Single Malt Vault Selection', price: 65000 },
    { name: 'Quiver Sovereign Meat Platter + Jameson Black Barrel', price: 20000 }
  ];

  const selectedSectionObj = SECTIONS.find(s => s.name === section) || SECTIONS[0];
  const selectedBottleObj = BOTTLE_PACKAGES.find(b => b.name === bottleAddon) || BOTTLE_PACKAGES[0];
  
  const totalPrice = selectedSectionObj.price + selectedBottleObj.price;
  const targetVenue = LOCATIONS.find(l => l.id === selectedLocationId) || LOCATIONS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      type: 'reservation',
      occasion,
      venue: targetVenue.name,
      locationId: targetVenue.id,
      county: targetVenue.county,
      date,
      time,
      guestCount,
      section,
      bottleAddon,
      specialInstructions,
      totalPrice
    };
    onProceedToPayment(reservationData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-gold"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          position: 'relative',
          color: '#fff'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={14} /> EXCLUSIVE VIP RESERVATIONS
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            RESERVE SPECIAL PARTY AT <span className="text-gradient-gold">QUIVER</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Instant online booking deposit for birthdays, corporate anniversaries, dates & weddings.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Occasion Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Select Special Occasion:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {OCCASIONS.map(occ => (
                <button
                  type="button"
                  key={occ}
                  onClick={() => setOccasion(occ)}
                  style={{
                    background: occasion === occ ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)',
                    color: occasion === occ ? '#000' : '#fff',
                    border: occasion === occ ? 'none' : '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Choose Location (20+ Nationwide):
            </label>
            <select
              value={selectedLocationId}
              onChange={e => setSelectedLocationId(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                color: '#fff',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id} style={{ background: '#121218', color: '#fff' }}>
                  {loc.name} ({loc.county} County) - {loc.address}
                </option>
              ))}
            </select>
          </div>

          {/* Date, Time, Guests */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Event Date:
              </label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.65rem',
                  color: '#fff'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Arrival Time:
              </label>
              <input 
                type="time" 
                value={time} 
                onChange={e => setTime(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.65rem',
                  color: '#fff'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Number of Guests:
              </label>
              <input 
                type="number" 
                min="1" 
                max="100"
                value={guestCount} 
                onChange={e => setGuestCount(parseInt(e.target.value) || 1)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.65rem',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          {/* Section Choice */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Select Table / VIP Section:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
              {SECTIONS.map(sec => (
                <div 
                  key={sec.name}
                  onClick={() => setSection(sec.name)}
                  style={{
                    background: section === sec.name ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0,0,0,0.3)',
                    border: section === sec.name ? '1px solid var(--gold-primary)' : '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: section === sec.name ? 'var(--gold-primary)' : '#fff' }}>
                      {sec.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sec.desc}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--gold-primary)' }}>
                    KES {sec.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-order Bottle Service */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Add Bottle Service Package (Optional):
            </label>
            <select
              value={bottleAddon}
              onChange={e => setBottleAddon(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                color: '#fff',
                outline: 'none'
              }}
            >
              {BOTTLE_PACKAGES.map(pkg => (
                <option key={pkg.name} value={pkg.name} style={{ background: '#121218', color: '#fff' }}>
                  {pkg.name} {pkg.price > 0 ? `(+KES ${pkg.price.toLocaleString()})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Special Requests (Custom Cake, DJ Shoutout, Sparkler Candles):
            </label>
            <textarea 
              rows="2"
              placeholder="e.g. Birthday cake presentation with fireworks sparklers at 10 PM, play Afrobeats playlist..."
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem',
                color: '#fff',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Pricing Total & Submit */}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.5rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Reservation Deposit:</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                KES {totalPrice.toLocaleString()}
              </div>
            </div>

            <button type="submit" className="btn-gold" style={{ padding: '0.85rem 1.75rem' }}>
              <span>Pay Online via M-Pesa</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
