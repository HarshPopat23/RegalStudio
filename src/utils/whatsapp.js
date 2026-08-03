import { siteConfig } from "../config/siteConfig";
export const generalWhatsAppUrl = () => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Regal Print,\n\nI would like to know more about your decorative cutout designs.")}`;
export const productWhatsAppUrl = (product, category) => {
  const message = `Hello Regal Print,\n\nI want to order this cutout design.\n\nProduct: ${product.name}\nCategory: ${category?.name || "Custom"}\nPrice: ₹${product.price}\nProduct Code: ${product.productCode}\nProduct Link: ${window.location.href}\n\nPlease share customization and delivery details.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
