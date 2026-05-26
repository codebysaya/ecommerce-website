import { useState } from 'react';
import { X, CreditCard, Banknote, CheckCircle, QrCode } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, totalAmount, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 1500);
  };

  // Generate a real-looking QR Code for UPI
  const upiUrl = `upi://pay?pa=saranya06072003@oksbi&pn=EShop&am=${totalAmount}&cu=INR`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} disabled={isProcessing || isSuccess}>
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="payment-success-view">
            <CheckCircle size={64} className="success-icon" />
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
        ) : (
          <div className="checkout-view">
            <h2 className="modal-title">Checkout</h2>
            <p className="checkout-subtitle">Total Amount to Pay: <strong>${totalAmount.toFixed(2)}</strong></p>

            <div className="payment-options">
              <div 
                className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="option-icon-wrap upi-bg"><QrCode size={24} color="#fff" /></div>
                <div className="option-details">
                  <h3>UPI Pay</h3>
                  <p>Google Pay, PhonePe, Paytm</p>
                </div>
              </div>

              <div 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="option-icon-wrap cod-bg"><Banknote size={24} color="#fff" /></div>
                <div className="option-details">
                  <h3>Cash on Delivery</h3>
                  <p>Pay when your order arrives</p>
                </div>
              </div>
            </div>

            {paymentMethod === 'upi' && (
              <div className="upi-payment-section">
                <p className="scan-instruction">Scan the QR code using any UPI app to pay</p>
                <div className="qr-code-container">
                  <img src={qrCodeImageUrl} alt="UPI QR Code" className="qr-code-image" />
                </div>
                <p className="upi-id">Merchant UPI ID: <strong>saranya06072003@oksbi</strong></p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="cod-payment-section">
                <p>You will pay <strong>${totalAmount.toFixed(2)}</strong> in cash when the delivery agent arrives at your doorstep.</p>
              </div>
            )}

            <button 
              className={`btn-primary w-full mt-4 pay-btn ${!paymentMethod || isProcessing ? 'disabled' : ''}`}
              disabled={!paymentMethod || isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? 'Processing...' : paymentMethod === 'upi' ? 'I have completed the payment' : 'Confirm Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
