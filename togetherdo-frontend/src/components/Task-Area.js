import React from 'react';

import { GetTasks } from '../hooks';
import { AddNewTask } from './AddNewTask';
import { Checkbox } from './Checkbox';

export const TaskArea = () => {
    const { tasks } = GetTasks();

    return(
        <div className="tasks">
            <ul className="task-list">
                {tasks.map(task => {
                    <li key={`${task.taskId}`}>
                        <Checkbox />
                        <span className="task-title">
                            {task.title}
                        </span>
                        <span className="task-finish-date">
                            {task.finishDate}
                        </span>
                    </li>
                })}
            </ul>

            <AddNewTask />

        </div>
    );
};
