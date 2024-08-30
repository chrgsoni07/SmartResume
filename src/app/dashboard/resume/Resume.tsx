export type Resume = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  careerObjective: string;
  education: Education[];
  skills: string[];
  skillsCategory: SkillsCategory;
  jobTitle: string;
  projects: Projects[];
  workExperience: WorkExperience[];
  suggestions: Suggestion[];
};

interface SkillsCategory {
  [key: string]: string[];
}

export type Education = {
  degree: string;
  university: string;
  duration: string;
  location: string;
};

export type WorkExperience = {
  company: string;
  jobPosition: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
};

export type Projects = {
  name: string;
  description: string;
  technologies: string[];
};
export type Suggestion = {
  originalText: string;
  suggestedText: string;
};
