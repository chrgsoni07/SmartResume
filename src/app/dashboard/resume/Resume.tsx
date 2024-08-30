export class Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  careerObjective: string;
  education: Education[] = [];
  skills: string[] = [];
  skillsCategory: SkillsCategory;
  jobTitle: string;
  projects: Projects[];
  workExperience: WorkExperience[] = [];
  suggestion: Suggestion[] = [];
}

interface SkillsCategory {
  [key: string]: string[];
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
  responsibilities: string[];
  achievements: string[];
}

export class Projects {
  name: string;
  description: string;
  technologies: string[];
}
export class Suggestion {
  originalText: string;
  suggestedText: string;
}
