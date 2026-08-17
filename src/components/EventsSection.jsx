import React, { useState } from 'react';
import { EVENTS } from '../data/events';
import { Ticket, Calendar, Clock, MapPin, Sparkles, ChevronRight, UserCheck } from 'lucide-react';

export default function EventsSection({ onBuyTicket }) {
  return (
    <section id="events" style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Ticket size={14} /> LIVE ENTERTAINMENT & GALAS
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            BUY TICKETS FOR <span className="text-gradient-purple">UPCOMING EVENTS</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Secure instant digital QR pass tickets for high-energy DJ performances, themed gala nights & Sunday brunches across Quiver venues nationwide.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {EVENTS.map(evt => (
            <div 
              key={evt.id} 
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Event Image Banner */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={evt.image} 
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18,18,24,1) 0%, transparent 70%)'
                }} />

                <span className="badge-purple" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {evt.category}
                </span>
                
                <span style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  color: 'var(--gold-primary)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <MapPin size={14} /> {evt.venue}
                </span>
              </div>

              {/* Event Details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} color="#c084fc" /> {evt.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} color="#c084fc" /> {evt.time}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {evt.description}
                </p>

                <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700, marginBottom: '1.25rem' }}>
                  🎧 Featuring: {evt.performers}
                </div>

                {/* Ticket Tiers List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: 'auto' }}>
                  {evt.tiers.map((tier, idx) => (
                    <div 
                      key={idx}
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{tier.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{tier.perks}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold-primary)', marginBottom: '0.2rem' }}>
                          KES {tier.price.toLocaleString()}
                        </div>
                        <button 
                          className="btn-gold" 
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                          onClick={() => onBuyTicket(evt, tier)}
                        >
                          Buy Ticket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
