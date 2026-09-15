import { CartItem, OrderItem } from '../types';

/**
 * Formats a number into Kazakhstani Tenge format, e.g. "8 000 ₸"
 */
export function formatTenge(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} ₸`;
}

/**
 * Builds a direct WhatsApp click-to-chat URL with pre-filled order text
 */
export function generateWhatsAppOrderUrl({
  whatsappNumber,
  items,
  totalAmount,
  clientName,
  phone,
  address,
  deliveryMethod,
  orderNumber,
}: {
  whatsappNumber: string;
  items: (CartItem | OrderItem)[];
  totalAmount: number;
  clientName?: string;
  phone?: string;
  address?: string;
  deliveryMethod?: string;
  orderNumber?: string;
}): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  let text = 'Здравствуйте! Хочу оформить заказ в MUSLIM SHOP:\n\n';
  if (orderNumber) {
    text = `Здравствуйте! Заказ ${orderNumber} в MUSLIM SHOP:\n\n`;
  }

  items.forEach((item) => {
    const title = 'product' in item ? item.product.titleRu : item.title;
    const price = 'product' in item ? item.product.price : item.price;
    text += `• ${title} — ${formatTenge(price)} × ${item.quantity}\n`;
  });

  text += `\nИтого: ${formatTenge(totalAmount)}\n`;

  if (clientName) text += `Имя: ${clientName}\n`;
  if (phone) text += `Телефон: ${phone}\n`;
  if (address) text += `Адрес/Доставка: ${address}\n`;
  if (deliveryMethod) text += `Способ: ${deliveryMethod}\n`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats phone number nicely for display
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'))) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  }
  return phone;
}
