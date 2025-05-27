
export interface QuestionContext {
  previousResponses: string[];
  detectedThemes: string[];
  depth: number;
}

export class ConversationLogic {
  private spaceKeywords = ['room', 'bedroom', 'car', 'kitchen', 'park', 'garden', 'office', 'bathroom', 'living room', 'basement', 'attic', 'balcony', 'porch'];
  private feelingKeywords = ['safe', 'peaceful', 'calm', 'chaotic', 'overwhelming', 'comfortable', 'anxious', 'free', 'trapped', 'secure'];
  private peopleKeywords = ['friend', 'family', 'partner', 'alone', 'myself', 'nobody', 'people', 'others', 'someone'];
  private challengeKeywords = ['stress', 'difficult', 'hard', 'struggle', 'cope', 'overwhelm', 'pain', 'hurt', 'tired'];

  getStartingQuestion(): string {
    return "What's one place where you feel most like yourself?";
  }

  analyzeResponse(response: string): { themes: string[], categories: string[] } {
    const lowerResponse = response.toLowerCase();
    const themes: string[] = [];
    const categories: string[] = [];

    // Detect spaces
    this.spaceKeywords.forEach(keyword => {
      if (lowerResponse.includes(keyword)) {
        themes.push(keyword);
        categories.push('space');
      }
    });

    // Detect feelings
    this.feelingKeywords.forEach(keyword => {
      if (lowerResponse.includes(keyword)) {
        themes.push(keyword);
        categories.push('feeling');
      }
    });

    // Detect people
    this.peopleKeywords.forEach(keyword => {
      if (lowerResponse.includes(keyword)) {
        themes.push(keyword);
        categories.push('people');
      }
    });

    // Detect challenges
    this.challengeKeywords.forEach(keyword => {
      if (lowerResponse.includes(keyword)) {
        themes.push(keyword);
        categories.push('challenge');
      }
    });

    return { themes, categories };
  }

  generateFollowUpQuestion(response: string, context: QuestionContext): string {
    const analysis = this.analyzeResponse(response);
    const { themes, categories } = analysis;

    // Space-focused questions
    if (categories.includes('space') && context.depth < 3) {
      const spaceTheme = themes.find(theme => this.spaceKeywords.includes(theme));
      if (spaceTheme) {
        return this.getSpaceFollowUp(spaceTheme, response);
      }
    }

    // Feeling-focused questions
    if (categories.includes('feeling') && context.depth < 4) {
      const feelingTheme = themes.find(theme => this.feelingKeywords.includes(theme));
      if (feelingTheme) {
        return this.getFeelingFollowUp(feelingTheme);
      }
    }

    // People-focused questions
    if (categories.includes('people') && context.depth < 5) {
      return this.getPeopleFollowUp();
    }

    // Challenge-focused questions
    if (categories.includes('challenge') && context.depth < 6) {
      return this.getChallengeFollowUp();
    }

    // General follow-ups based on depth
    return this.getDepthBasedQuestion(context.depth);
  }

  private getSpaceFollowUp(spaceTheme: string, originalResponse: string): string {
    const spaceQuestions = {
      'bedroom': "What is it about your bedroom that makes it special to you?",
      'car': "Tell me more about what makes your car feel like your space.",
      'kitchen': "What happens in your kitchen that makes you feel most yourself?",
      'park': "What draws you to that particular outdoor space?",
      'room': "What elements in that room create that feeling for you?",
      'office': "What about your office space helps you feel authentic?",
      'bathroom': "That's interesting - what makes that private space meaningful?",
      'living room': "What activities or moments in your living room feel most genuine?",
      'garden': "What is it about being in that garden space that resonates with you?"
    };

    return spaceQuestions[spaceTheme as keyof typeof spaceQuestions] || 
           "What specifically about that place makes it feel like yours?";
  }

  private getFeelingFollowUp(feelingTheme: string): string {
    const feelingQuestions = {
      'safe': "Are there other places that give you that same sense of safety?",
      'peaceful': "What creates that peacefulness for you in that space?",
      'calm': "When you think of other calm spaces, what comes to mind?",
      'comfortable': "What makes a space feel comfortable versus uncomfortable for you?",
      'free': "That sense of freedom - where else do you experience that?",
      'chaotic': "When things feel chaotic, where do you go to find balance?",
      'overwhelming': "What kinds of spaces help when you're feeling overwhelmed?"
    };

    return feelingQuestions[feelingTheme as keyof typeof feelingQuestions] || 
           "How do different spaces affect how you feel throughout your day?";
  }

  private getPeopleFollowUp(): string {
    const peopleQuestions = [
      "Are there spaces where you connect most easily with others?",
      "When you want to be around people, where do you naturally go?",
      "What spaces help you feel understood by others?",
      "Where do you feel most comfortable being yourself around others?"
    ];
    return peopleQuestions[Math.floor(Math.random() * peopleQuestions.length)];
  }

  private getChallengeFollowUp(): string {
    const challengeQuestions = [
      "When you're going through something difficult, what space calls to you?",
      "Are there places that help you process challenging emotions?",
      "What environment helps you feel stronger when things are hard?",
      "Where do you go when you need to recharge or recover?"
    ];
    return challengeQuestions[Math.floor(Math.random() * challengeQuestions.length)];
  }

  private getDepthBasedQuestion(depth: number): string {
    const deepQuestions = [
      "If you could design the perfect space for yourself, what would it include?",
      "What's one small change you could make to your current environment?",
      "How do you think your ideal spaces have changed over time?",
      "What space would you want to share with someone important to you?"
    ];
    return deepQuestions[Math.min(depth - 3, deepQuestions.length - 1)] || 
           "Thank you for sharing. Let me show you what I've learned about your environmental preferences.";
  }

  shouldCompleteConversation(depth: number): boolean {
    return depth >= 6;
  }
}
