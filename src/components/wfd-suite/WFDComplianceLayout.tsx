import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import WFDSuiteHeader from './WFDSuiteHeader';
import WFDSuiteFooter from './WFDSuiteFooter';

interface WFDComplianceLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function WFDComplianceLayout({ children, title, description }: WFDComplianceLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/wfd/compliance', label: 'Dashboard' },
    { path: '/wfd/compliance/clients', label: 'Client Data' },
    { path: '/wfd/compliance/programs', label: 'Program Performance' },
    { path: '/wfd/compliance/quality', label: 'Data Quality' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <WFDSuiteHeader />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive
                      ? 'border-wfd-blue text-wfd-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <WFDSuiteFooter />
    </div>
  );
}
