
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompassLogo from './CompassLogo';

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Properly spaced and hierarchical */}
          <Link to="/investor-pitch" className="flex items-center space-x-4 group min-w-[280px]">
            <CompassLogo className="w-12 h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <div className="text-bronze font-black text-xl leading-tight tracking-tight">
                Recovery Compass
              </div>
              <div className="text-moonlight/60 text-sm font-medium leading-tight">
                Investor Relations
              </div>
            </div>
          </Link>

          {/* Navigation Links - Centered with proper spacing */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium px-4 py-2 transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'bg-bronze/10 text-bronze border-b-2 border-bronze rounded-none' 
                        : 'text-moonlight/80 hover:text-bronze hover:bg-bronze/5'
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button - Right aligned with professional styling */}
          <div className="hidden lg:flex items-center min-w-[200px] justify-end">
            <Button 
              variant="cta" 
              size="default"
              className="bg-bronze text-navy hover:bg-bronze/90 font-semibold px-6 py-2.5 transition-all duration-200"
            >
              Partner With Us
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-moonlight"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden pb-4 border-t border-bronze/10 mt-4">
          <div className="flex flex-col space-y-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'bg-bronze/10 text-bronze' 
                    : 'text-moonlight/80 hover:text-bronze hover:bg-bronze/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button 
                variant="cta" 
                size="default"
                className="w-full bg-bronze text-navy hover:bg-bronze/90 font-semibold"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InvestorNavigation;
