
import CompassLogo from '@/components/CompassLogo';

const Footer = () => {
  return (
    <footer className="bg-navy py-10 border-t border-bronze/30">
      <div className="content-container text-center">
        <CompassLogo size="sm" animated={false} className="mx-auto mb-6" />
        <p className="text-moonlight/60 text-sm">
          © {new Date().getFullYear()} Recovery Compass. All rights reserved.
        </p>
        <p className="text-moonlight/40 text-xs mt-2">
          Supporting transformation through environmental design and dignified remembrance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
