import React, { useState } from 'react';
import { X, CheckCircle, Truck, Store, CreditCard, Banknote, Smartphone, HelpCircle } from 'lucide-react';
import { CartItem, Language, DeliveryMethod, PaymentMethod, Order } from '../types';
import { translations } from '../translations';
import { formatTenge } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  defaultCity?: string;
  onSubmitOrder: (orderData: {
    clientName: string;
    phone: string;
    whatsapp?: string;
    city: string;
    address: string;
    comment?: string;
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
  }) => Order;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  language,
  defaultCity = 'Атырау',
  onSubmitOrder,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kaspi');
  const [errorMsg, setErrorMsg] = useState('');

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg(language === 'ru' ? 'Пожалуйста, введите ваше имя' : 'Атыңызды енгізіңіз');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(language === 'ru' ? 'Пожалуйста, введите номер телефона' : 'Телефон нөмірін енгізіңіз');
      return;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setErrorMsg(language === 'ru' ? 'Пожалуйста, укажите адрес доставки' : 'Жеткізу мекенжайын көрсетіңіз');
      return;
    }

    setErrorMsg('');
    onSubmitOrder({
      clientName: clientName.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || undefined,
      city: city.trim() || 'Атырау',
      address: deliveryMethod === 'pickup' ? (language === 'ru' ? 'Самовывоз: Бутик №24' : 'Өздігінен алып кету: №24 бутик') : address.trim(),
      comment: comment.trim() || undefined,
      deliveryMethod,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#111117] border border-[#2A2A38] rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#20202C] bg-[#14141E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F4F1EA]">
              {t.checkoutTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1C1C26] hover:bg-[#282836] text-[#A6A29A] hover:text-[#F4F1EA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Miniature */}
        <div className="bg-[#171722] px-4 py-3 border-b border-[#20202C] flex items-center justify-between text-xs">
          <span className="text-[#99948A]">
            {items.length} {language === 'ru' ? 'наим. товара' : 'тауар түрі'}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#99948A]">{t.total}:</span>
            <span className="font-bold text-[#D4AF37] text-sm">
              {formatTenge(totalAmount)}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#331818] border border-[#7B2424] text-[#FC8181] text-xs">
              {errorMsg}
            </div>
          )}

          {/* Customer info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#C5A059] uppercase tracking-wider mb-1">
                {t.clientName} *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={language === 'ru' ? 'Иван / Айбек' : 'Айбек / Динара'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171722] border border-[#2A2A38] focus:border-[#D4AF37] text-sm text-[#F4F1EA] outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#C5A059] uppercase tracking-wider mb-1">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (701) 000-00-00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171722] border border-[#2A2A38] focus:border-[#D4AF37] text-sm text-[#F4F1EA] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A6A29A] uppercase tracking-wider mb-1">
                  {t.whatsapp}
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+7 (701) 000-00-00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171722] border border-[#2A2A38] focus:border-[#D4AF37] text-sm text-[#F4F1EA] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block text-xs font-medium text-[#C5A059] uppercase tracking-wider mb-2">
              {t.deliveryMethod}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  deliveryMethod === 'delivery'
                    ? 'bg-[#1C1C29] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A] hover:border-[#38384A]'
                }`}
              >
                <Truck className={`w-4 h-4 mt-0.5 ${deliveryMethod === 'delivery' ? 'text-[#D4AF37]' : 'text-[#7A756D]'}`} />
                <div>
                  <div className={`text-xs font-semibold ${deliveryMethod === 'delivery' ? 'text-[#F4F1EA]' : 'text-[#A6A29A]'}`}>
                    {t.delivery}
                  </div>
                  <div className="text-[10px] text-[#7A756D] mt-0.5">По городу Атырау / РК</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  deliveryMethod === 'pickup'
                    ? 'bg-[#1C1C29] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A] hover:border-[#38384A]'
                }`}
              >
                <Store className={`w-4 h-4 mt-0.5 ${deliveryMethod === 'pickup' ? 'text-[#D4AF37]' : 'text-[#7A756D]'}`} />
                <div>
                  <div className={`text-xs font-semibold ${deliveryMethod === 'pickup' ? 'text-[#F4F1EA]' : 'text-[#A6A29A]'}`}>
                    {t.pickup}
                  </div>
                  <div className="text-[10px] text-[#7A756D] mt-0.5">Бутик №24 (бесплатно)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Address fields (if delivery) */}
          {deliveryMethod === 'delivery' && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-[#A6A29A] uppercase tracking-wider mb-1">
                    {t.city}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171722] border border-[#2A2A38] text-sm text-[#F4F1EA] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#C5A059] uppercase tracking-wider mb-1">
                    {t.address} *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === 'ru' ? 'Улица, дом, квартира' : 'Көше, үй, пәтер'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171722] border border-[#2A2A38] focus:border-[#D4AF37] text-sm text-[#F4F1EA] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-medium text-[#C5A059] uppercase tracking-wider mb-2">
              {t.paymentMethod}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('kaspi')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'kaspi'
                    ? 'bg-[#1C1C29] border-[#D4AF37] text-[#F4F1EA]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A]'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#F56565]" />
                <span className="text-xs font-medium">{t.kaspi}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-[#1C1C29] border-[#D4AF37] text-[#F4F1EA]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A]'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#48BB78]" />
                <span className="text-xs font-medium">{t.cash}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'transfer'
                    ? 'bg-[#1C1C29] border-[#D4AF37] text-[#F4F1EA]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#4299E1]" />
                <span className="text-xs font-medium">{t.transfer}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('other')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'other'
                    ? 'bg-[#1C1C29] border-[#D4AF37] text-[#F4F1EA]'
                    : 'bg-[#15151E] border-[#252533] text-[#A6A29A]'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-[#A0AEC0]" />
                <span className="text-xs font-medium">{t.otherPayment}</span>
              </button>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-medium text-[#A6A29A] uppercase tracking-wider mb-1">
              {t.orderComment}
            </label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={language === 'ru' ? 'Удобное время доставки, пожелания к заказу...' : 'Жеткізуге ыңғайлы уақыт, тілектер...'}
              className="w-full px-3.5 py-2 rounded-xl bg-[#171722] border border-[#2A2A38] text-sm text-[#F4F1EA] outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#C5A059] hover:from-[#DFBF58] hover:to-[#B68E33] text-[#0B0B0E] shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            >
              {t.submitOrder} · {formatTenge(totalAmount)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
