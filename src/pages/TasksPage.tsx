import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../util/ApiConfig';
import { useAuth } from '../auth/AuthContext';
import type { TopicType } from '../util/TopicType';
import type { Difficulty } from '../util/Difficulty';
import TopicItemCard from '../components/TopicItemCard';
import { ProgressStatus } from '../util/ProgressStatus';

export interface Task {
  id: number,
  title: string;
  divisionTitle: string;
  sectionTitle: string;
  deadlineDate: string,
  topicItemList: TaskItem[];
}

export interface TaskItem {
  id: number,
  title: string;
  alignment: number,
  reference: string;
  secondaryReference: string;
  difficulty: Difficulty;
  topicType: TopicType;
  progressStatus: ProgressStatus
}

const TasksPage: React.FC = () => {
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const { token } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  

  useEffect(() => {
    const fetchTodaysTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/by-date?date=${today}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          credentials: 'include' // Optional: if using cookies for auth
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: Task[] = await response.json();
        setTodaysTasks(data);
        console.log( new Date(today));
        console.log( new Date())
        console.log( new Date(data[1].deadlineDate))
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchTodaysTasks();
  }, []);


  return (
    <div>
      <div className='todays-tasks mb-3'>
        <div className='bg-black px-5 py-2 text-white rounded-t-lg'>
          Todays Tasks
        </div>
        
        {todaysTasks.filter(task => new Date(task.deadlineDate).getTime() == new Date(today).getTime()).length > 0 ? (
        <div className='flex flex-col'>
          {todaysTasks.filter(task => new Date(task.deadlineDate).getTime() == new Date(today).getTime()).map((topic) => (
            <div className='bg-slate-300'>
              <div className='flex flex-row p-5 pb-3 font-medium'>
                <div className='pr-6 content-center justify-items-center'>
                  <img className='w-8 contrast-100' src="./public/checkmark.png" />
                </div>
                <div className='grow'>
                  <h3 className='text-lg'>{(topic.title)}</h3>
                  <p className='text-xs mb-2'>{(topic.sectionTitle)} - {(topic.divisionTitle)}</p>
                </div>
                <div className='content-center text-green-600 text-center'>
                  {topic.topicItemList.filter(item => item.progressStatus != ProgressStatus.COMPLETED).length <= 0 ? 
                (<p>Completed</p>) : (<p></p>)
                }
                  
                </div>
              </div>
              {topic.topicItemList.filter(item => item.progressStatus != ProgressStatus.COMPLETED).length > 0 ? (
              <TopicItemCard key={topic.id} topicItemList={topic.topicItemList} />) : ( <></>) }
          </div>
          ))}
          <hr />
          {/* <div className='flex flex-row bg-slate-300 p-5 font-medium'>
            <div className='pr-6 content-center justify-items-center'>
              <img className='w-8 grayscale contrast-100' src="./public/checkmark.png" />
            </div>
            <div className='grow'>
              <h3 className='text-lg'>Topic Name</h3>
              <p className='text-xs mb-2'>Section Name - Division Name</p>
              <p className='text-sm'> <a className='text-blue-600' href="https://tailwindcss.com/docs/font-size"> Ref 1 : https://tailwindcss.com/docs/font-size </a></p>
              <p className='text-sm'> <a className='text-blue-600' href="https://tailwindcss.com/docs/font-size"> Ref 2 : https://tailwindcss.com/docs/font-size </a></p>
            </div>
            <div className='content-center'>
              <button className="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-4 border border-slate-700 rounded">
                Mark Done
              </button>
            </div>
          </div> */}
        </div>
        ) : (

        <div className='bg-slate-300 h-48 rounded-b-lg content-center text-center font-medium'>
          No Tasks Pending for Today
        </div>
        )}
      </div>

      <hr />
      
      <div className='overdue'>
        <div className='bg-black px-5 py-2 text-white rounded-t-lg'>
          Tasks Overdue
        </div>
        
        {todaysTasks.filter(
          task => (new Date(task.deadlineDate).getTime() < new Date(today).getTime() && 
            task.topicItemList.filter(item => item.progressStatus != ProgressStatus.COMPLETED).length > 0)).length > 0 ? (
        <div className='flex flex-col'>
          {todaysTasks.filter(
          task => new Date(task.deadlineDate).getTime() < new Date(today).getTime() && 
            task.topicItemList.filter(item => item.progressStatus != ProgressStatus.COMPLETED)).map((topic) => (
            <div className='bg-slate-300'>
              <div className='flex flex-row p-5 pb-3 font-medium'>
                <div className='pr-6 content-center justify-items-center'>
                  <img className='w-8 contrast-100' src="./public/checkmark.png" />
                </div>
                <div className='grow'>{( new Date(topic.deadlineDate).getTime() < new Date(today).getTime() ? ("Yes") : ("No") )}
                  <h3 className='text-lg'>{(topic.title)}</h3>
                  <p className='text-xs mb-2'>{(topic.sectionTitle)} - {(topic.divisionTitle)}</p>
                </div>
              </div>
              <TopicItemCard key={topic.id} topicItemList={topic.topicItemList.filter(item => item.progressStatus != ProgressStatus.COMPLETED)} />
          </div>
          ))} 
        </div>
        ) : ( 
        <div className='bg-slate-300 h-48 rounded-b-lg content-center text-center font-medium'>
          No Tasks Overdue
        </div>
          )};
      </div>
    </div>
  );
};

export default TasksPage;