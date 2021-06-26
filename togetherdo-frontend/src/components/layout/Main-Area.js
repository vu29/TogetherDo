import React from 'react';

import { TaskArea } from '../Task-Area';
import { SidePanel } from './Side-Panel';

export const MainArea = () => {
    return(
        <div className="main-area">
            <TaskArea />
            <SidePanel />
        </div>
    )
}
