interface Perfume {
    // isPremium: any;
    _id: string;
    name: string;
    price: number;
    description: { _type: string; children: { text: string }[] }[];
    images: { asset: any }[];
    // slug: { current: string };
    scentProfile?: string[]; // ✅ new
    promotion?: string;
    isPremium?: string;
  }
  
// Helper function
export const openWhatsApp = (perfumeName: string, quickViewPerfume?: Perfume) => {
    console.log("quickViewPerfume", quickViewPerfume);
    const message = `Hi! I'm interested in the ${perfumeName}. Could you share more details?`;
    const url = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };