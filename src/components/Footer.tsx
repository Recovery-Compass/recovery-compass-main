import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-midnight-foundation border-t border-compass-gold/20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-moon-glow/60 font-body text-sm">
            © 2025 Recovery Compass. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="/privacy-policy"
              className="text-moon-glow/60 hover:text-compass-gold font-body text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service"
              className="text-moon-glow/60 hover:text-compass-gold font-body text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}