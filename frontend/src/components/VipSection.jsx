import React from 'react';
import { MEMBERSHIPS } from '../data/memberships';
import { Crown, CheckCircle2, Sparkles, Shield, Star, Award } from 'lucide-react';

export default function VipSection({ onSubscribeVip }) {
  return (
    <section id="vip" style={{ padding: '6rem 0', background: 'rgba(12, 12, 18, 0.7)', position: 'relative' }}>
      <div className="container">
        {/* VIP Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Crown size={14} /> EXCLUSIVE NATIONAL MEMBERSHIP
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
            JOIN THE <span className="text-gradient-gold">QUIVER VIP ELITE</span> CLUB
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Unlock VIP line skipping, private butler service, bottle lockers, valet parking, and cross-location privileges across all 20+ Quiver venues in Kenya.
          </p>
        </div>

        {/* Featured Card Banner */}
        <div 
          className="glass-panel-gold"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            marginBottom: '3.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>
              <Star size={14} /> EXCLUSIVE HARDWARE CARD
            </span>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>
              Personalized 24K Gold & Obsidian Metal VIP Card
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Every Gold, Platinum & Black Elite member receives a custom-engraved metallic VIP card equipped with RFID express access chips. Tap at any Quiver venue entrance in Kenya for instant entry.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
              <span>✓ RFID Express Gate</span>
              <span>✓ Bottle Locker Sync</span>
              <span>✓ Valet Concierge</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img 
              src="/quiver_vip_card.png" 
              alt="Quiver VIP Pass"
              style={{
                maxWidth: '100%',
                maxHeight: '260px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 30px rgba(245, 158, 11, 0.4))'
              }} 
            />
          </div>
        </div>

        {/* Membership Tiers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {MEMBERSHIPS.map(plan => (
            <div 
              key={plan.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? '1px solid var(--gold-primary)' : '1px solid var(--border-glass)',
                boxShadow: plan.popular ? '0 0 35px rgba(245, 158, 11, 0.2)' : 'none'
              }}
            >
              {plan.popular && (
                <span className="badge-gold" style={{ position: 'absolute', top: '-14px', alignSelf: 'center', background: 'var(--gold-primary)', color: '#000', fontWeight: 800 }}>
                  MOST POPULAR TIER
                </span>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="badge-gold" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>{plan.badge}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>{plan.description}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                  KES {plan.price.toLocaleString()}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> {plan.period}</span>
              </div>

              {/* Feature Bullet Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
                {plan.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                className={plan.popular ? "btn-gold" : "btn-outline-gold"}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onSubscribeVip(plan)}
              >
                <Sparkles size={16} />
                <span>Join {plan.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
