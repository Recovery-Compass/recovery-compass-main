
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  domain: string;
  privacy_level: string;
}

interface AssessmentQuestionProps {
  question: Question;
  response: string;
  onResponse: (response: string) => void;
}

const AssessmentQuestion = ({ question, response, onResponse }: AssessmentQuestionProps) => {
  const options = Array.isArray(question.options) ? question.options : [];

  return (
    <Card className="bg-navy/50 border-bronze/30 p-8">
      <h2 className="text-2xl font-montserrat font-bold text-moonlight mb-6">
        {question.question_text}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              'w-full text-left justify-start p-4 h-auto transition-all duration-200',
              'border-bronze/30 text-moonlight hover:border-bronze hover:bg-bronze/10',
              response === option && 'border-bronze bg-bronze/20 text-bronze'
            )}
            onClick={() => onResponse(option)}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                'w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0',
                'border-bronze transition-all duration-200',
                response === option ? 'bg-bronze' : 'bg-transparent'
              )} />
              <span className="text-left leading-relaxed">
                {option}
              </span>
            </div>
          </Button>
        ))}
      </div>

      {question.privacy_level && (
        <div className="mt-4 text-xs text-moonlight/50 italic">
          Privacy level: {question.privacy_level}
        </div>
      )}
    </Card>
  );
};

export default AssessmentQuestion;
