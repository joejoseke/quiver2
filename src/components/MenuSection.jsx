import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { Wine, Flame, Star, Plus, Check } from 'lucide-react';

export default function MenuSection({ onAddToCart, cartItems }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const isItemInCart = (itemId) => cartItems.some(i => i.id === itemId);

  return (
    <section id="menu" style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="badge-red" style={{ marginBottom: '0.75rem' }}>
            <Flame size={14} /> QUIVER STEAKHOUSE & BOTTLE VAULT
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
            PRE-ORDER <span className="text-gradient-red">STEAKS, CHAMPAGNE & BOTTLES</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Pre-order your favorite food platters and spirit bottles to be chilled and served at your VIP table the moment you arrive.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', marginBottom: '3rem' }}>
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#ef4444' : 'rgba(255, 255, 255, 0.05)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontWeight: activeCategory === cat ? 700 : 500,
                border: activeCategory === cat ? 'none' : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.25rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18,18,24,1) 0%, transparent 60%)'
                }} />
                
                <span className="badge-gold" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  ★ {item.rating}
                </span>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                    KES {item.price.toLocaleString()}
                  </div>

                  <button
                    className={isItemInCart(item.id) ? "btn-glass" : "btn-gold"}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => onAddToCart(item)}
                  >
                    {isItemInCart(item.id) ? (
                      <>
                        <Check size={16} color="#4ade80" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
