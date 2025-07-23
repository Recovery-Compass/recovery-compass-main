import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import CompassLogo from './CompassLogo';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/compass-companion', label: 'Compass Companion' },
    { path: '/impact-translator', label: 'Impact Translator' },
    { path: '/partnership-proposals', label: 'Partnership' },
    { path: '/whittier-dashboard', label: 'Whittier Dashboard' },
  ];

  const investorPages = [
    { path: '/investor-pitch', label: 'Overview' },
    { path: '/market-analysis', label: 'Market Analysis' },
    { path: '/solution-demo', label: 'Solution Demo' },
    { path: '/business-model', label: 'Business Model' },
    { path: '/impact-metrics', label: 'Impact Metrics' },
    { path: '/roadmap', label: 'Roadmap' }
  ];

  // Close mobile menu when clicking outside
  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-navy/95 backdrop-blur-sm border-b border-bronze/20 sticky top-0 z-50">
      <div className="content-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-bronze rounded-lg p-1"
            aria-label="Recovery Compass Home"
          >
            <CompassLogo className="w-8 h-8 sm:w-10 sm:h-10" size="sm" priority />
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
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Investors Dropdown - Only show if not on home page */}
            {!isHomePage && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm text-moonlight hover:text-bronze hover:bg-bronze/10 bg-transparent border-none">
                      Investors
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {investorPages.map((page) => (
                          <Link key={page.path} to={page.path}>
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-bronze/10 hover:text-bronze focus:bg-bronze/10 focus:text-bronze">
                              <div className="text-sm font-medium leading-none text-moonlight">
                                {page.label}
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-moonlight focus:ring-2 focus:ring-bronze"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-bronze/20"
            role="menu"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  role="menuitem"
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path) 
                        ? 'bg-bronze text-navy' 
                        : 'text-moonlight hover:text-bronze hover:bg-bronze/10'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Investors Section - Only show if not on home page */}
              {!isHomePage && (
                <>
                  <div className="pt-2 pb-1">
                    <div className="text-moonlight/60 text-sm font-medium px-4">
                      Investors
                    </div>
                  </div>
                  {investorPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={handleMobileMenuClose}
                      role="menuitem"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-moonlight/80 hover:text-bronze hover:bg-bronze/10 pl-8"
                      >
                        {page.label}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};