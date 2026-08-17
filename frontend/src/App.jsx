import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LocationsSection from './components/LocationsSection';
import EventsSection from './components/EventsSection';
import VipSection from './components/VipSection';
import MenuSection from './components/MenuSection';
import ReservationModal from './components/ReservationModal';
import CheckoutModal from './components/CheckoutModal';
import GardenEstateModal from './components/GardenEstateModal';
import Footer from './components/Footer';
import { ShoppingBag, X, Sparkles, Trash2, ChevronRight } from 'lucide-react';

export default function App() {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState(null);
  
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const [gardenEstateModalOpen, setGardenEstateModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Handlers
  const handleOpenReservation = (venue = null) => {
    setSelectedVenueForBooking(venue);
    setReservationModalOpen(true);
  };

  const handleProceedToPayment = (data) => {
    setReservationModalOpen(false);
    setCheckoutData(data);
    setCheckoutModalOpen(true);
  };

  const handleBuyTicket = (eventObj, tierObj) => {
    const data = {
      type: 'event_ticket',
      eventId: eventObj.id,
      eventTitle: eventObj.title,
      tierName: tierObj.name,
      title: `${eventObj.title} - ${tierObj.name}`,
      venue: eventObj.venue,
      date: eventObj.date,
      time: eventObj.time,
      price: tierObj.price
    };
    setCheckoutData(data);
    setCheckoutModalOpen(true);
  };

  const handleSubscribeVip = (planObj) => {
    const data = {
      type: 'vip_membership',
      membershipId: planObj.id,
      name: `Quiver ${planObj.name} Membership`,
      venue: 'All 20+ Venues Nationwide',
      price: planObj.price
    };
    setCheckoutData(data);
    setCheckoutModalOpen(true);
  };

  const handleAddToCart = (item) => {
    if (!cartItems.find(i => i.id === item.id)) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(i => i.id !== itemId));
  };

  const cartTotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) return;
    setCartDrawerOpen(false);
    const data = {
      type: 'cart_preorder',
      items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      title: `Food & Bottle Service Pre-Order (${cartItems.length} items)`,
      venue: 'Quiver Group Venue',
      price: cartTotal
    };
    setCheckoutData(data);
    setCheckoutModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <Header 
        onOpenReservation={() => handleOpenReservation(null)}
        cartCount={cartItems.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenGardenEstate={() => setGardenEstateModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <Hero 
          onOpenReservation={() => handleOpenReservation(null)}
          onOpenGardenEstate={() => setGardenEstateModalOpen(true)}
        />
        
        <LocationsSection onSelectLocation={(loc) => handleOpenReservation(loc)} />

        <EventsSection onBuyTicket={handleBuyTicket} />

        <VipSection onSubscribeVip={handleSubscribeVip} />

        <MenuSection onAddToCart={handleAddToCart} cartItems={cartItems} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenReservation={() => handleOpenReservation(null)}
        onOpenGardenEstate={() => setGardenEstateModalOpen(true)}
      />

      {/* Party Reservation Modal */}
      <ReservationModal 
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        initialLocation={selectedVenueForBooking}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* Quiver Garden Estate Construction Modal */}
      <GardenEstateModal 
        isOpen={gardenEstateModalOpen}
        onClose={() => setGardenEstateModalOpen(false)}
      />

      {/* Payment / STK Push Checkout Modal */}
      <CheckoutModal 
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        checkoutData={checkoutData}
        onPaymentSuccess={(ref) => {
          setCartItems([]);
        }}
      />

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <div className="modal-overlay" onClick={() => setCartDrawerOpen(false)}>
          <div 
            className="glass-panel-gold"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '450px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1001,
              color: '#fff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={22} color="var(--gold-primary)" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Pre-Order Cart</h3>
              </div>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', margin: 'auto 0', color: 'var(--text-secondary)' }}>
                <p>Your pre-order cart is empty.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Add steak platters, champagnes & spirits from our menu!</p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {cartItems.map(item => (
                    <div 
                      key={item.id}
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ color: 'var(--gold-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                          KES {item.price.toLocaleString()}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 800 }}>
                    <span>Total Pre-Order:</span>
                    <span style={{ color: 'var(--gold-primary)' }}>KES {cartTotal.toLocaleString()}</span>
                  </div>

                  <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckoutCart}>
                    <span>Proceed to M-Pesa Checkout</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
