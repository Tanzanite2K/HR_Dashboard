
import { useState, useEffect } from 'react';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  image: string;
  department: string;
  rating: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  bio: string;
  projects: string[];
  feedback: Array<{
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  performanceHistory: Array<{
    month: string;
    rating: number;
    projects: number;
  }>;
}

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
  'Operations', 'Design', 'Customer Support'
];

const generateBio = (firstName: string, department: string) => {
  const bios = [
    `${firstName} is a dedicated professional in ${department} with a passion for innovation and teamwork.`,
    `With years of experience in ${department}, ${firstName} brings expertise and leadership to every project.`,
    `${firstName} is known for exceptional problem-solving skills and collaborative approach in ${department}.`,
    `A results-driven individual, ${firstName} excels in ${department} and mentors junior team members.`
  ];
  return bios[Math.floor(Math.random() * bios.length)];
};

const generateProjects = () => {
  const projects = [
    'Q4 Revenue Growth Initiative', 'Customer Onboarding Optimization', 
    'Data Analytics Dashboard', 'Mobile App Redesign', 'Process Automation',
    'Team Training Program', 'Market Research Study', 'Product Launch Campaign'
  ];
  const numProjects = Math.floor(Math.random() * 4) + 1;
  return projects.sort(() => 0.5 - Math.random()).slice(0, numProjects);
};

const generateFeedback = () => {
  const authors = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emma Wilson', 'Alex Brown'];
  const comments = [
    'Excellent team player with great communication skills',
    'Consistently delivers high-quality work on time',
    'Shows great initiative and problem-solving abilities',
    'Very collaborative and helpful to colleagues',
    'Strong technical skills and attention to detail'
  ];
  
  return Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => ({
    id: i + 1,
    author: authors[Math.floor(Math.random() * authors.length)],
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const generatePerformanceHistory = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    rating: Math.floor(Math.random() * 2) + 3.5, // 3.5-5 rating
    projects: Math.floor(Math.random() * 5) + 1
  }));
};

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        const enhancedEmployees: Employee[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          phone: user.phone,
          image: user.image,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
          address: {
            street: user.address.address,
            city: user.address.city,
            state: user.address.state,
            country: user.address.country
          },
          bio: generateBio(user.firstName, departments[Math.floor(Math.random() * departments.length)]),
          projects: generateProjects(),
          feedback: generateFeedback(),
          performanceHistory: generatePerformanceHistory()
        }));

        setEmployees(enhancedEmployees);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
