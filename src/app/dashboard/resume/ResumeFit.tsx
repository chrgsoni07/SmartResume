export type ResumeFit = {
  jobTitle: string;
  domainRelevance: string;
  ats_score: number;
  feedback: string;
  suggestedImprovements: SuggestedImprovement[];
  additionalSkills: string[];
};

export type SuggestedImprovement = {
  originalText: string;
  suggestedChange: string;
};
