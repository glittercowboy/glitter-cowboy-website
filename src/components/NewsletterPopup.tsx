import React, { useState } from 'react';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add webhook integration
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#2D1B00] opacity-20"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-[#EDDABE] p-8 rounded-lg shadow-xl max-w-md w-full">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2D1B00] hover:opacity-70"
        >
          ✕
        </button>
        
        <h2 className="text-2xl text-[#2D1B00] tracking-[0.2em] font-['Ocotillo'] text-center mb-6">
          JOIN THE GLITTER COWBOY FAMILY
        </h2>
        
        <p className="text-[#2D1B00] text-sm tracking-wider text-center mb-8">
          Stay updated with our latest releases and artist news
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="NAME"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 bg-transparent border border-[#2D1B00] text-[#2D1B00] placeholder-[#2D1B00]/60 tracking-[0.2em] text-sm focus:outline-none focus:ring-1 focus:ring-[#2D1B00]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 bg-transparent border border-[#2D1B00] text-[#2D1B00] placeholder-[#2D1B00]/60 tracking-[0.2em] text-sm focus:outline-none focus:ring-1 focus:ring-[#2D1B00]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#2D1B00] text-[#EDDABE] tracking-[0.2em] text-sm hover:bg-[#2D1B00]/90 transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
