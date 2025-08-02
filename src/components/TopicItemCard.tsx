import React, { useEffect, useState } from 'react';
import type { TaskItem } from '../pages/TasksPage';
import { Difficulty } from '../util/Difficulty';
import { ProgressStatus } from '../util/ProgressStatus';
import API_BASE_URL from '../util/ApiConfig';
import { useAuth } from '../auth/AuthContext';

const TopicItemCard: React.FC<{ topicItemList: TaskItem[] }> = ({ topicItemList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topicItemListState, setTopicItemListState] = useState(topicItemList)
  const { token } = useAuth();

    const handleMarkAsDone = async (itemId: number) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/mark-complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          credentials: 'include', // Optional: if using cookies for auth
          body: JSON.stringify({
            topicItemId: itemId,
            status: "COMPLETED",
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        setTopicItemListState(
          topicItemListState.map(item =>
            item.id === itemId
              ? { ...item, progressStatus: 'COMPLETED' } as TaskItem
              : item
          )
        );
      } catch (err: any) {
        console.error(err);
      }
    };

  return (
    <div className="rounded">
      {/* Topic Items List */}
      {isOpen && (
        <div className="bg-white  pb-2 mx-5 mb-3 bg-slate-300">
          {topicItemListState.map((item) => (
            <div key={item.id} className="py-3 px-6 border-b last:border-none mb-3 rounded-lg bg-slate-100">
              <div className='flex justify-between'>
                <h4 className="font-semibold">{item.title}</h4>
                {item.difficulty==Difficulty.EASY ? (
                  <p className='bg-green-700 text-white text-xs py-1 px-3 border hover:border-transparent rounded-lg'>{item.difficulty}</p>
                ) : item.difficulty==Difficulty.MEDIUM ? (
                  <p className='bg-yellow-700 text-white text-xs py-1 px-3 border hover:border-transparent rounded-lg'>{item.difficulty}</p>
                ) : (
                  <p className='bg-red-700 text-white text-xs py-1 px-3 border hover:border-transparent rounded-lg'>{item.difficulty}</p>
                )}
              </div>
              <div className='flex justify-between'>
                <p className="text-sm">
                Ref 1:{' '}
                <a className="text-blue-600" href={item.reference} target="_blank" rel="noreferrer">
                  {item.reference}
                </a>
                <br />
                  Ref 2:{' '}
                  <a
                    className="text-blue-600"
                    href={item.secondaryReference}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.secondaryReference}
                  </a>
                </p>

                {item.progressStatus == ProgressStatus.IN_PROGRESS ? (
                  <button onClick={() => handleMarkAsDone(item.id)} className="text-xs mt-3 bg-blue-500 hover:bg-blue-400 text-white py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Mark As Done
                  </button>
                ) : (
                  <div className='content-center text-green-600 text-center'>
                    <p>Completed</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='flex bg-slate-500 content-center text-green-600 justify-center py-1' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (<img  className='rotate-90 w-5'  src="./public/arrow.png" />) : 
        (<img  className='-rotate-90 w-5'  src="./public/arrow.png" />)}
      </div>
    </div>
  );
};

export default TopicItemCard;
