import React, { useState, useEffect } from 'react';

export const GetTasks = () => {
    const [tasks, setTasks] = useState([]);

    return { tasks };
}
