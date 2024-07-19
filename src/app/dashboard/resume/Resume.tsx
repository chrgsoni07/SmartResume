export class Resume {
  name: string = '';
  email: string;
  phone: string;
  location: string;
  careerObjective: string;
  education: Education[] = [];
  skills: string[] = [];
  jobTitle: string;
  projects: projects[] = [];
  workExperience: WorkExperience[] = [];
  suggestions: suggestions[] = [];
}

class Education {
  degree: string;
  university: string;
  duration: string;
  location: string;
}

class WorkExperience {
  company: string;
  jobPosition: string;
  duration: string;
  location: string;
  responsibilities: string[] = [];
  achievements: string[] = [];
}

class projects {
  name: string;
  description: string;
  technologies: string[] = [];
}

class suggestions {
  originalText: string;
  suggestedText: string;
}
