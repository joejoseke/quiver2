import React from 'react';
import { Sparkles, MapPin, HardHat, Ticket, Users, Trophy } from 'lucide-react';

export default function Hero({ onOpenReservation, onOpenGardenEstate }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      padding: '4rem 0 6rem',
      overflow: 'hidden'
    }}>
      {/* Background Image with Dark Glow Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to bottom, rgba(7,7,10,0.6) 0%, rgba(7,7,10,0.85) 70%, rgba(7,7,10,1) 100%), url(/quiver_hero_bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.8)',
        zIndex: 0
      }} />

      {/* Floating Lights Background Effect */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '950px' }}>
        {/* Top Highlight Pill */}
        <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
          <span className="badge-gold" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>
            <Trophy size={16} /> EAST AFRICA'S LARGEST ENTERTAINMENT & DINING GROUP
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.08,
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}>
          EXPERIENCE THE LEGENDARY <br />
          <span className="text-gradient-gold">QUIVER NIGHTLIFE & STEAKHOUSE</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto 2.5rem'
        }}>
          From <strong style={{ color: '#fff' }}>Quiver Kilimani & Mombasa Road</strong> to <strong style={{ color: '#fff' }}>Alcapone Thika Rd, Capital Noir, Space Lounge & Alcapone Nyali</strong>. Over 20 premier locations across Kenyan counties with exclusive VIP membership, world-class steakhouse dining, live concerts & online event reservations.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3.5rem'
        }}>
          <button className="btn-gold" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }} onClick={onOpenReservation}>
            <Sparkles size={20} />
            <span>Reserve Special Party Now</span>
          </button>

          <a href="#locations" className="btn-glass" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}>
            <MapPin size={20} color="var(--gold-primary)" />
            <span>Explore 20+ Venues</span>
          </a>

          <button className="btn-outline-gold" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }} onClick={onOpenGardenEstate}>
            <HardHat size={20} />
            <span>Quiver Garden Estate (Construction & Visits)</span>
          </button>
        </div>

        {/* Live Stats Counter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          background: 'rgba(18, 18, 24, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gold-primary)', fontFamily: 'var(--font-heading)' }}>20+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Locations Nationwide</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)' }}>12+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Kenyan Counties Covered</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#c084fc', fontFamily: 'var(--font-heading)' }}>500,000+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>VIP Party Clients</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ef4444', fontFamily: 'var(--font-heading)' }}>M-PESA</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Instant Online Checkout</div>
          </div>
        </div>
      </div>
    </section>
  );
}
