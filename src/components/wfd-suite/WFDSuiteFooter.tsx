import { Download } from 'lucide-react';

const WFDSuiteFooter = () => {
  return (
    <>
      {/* Download Instructions */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <Download className="w-6 h-6 text-teal-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-teal-900 mb-2">Export Instructions</h3>
            <p className="text-teal-700 mb-3">
              To capture these visuals for presentations or documentation:
            </p>
            <ol className="list-decimal list-inside text-sm text-teal-700 space-y-1">
              <li>Screenshot each view at full resolution</li>
              <li>Save as PNG files with descriptive names</li>
              <li>Include in presentations, reports, or grant applications</li>
              <li>Reference metrics as evidence of organizational effectiveness</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Recovery Compass Branding */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg">
          <img src="/recovery-compass-logo.png" alt="Recovery Compass Logo" className="h-8 w-auto mr-2" />
          <span>Recovery Compass Strategic Intelligence</span>
        </div>
      </div>
    </>
  );
};

export default WFDSuiteFooter;
