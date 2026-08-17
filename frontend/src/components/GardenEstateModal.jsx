import React, { useState } from 'react';
import { X, Building2, HardHat, PhoneCall, Mail, Calendar, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function GardenEstateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnershipType, setPartnershipType] = useState('Venue Construction');
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-gold"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
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
            <HardHat size={14} /> ARCHITECTURE & CLUB CONSTRUCTION DIVISION
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            QUIVER <span className="text-gradient-gold">GARDEN ESTATE</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            The official master builder and architectural engineering arm responsible for constructing Quiver Group's 20+ mega clubs and steakhouses across Kenya.
          </p>
        </div>

        {/* Direct Contact Banner */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <a 
            href="tel:0795574564"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#fff',
              textDecoration: 'none',
              background: 'rgba(0,0,0,0.4)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)'
            }}
          >
            <PhoneCall size={20} color="var(--gold-primary)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct Call / WhatsApp</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--gold-primary)' }}>0795574564</div>
            </div>
          </a>

          <a 
            href="mailto:info@quiver.co.ke"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#fff',
              textDecoration: 'none',
              background: 'rgba(0,0,0,0.4)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)'
            }}
          >
            <Mail size={20} color="#c084fc" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Email</div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#c084fc' }}>info@quiver.co.ke</div>
            </div>
          </a>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
              Schedule Site Visitation & Partnership Consultation
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  Full Name / Company Name:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe / Apex Construction Ltd"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem',
                    color: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  Phone Number:
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem',
                    color: '#fff'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  Email Address:
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="info@yourcompany.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem',
                    color: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  Preferred Visitation Date:
                </label>
                <input 
                  type="date" 
                  value={visitDate}
                  onChange={e => setVisitDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem',
                    color: '#fff'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Partnership Interest:
              </label>
              <select
                value={partnershipType}
                onChange={e => setPartnershipType(e.target.value)}
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
                <option value="Venue Construction" style={{ background: '#121218' }}>Nightclub & Lounge Construction Partnership</option>
                <option value="Steakhouse Architectural Design" style={{ background: '#121218' }}>Steakhouse & Garden Pergola Architecture</option>
                <option value="Land Joint Venture" style={{ background: '#121218' }}>Land Joint Venture / Property Lease for New Location</option>
                <option value="Sound & Interior Subcontractor" style={{ background: '#121218' }}>Sound, Acoustics & Interior Subcontracting</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Project Scope / Message:
              </label>
              <textarea 
                rows="3"
                placeholder="Describe your property location, land size, or construction proposal..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.7rem',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}>
              <Send size={18} />
              <span>Submit Site Visit & Partnership Request</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid #22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <CheckCircle2 size={32} color="#22c55e" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              SITE VISIT REQUEST RECEIVED!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              The Quiver Garden Estate project team will reach out to <strong>{phone || email}</strong> shortly for your site visitation setup.
            </p>
            <button className="btn-glass" onClick={() => setSubmitted(false)}>
              <span>Close / Send Another</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
