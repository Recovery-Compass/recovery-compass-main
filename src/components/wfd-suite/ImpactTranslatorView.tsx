import { FileText } from 'lucide-react';

const ImpactTranslatorView = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Impact Translator</h2>
      <p className="text-gray-600">"You keep caring. We'll make sure your story gets funded."</p>
    </div>

    <div className="grid grid-cols-2 gap-8">
      {/* Input Side */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentic Story Input</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-700">
            "Last month, Marcus came to us after three failed shelter placements. Traditional programs rushed him into housing before addressing his PTSD and substance use. We gave him 42 days to rebuild trust, work through trauma, and develop sustainable coping strategies. Today, Marcus has his own apartment and volunteers here weekly—not because he has to, but because he wants to give back."
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who do you serve?</label>
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Adults experiencing homelessness with trauma histories</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What's your approach?</label>
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Trauma-informed, depth-over-speed engagement model</div>
          </div>
        </div>
      </div>

      {/* Output Side */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grant-Ready Output</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-700">
            "Through a trauma-informed, relationship-based engagement model (average 35-day therapeutic intervention), WFD achieved a 51% permanent housing placement rate, exceeding national benchmarks for emergency intervention models. Marcus's case illustrates the effectiveness of sustained, individualized support—addressing root causes rather than symptoms—aligning with HUD's evidence-based practice requirements and SAMHSA's trauma-informed care standards."
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Evidence Integration:</span>
            <span className="text-sm text-green-600">✓ HUD Benchmarks</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Compliance Language:</span>
            <span className="text-sm text-green-600">✓ SAMHSA Standards</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Measurable Outcomes:</span>
            <span className="text-sm text-green-600">✓ Quantified Results</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 text-center">
      <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">
        <FileText className="w-4 h-4 mr-2" />
        Transform to Grant Language
      </div>
    </div>
  </div>
);

export default ImpactTranslatorView;
