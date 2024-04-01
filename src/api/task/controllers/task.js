'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
  async getHistoryTaskById(ctx) {
    try {
      const { id } = ctx.params; // Lấy ID từ tham số đường dẫn
      // Sử dụng populate: '*' để tự động populate tất cả các trường có quan hệ
      const entity = await strapi.service('api::task.task').findOne(id, {
        populate: '*',
      });
      if (!entity) {
        return ctx.notFound('Task not found');
      }
      // Trả về toàn bộ task, bao gồm cả các trường có quan hệ
      ctx.body = entity;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));

