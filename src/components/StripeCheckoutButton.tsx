import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StripeCheckoutButtonProps {
  productName: string;
  amount: number;
  description: string;
  buttonText: string;
  className?: string;
}

export const StripeCheckoutButton = ({ 
  productName, 
  amount, 
  description, 
  buttonText, 
  className 
}: StripeCheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // TODO: Implement Stripe checkout session creation
      // For now, redirect to a payment form or show a coming soon message
      alert(`Checkout for ${productName} - $${(amount / 100).toFixed(2)}\n\nStripe integration coming soon. This will redirect to secure payment processing.`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment processing temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      disabled={loading}
      className={cn(
        'px-16 py-8 text-xl font-body font-bold tracking-wide',
        'bg-gradient-to-r from-compass-gold to-tree-copper text-midnight-foundation',
        'hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105',
        'rounded-md uppercase disabled:opacity-50',
        className
      )}
    >
      {loading ? 'Processing...' : buttonText}
    </Button>
  );
};