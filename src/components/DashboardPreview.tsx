import { Card } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'excellent';
}

const MetricCard = ({ label, value, status }: MetricCardProps) => {
  const statusColors = {
    excellent: 'text-green-400 border-green-400/30',
    good: 'text-blue-400 border-blue-400/30',
    warning: 'text-amber-400 border-amber-400/30'
  };

  return (
    <Card className={`bg-midnight-foundation/80 backdrop-blur border p-4 ${statusColors[status]}`}>
      <div className="text-center">
        <div className="text-2xl font-bold font-body mb-1">{value}</div>
        <div className="text-sm text-moon-glow/70 font-body">{label}</div>
      </div>
    </Card>
  );
};

export const DashboardPreview = () => {
  return (
    <div className="bg-midnight-foundation/50 rounded-lg p-8 max-w-5xl mx-auto border border-compass-gold/20">
      <div className="bg-black/50 p-4 rounded-t-lg border-b border-compass-gold/10 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-moon-glow font-heading heading-confident">Healthcare Partner Transformation</h3>
          <span className="text-compass-gold text-sm font-body">90-Day Results</span>
        </div>
      </div>
      
      <div className="compliance-progress bg-deep-ocean/40 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold font-body text-amber-400">72%</div>
            <div className="text-sm text-moon-glow/60">Initial</div>
          </div>
          <div className="text-compass-gold text-3xl">→</div>
          <div className="text-center">
            <div className="text-4xl font-bold font-body text-green-400">94%</div>
            <div className="text-sm text-moon-glow/60">Current</div>
          </div>
        </div>
        <div className="text-center mt-3">
          <div className="text-moon-glow font-body font-bold">Overall Compliance</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard label="HMIS Data Quality" value="89%" status="good" />
        <MetricCard label="Housing Outcomes" value="91%" status="good" />
        <MetricCard label="Assessment Completion" value="78%" status="warning" />
        <MetricCard label="Service Documentation" value="95%" status="excellent" />
      </div>
      
      <div className="text-center">
        <p className="text-moon-glow/50 text-xs font-body italic">
          *Results from Healthcare Network implementation
        </p>
      </div>
    </div>
  );
};