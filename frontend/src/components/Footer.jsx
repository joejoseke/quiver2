import React from 'react';
import { Crown, PhoneCall, Mail, MapPin, HardHat, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenReservation, onOpenGardenEstate }) {
  return (
    <footer style={{
      background: '#040406',
      borderTop: '1px solid var(--border-glass)',
      padding: '5rem 0 2rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        {/* Top Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Crown size={22} color="#000" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>
                QUIVER <span className="text-gradient-gold">GROUP</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              East Africa's premier nightlife, steakhouse & entertainment empire. Operating 20+ premier locations across Kenya under Quiver Lounge, Alcapone, Capital Noir, Space Lounge, Platinum 7D, The Tribe & Steakhouse.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gold-primary)', marginBottom: '0.5rem' }}>
              <PhoneCall size={16} /> 24/7 VIP Line: +254 700 111 222
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#c084fc' }}>
              <Mail size={16} /> Main Email: info@quiver.co.ke
            </div>
          </div>

          {/* Col 2: Quiver Garden Estate & Construction Division */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--gold-primary)' }}>
              <HardHat size={20} />
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quiver Garden Estate
              </h4>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Official construction & master building division for Quiver clubs nationwide. Partner for site visitation, land leasing & architectural construction.
            </p>
            <div style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '0.35rem' }}>
              📞 <strong>Phone:</strong> <a href="tel:0795574564" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontWeight: 700 }}>0795574564</a>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '1rem' }}>
              ✉️ <strong>Email:</strong> <a href="mailto:info@quiver.co.ke" style={{ color: '#c084fc', textDecoration: 'none', fontWeight: 700 }}>info@quiver.co.ke</a>
            </div>
            <button className="btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: '100%', justifyContent: 'center' }} onClick={onOpenGardenEstate}>
              <span>Book Site Visit & Partnership</span>
            </button>
          </div>

          {/* Col 3: Venues Directory */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Nairobi & Kiambu Venues
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Quiver Kilimani (Lenana Rd)</li>
              <li>Quiver Mombasa Road</li>
              <li>Alcapone Thika Road</li>
              <li>Capital Noir Kiambu Road</li>
              <li>The Tribe Thika</li>
              <li>Space Lounge Lang'ata</li>
              <li>Quiver Steakhouse Lavington</li>
              <li>Quiver Airport Bypass</li>
              <li>The Platinum 7D Parklands</li>
              <li>Vspot Westlands</li>
            </ul>
          </div>

          {/* Col 4: Regional Venues */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Coastal & Upcountry Venues
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Alcapone Nyali (Mombasa)</li>
              <li>Quiver Kenol (Murang'a)</li>
              <li>Quiver Kitengela (Kajiado)</li>
              <li>Quiver Naivasha (Moi South Lake)</li>
              <li>Quiver Nakuru (Kenyatta Ave)</li>
              <li>Quiver Eldoret (Uganda Rd)</li>
              <li>Quiver Machakos</li>
              <li>Quiver Meru & Nanyuki</li>
              <li>Quiver Kisumu</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Safety Bar */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Quiver Group Kenya & Quiver Garden Estate. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of VIP Membership</span>
            <span>Construction Partnerships</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
