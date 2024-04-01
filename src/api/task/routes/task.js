'use strict';

// src/api/task/routes/tasks.js

module.exports = {
    routes: [
        // Định nghĩa lại các default route cho 'task' thay vì 'customer'
        { method: 'POST', path: '/tasks', handler: 'api::task.task.create' },
        { method: 'GET', path: '/tasks', handler: 'api::task.task.find' },
        { method: 'GET', path: '/tasks/:id', handler: 'api::task.task.findOne' },
        { method: 'PUT', path: '/tasks/:id', handler: 'api::task.task.update' },
        { method: 'DELETE', path: '/tasks/:id', handler: 'api::task.task.delete' },

        // Custom route cho việc lấy lịch sử của một task cụ thể
        {
            method: 'GET',
            path: '/tasks/:id/history',
            handler: 'api::task.task.getHistoryTaskById',
            config: { auth: false },
        },
    ],
};
