export class Resume {
  name: string = '';
  email: string;
  phone: string;
  location: string;
  careerObjective: string;
  education: Education[] = [];
  skills: string[] = [];
  jobTitle: string;
  projects: Projects[] = [];
  workExperience: WorkExperience[] = [];
  suggestion: Suggestion[] = [];
}

export class Education {
  degree: string;
  university: string;
  duration: string;
  location: string;
}

export class WorkExperience {
  company: string;
  jobPosition: string;
  duration: string;
  location: string;
  responsibilities: string[] = [];
  achievements: string[] = [];
}

export class Projects {
  name: string;
  description: string;
  technologies: string[] = [];
}

export class Suggestion {
  originalText: string;
  suggestedText: string;
}
