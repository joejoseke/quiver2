import React, { useState } from 'react';
import { Wine, Calendar, Crown, MapPin, Sparkles, ShoppingBag, Menu, X, HardHat, PhoneCall } from 'lucide-react';

export default function Header({ onOpenReservation, cartCount, onOpenCart, onOpenGardenEstate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(7, 7, 10, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
          }}>
            <Crown size={26} color="#000" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: '#fff',
              lineHeight: 1.1
            }}>
              QUIVER <span className="text-gradient-gold">GROUP</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.15em', fontWeight: 600 }}>
              KENYA'S LARGEST ENTERTAINMENT EMPIRE
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <a href="#locations" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            <MapPin size={15} color="var(--gold-primary)" /> 20+ Venues
          </a>
          <a href="#events" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            <Calendar size={15} color="#c084fc" /> Events
          </a>
          <a href="#vip" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            <Crown size={15} color="var(--gold-primary)" /> VIP
          </a>
          <a href="#menu" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            <Wine size={15} color="#ef4444" /> Steakhouse
          </a>

          {/* Quiver Garden Estate Construction Division Link */}
          <button 
            onClick={onOpenGardenEstate}
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-primary)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 0.85rem',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <HardHat size={15} />
            <span>Quiver Garden Estate</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--gold-primary)',
                color: '#000',
                fontSize: '0.7rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Party Reservation CTA */}
          <button className="btn-gold" onClick={() => onOpenReservation()}>
            <Sparkles size={18} />
            <span>Book Special Party</span>
          </button>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0c0c12',
          borderBottom: '1px solid var(--border-glass)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          <a href="#locations" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>📍 20+ Venues Across Kenya</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>🎟️ Buy Event Tickets</a>
          <a href="#vip" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>👑 Exclusive VIP Membership</a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>🥩 Steakhouse & Bottle Menu</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenGardenEstate(); }}
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-primary)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <HardHat size={18} />
            <span>Quiver Garden Estate (Club Construction)</span>
          </button>
        </div>
      )}
    </header>
  );
}
