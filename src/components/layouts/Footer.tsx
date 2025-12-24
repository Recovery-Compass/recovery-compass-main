import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-midnight-foundation border-t border-compass-gold/20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-6">
          {/* 501(c)(3) Legal Compliance Notice */}
          <div className="text-center">
            <p className="text-moon-glow/80 font-body text-sm leading-relaxed">
              ERD Method is the proprietary framework and operating program of Recovery Compass,
              a registered 501(c)(3) nonprofit organization. EIN: 33-3213246
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-4 border-t border-compass-gold/10">
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
      </div>
    </footer>
  );
}