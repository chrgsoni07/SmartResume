// App.js
import React from 'react';

import RR from './RR';

const RRApp = () => {
  const resumeData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    jobTitle: 'Software Engineer',
    careerObjective: 'Passionate software engineer with 5 years of experience in building scalable web applications.',
    education: ['BSc in Computer Science, University XYZ', 'MSc in Software Engineering, University ABC'],
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
    workExperience: [
      {
        title: 'Senior Developer',
        company: 'Tech Co.',
        dates: 'Jan 2020 - Present',
        description: 'Developed and maintained web applications using React and Node.js.',
      },
      {
        title: 'Junior Developer',
        company: 'Web Solutions Inc.',
        dates: 'Jun 2018 - Dec 2019',
        description: 'Worked on front-end development and contributed to UI/UX design.',
      },
    ],
  };

  return (
    <div>
      <RR {...resumeData} />
    </div>
  );
};

export default RRApp;
