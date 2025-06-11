
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ExternalLink } from 'lucide-react';
import { CompassLogo } from './CompassLogo';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/compass-companion', label: 'Compass Companion' },
    { path: '/impact-translator', label: 'Impact Translator' },
    { path: '/partnership-proposals', label: 'Partnership' },
  ];

  return (
    <nav className="bg-navy/95 backdrop-blur-sm border-b border-bronze/20 sticky top-0 z-50">
      <div className="content-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <CompassLogo className="w-10 h-10" />
            <span className="text-bronze font-black text-xl tracking-tight">
              Recovery Compass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`text-sm ${
                    isActive(item.path) 
                      ? 'bg-bronze text-navy' 
                      : 'text-moonlight hover:text-bronze hover:bg-bronze/10'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Investor Relations Link */}
            <Link to="/investor-pitch">
              <Button
                variant="ghost"
                className="text-sm text-moonlight hover:text-bronze hover:bg-bronze/10"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Investors
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-moonlight"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-bronze/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path) 
                        ? 'bg-bronze text-navy' 
                        : 'text-moonlight hover:text-bronze hover:bg-bronze/10'
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <Link
                to="/investor-pitch"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-moonlight hover:text-bronze hover:bg-bronze/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Investor Relations
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
