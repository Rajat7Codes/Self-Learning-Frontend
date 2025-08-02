import React from 'react';

interface TopicItem {
  title: string;
  done: boolean;
}

interface Topic {
  title: string;
  completed: number;
  total: number;
  items: TopicItem[];
}

interface Division {
  title: string;
  topics: Topic[];
}

interface Section {
  section: string;
  percentage: number;
  divisions: Division[];
}

const progressData: Section[] = [
  {
    section: 'Java',
    percentage: 70,
    divisions: [
      {
        title: 'OOP',
        topics: [
          {
            title: 'Abstraction',
            completed: 2,
            total: 3,
            items: [
              { title: 'abstract keyword', done: true },
              { title: 'real-world example', done: false },
              { title: 'interface use-case', done: true },
            ],
          },
        ],
      },
    ],
  },
];

const ProgressPage: React.FC = () => {
  return (
    <div></div>
  )
};

export default ProgressPage;