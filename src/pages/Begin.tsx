import { Link } from 'react-router-dom';
import { trackBusinessEvent } from '../lib/analytics';

export default function Begin() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white tracking-tight mb-8">
          Choose Your Journey
        </h1>

        {/* Organization Card */}
        <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-center text-white tracking-tight mb-4">
            Transform your organization
          </h2>
          <p className="text-base text-center text-gray-300 leading-relaxed mb-6">
            Engage the prompt: Transform organizational challenges.
          </p>
          <Link
            to="/organizations"
            className="block w-full h-14 flex items-center justify-center text-lg font-semibold tracking-wide text-black bg-[#D4AF37] hover:bg-[#E5C158] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Transform your organization"
            onClick={() => trackBusinessEvent('journey_choice', {
              choice: 'organization',
              from: 'begin',
              timestamp: new Date().toISOString(),
            })}
          >
            Continue
          </Link>
        </div>

        {/* Individual Card */}
        <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-center text-white tracking-tight mb-4">
            Begin your journey
          </h2>
          <p className="text-base text-center text-gray-300 leading-relaxed mb-6">
            Explore your personal path and tools.
          </p>
          <Link
            to="/personal"
            className="block w-full h-14 flex items-center justify-center text-lg font-semibold tracking-wide text-black bg-[#D4AF37] hover:bg-[#E5C158] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Begin your individual journey"
            onClick={() => trackBusinessEvent('journey_choice', {
              choice: 'individual',
              from: 'begin',
              timestamp: new Date().toISOString(),
            })}
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}

