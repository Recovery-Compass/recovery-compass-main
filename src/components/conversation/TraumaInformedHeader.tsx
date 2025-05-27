
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TraumaInformedHeader = () => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleQuickExit = () => {
    // Trauma-informed quick exit
    window.location.href = 'https://www.google.com';
  };

  return (
    <header className="trauma-informed-header p-4 flex justify-between items-center relative z-50">
      <div className="logo flex items-center space-x-3">
        <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🧭</span>
        </div>
        <span className="text-xl font-montserrat font-light text-moonlight">Recovery Compass</span>
      </div>

      <Button
        className="quick-exit-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-montserrat font-medium"
        onClick={() => setShowExitConfirm(true)}
      >
        Exit Safely
      </Button>

      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-navy border border-teal/30 rounded-xl p-6 max-w-sm mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-montserrat font-medium mb-4 text-moonlight">Leave safely?</h3>
              <p className="text-moonlight/70 mb-6 font-montserrat">
                This will take you to Google and clear your conversation.
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleQuickExit}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-montserrat"
                >
                  Yes, exit now
                </Button>
                <Button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 bg-moonlight/20 text-moonlight hover:bg-moonlight/30 py-2 rounded-lg font-montserrat"
                >
                  Stay here
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TraumaInformedHeader;
