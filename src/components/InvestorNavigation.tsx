
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CompassLogo } from './CompassLogo';

const InvestorNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/investor-pitch', label: 'Overview' },
    { path: '/market-analysis', label: 'Market' },
    { path: '/solution-demo', label: 'Solution' },
    { path: '/business-model', label: 'Business' },
    { path: '/impact-metrics', label: 'Impact' },
    { path: '/roadmap', label: 'Roadmap' }
  ];

  return (
    <nav className="bg-navy/95 backdrop-blur-sm border-b border-bronze/20 sticky top-0 z-50">
      <div className="content-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/investor-pitch" className="flex items-center space-x-3 group">
            <CompassLogo className="w-10 h-10" />
            <div>
              <div className="text-bronze font-black text-lg leading-tight">Recovery Compass</div>
              <div className="text-moonlight/70 text-sm font-medium">Investor Relations</div>
            </div>
          </Link>

          {/* Navigation Links */}
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
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="cta" size="sm">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InvestorNavigation;
