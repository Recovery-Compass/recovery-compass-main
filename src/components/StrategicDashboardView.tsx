
import React, { useState, useEffect } from 'react';
import styles from './StrategicDashboardView.module.css';
import {
  RefreshCw,
  TrendingUp,
  Users,
  Home,
  Clock,
  Heart,
  Calendar
} from 'lucide-react';

interface MetricCardData {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  insightTag: string;
  status: 'excellent' | 'good' | 'attention' | 'neutral';
  icon: React.ReactNode;
  unit?: string;
}

const StrategicDashboardView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const metricsData: MetricCardData[] = [
    {
      id: 'bed-utilization',
      title: 'Bed Utilization Rate',
      value: '35.1',
      subtitle: 'avg nights per resident',
      insightTag: 'Strategic Proof Point',
      status: 'excellent',
      icon: <Calendar />
    },
    {
      id: 'meals-served',
      title: 'Meals Served',
      value: '24,387',
      insightTag: 'Community Impact',
      status: 'excellent',
      icon: <Heart />
    },
    {
      id: 'non-resident-services',
      title: 'Non-Resident Services',
      value: '48',
      insightTag: 'Community Reach',
      status: 'good',
      icon: <Users />
    },
    {
      id: 'housing-placements',
      title: 'Housing Placements',
      value: '91',
      subtitle: '51.1% success rate',
      insightTag: 'Primary Outcome',
      status: 'excellent',
      icon: <Home />
    },
    {
      id: 'avg-days-housing',
      title: 'Avg Days to Housing',
      value: '82',
      insightTag: 'Efficiency Metric',
      status: 'good',
      icon: <Clock />,
      unit: 'days'
    },
    {
      id: 'clinical-integration',
      title: 'Clinical Integration',
      value: '196',
      subtitle: '101 MH + 95 CNA',
      insightTag: 'Service Integration',
      status: 'excellent',
      icon: <TrendingUp />
    }
  ];

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const getStatusBarClass = (status: string) => `${styles.statusBar} ${styles[status]}`;
  const getInsightTagClass = (tag: string) => {
    switch (tag) {
      case 'Strategic Proof Point':
        return `${styles.insightTag} ${styles.strategicProofPoint}`;
      case 'Community Impact':
        return `${styles.insightTag} ${styles.communityImpact}`;
      case 'Primary Outcome':
        return `${styles.insightTag} ${styles.primaryOutcome}`;
      case 'Service Integration':
        return `${styles.insightTag} ${styles.serviceIntegration}`;
      default:
        return `${styles.insightTag} ${styles.default}`;
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.dashboardHeader}>Whittier First Day Executive Dashboard</h1>
              <p className={styles.dashboardSubheader}>
                Clinically Integrated Housing Outcomes — Powered by Recovery Compass
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={styles.refreshButton}
            >
              <RefreshCw className={`${styles.refreshIcon} ${isLoading ? styles.loading : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsContainer}>
        <div className={styles.metricsGrid}>
          {metricsData.map((metric, index) => (
            <div
              key={metric.id}
              className={`${styles.metricCard} ${styles.fadeInCard}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={getStatusBarClass(metric.status)} />
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>{metric.icon}</div>
                <span className={getInsightTagClass(metric.insightTag)}>{metric.insightTag}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.metricTitle}>{metric.title}</h3>
                <div className={styles.metricValueContainer}>
                  <span className={styles.metricValue}>{metric.value}</span>
                  {metric.unit && <span className={styles.metricUnit}>{metric.unit}</span>}
                </div>
                {metric.subtitle && (
                  <p className={styles.metricSubtitle}>{metric.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerSection}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <span className={styles.lastUpdated}>
              Last Updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
            </span>
            <span className={styles.dataSource}>Data integration powered by Coupler.io</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDashboardView;
