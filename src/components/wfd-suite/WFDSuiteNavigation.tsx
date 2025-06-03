
import React from 'react';

interface WFDSuiteNavigationProps {
  activeAttachment: string;
  onAttachmentChange: (attachment: string) => void;
}

const WFDSuiteNavigation = ({ activeAttachment, onAttachmentChange }: WFDSuiteNavigationProps) => {
  const attachments = [
    { id: 'dashboard', label: 'Executive Dashboard' },
    { id: 'translator', label: 'Impact Translator' },
    { id: 'workflow', label: 'Workflow Map' }
  ];

  return (
    <div className="flex space-x-4 mb-8">
      {attachments.map((attachment) => (
        <button
          key={attachment.id}
          onClick={() => onAttachmentChange(attachment.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeAttachment === attachment.id
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {attachment.label}
        </button>
      ))}
    </div>
  );
};

export default WFDSuiteNavigation;
