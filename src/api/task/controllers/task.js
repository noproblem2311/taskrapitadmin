'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
  async getHistoryTaskById(ctx) {
    try {
      const { id, type } = ctx.params;

      let entity;
      if (type === 'customer') {
        // Lấy danh sách task của customer
        entity = await strapi.service('api::task.task').find({
          filters: { customer: id },
          populate: ['customer', 'tasker', 'review'],
          sort: { createdAt: 'desc' }, // Sắp xếp theo thời gian tạo mới nhất
          pagination: { start: 0, limit: -1 }, // Lấy tất cả các bản ghi
        });
      } else if (type === 'tasker') {
        // Lấy danh sách task của tasker
        entity = await strapi.service('api::task.task').find({
          filters: { tasker: id },
          populate: ['customer', 'tasker', 'review'],
          sort: { createdAt: 'desc' },
          pagination: { start: 0, limit: -1 },
        });
      } else {
        return ctx.badRequest('Invalid type');
      }

      ctx.body = entity;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));