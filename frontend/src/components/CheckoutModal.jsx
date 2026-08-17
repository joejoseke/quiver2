import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Smartphone, CreditCard, ShieldCheck, CheckCircle2, QrCode, Sparkles, Printer, Download } from 'lucide-react';

const API_BASE_URL = (import.meta.env.VITE_PAYMENT_API_URL || 'https://brane-shop-backend.joejoseke.workers.dev').replace(/\/$/, '');

export default function CheckoutModal({ isOpen, onClose, checkoutData, onPaymentSuccess }) {
  if (!isOpen || !checkoutData) return null;

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('0722123456');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stkSent, setStkSent] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [email, setEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const calculateAmount = () => {
    if (checkoutData.totalPrice) return checkoutData.totalPrice;
    if (checkoutData.price) return checkoutData.price;
    return 0;
  };

  const markPaymentComplete = (orderId) => {
    setIsProcessing(false);
    setPaymentDone(true);
    setBookingRef(orderId);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (onPaymentSuccess) onPaymentSuccess(orderId);
  };

  const waitForPayment = async (orderId) => {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(`${API_BASE_URL}/api/quiver/orders/${encodeURIComponent(orderId)}`);
      if (!response.ok) continue;
      const order = await response.json();
      if (order.status === 'paid') return markPaymentComplete(orderId);
      if (order.status === 'failed') throw new Error('M-Pesa payment was cancelled or declined.');
    }
    throw new Error('We could not confirm the payment yet. Check your M-Pesa prompt and try again shortly.');
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setPaymentError('');
    setIsProcessing(true);

    try {
      if (paymentMethod !== 'mpesa') throw new Error('Card payments are not available yet. Please select M-Pesa.');
      const response = await fetch(`${API_BASE_URL}/api/quiver/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: phoneNumber, paymentMethod, checkout: checkoutData })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to start M-Pesa payment.');
      setStkSent(true);
      if (result.status === 'paid') return markPaymentComplete(result.orderId);
      await waitForPayment(result.orderId);
    } catch (error) {
      setIsProcessing(false);
      setStkSent(false);
      setPaymentError(error.message || 'Unable to process payment.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-gold"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          position: 'relative',
          color: '#fff'
        }}
      >
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

        {!paymentDone ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>
                <ShieldCheck size={14} /> 256-BIT SECURE CHECKOUT
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>
                COMPLETE <span className="text-gradient-gold">ONLINE PAYMENT</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Instant confirmation for your Quiver Group experience.
              </p>
            </div>

            {/* Summary Box */}
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                Order Summary:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700 }}>
                  {checkoutData.occasion || checkoutData.title || checkoutData.name || 'Quiver VIP Experience'}
                </span>
                <span style={{ fontWeight: 800, color: 'var(--gold-primary)' }}>
                  KES {calculateAmount().toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Venue: {checkoutData.venue || checkoutData.location || 'Quiver Group Kenya'}
              </div>
              {checkoutData.date && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Date & Time: {checkoutData.date} @ {checkoutData.time || 'Evening'}
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Choose Payment Method:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  style={{
                    background: paymentMethod === 'mpesa' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.3)',
                    border: paymentMethod === 'mpesa' ? '2px solid #22c55e' : '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Smartphone size={24} color="#22c55e" />
                  <span>M-PESA Express</span>
                </button>

                <button
                  type="button"
                  disabled
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'not-allowed',
                    opacity: 0.55,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CreditCard size={24} color="var(--gold-primary)" />
                  <span>Card (Coming Soon)</span>
                </button>
              </div>
            </div>

            <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {paymentMethod === 'mpesa' ? (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Email for your receipt:
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', color: '#fff', fontSize: '1rem', outline: 'none', marginBottom: '0.75rem' }}
                  />
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Safaricom M-Pesa Phone Number:
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. 0712 345 678"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.85rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    📲 You will receive an instant STK push prompt on your phone screen to enter your M-Pesa PIN.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Card Number:
                    </label>
                    <input 
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.75rem',
                        color: '#fff'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                        Expiry:
                      </label>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.75rem',
                          color: '#fff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                        CVC:
                      </label>
                      <input 
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.75rem',
                          color: '#fff'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {isProcessing && stkSent && paymentMethod === 'mpesa' && (
                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px dashed #22c55e',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  color: '#4ade80'
                }}>
                  ⏳ STK Prompt Sent to <strong>{phoneNumber}</strong>! Please enter your M-Pesa PIN on your phone screen...
                </div>
              )}

              {paymentError && <div role="alert" style={{ color: '#fca5a5', fontSize: '0.85rem' }}>{paymentError}</div>}

              <button 
                type="submit" 
                className="btn-gold" 
                disabled={isProcessing}
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '0.5rem' }}
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Pay KES {calculateAmount().toLocaleString()} Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Receipt / Digital Pass Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid #22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={36} color="#22c55e" />
            </div>

            <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={14} /> CONFIRMED VIP PASS
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.35rem' }}>
              PAYMENT SUCCESSFUL!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
              Thank you for booking with Quiver Group Kenya.
            </p>

            {/* QR Code Pass Card */}
            <div style={{
              background: '#07070a',
              border: '2px solid var(--gold-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                QUIVER DIGITAL ENTRY PASS
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-primary)', margin: '0.25rem 0 1rem' }}>
                REF: {bookingRef}
              </div>

              {/* QR Icon Graphic */}
              <div style={{
                background: '#fff',
                width: '140px',
                height: '140px',
                margin: '0 auto 1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px'
              }}>
                <QrCode size={110} color="#000" />
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                {checkoutData.occasion || checkoutData.title || checkoutData.name || 'VIP Reservation'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Venue: {checkoutData.venue || checkoutData.location || 'Quiver Kenya'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 700, marginTop: '0.5rem' }}>
                Paid: KES {calculateAmount().toLocaleString()} via {paymentMethod.toUpperCase()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn-gold" onClick={() => window.print()}>
                <Printer size={18} />
                <span>Print VIP Pass</span>
              </button>
              <button className="btn-glass" onClick={onClose}>
                <span>Done & Return</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
