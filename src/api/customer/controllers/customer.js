'use strict';

module.exports = {
  // Tạo một customer mới
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.create('api::customer.customer', { data });
      return entity; // Trả về entity mới được tạo
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Tìm và trả về tất cả customers
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::customer.customer', ctx.query);
      return entities; // Trả về danh sách các entities
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Tìm một customer dựa trên ID
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne('api::customer.customer', id, ctx.query);
      if (!entity) {
        ctx.throw(404, 'Customer not found');
      }
      return entity; // Trả về entity tìm được
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Cập nhật một customer
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::customer.customer', id, { data });
      return entity; // Trả về entity đã cập nhật
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Xóa một customer
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.delete('api::customer.customer', id);
      return entity; // Trả về entity đã được xóa
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async findByAddress(ctx) {
    try {
      let { address } = ctx.query;

      // Kiểm tra và xử lý nếu address là một mảng
      if (Array.isArray(address)) {
        address = address[0];
      }

      if (!address) {
        ctx.throw(400, 'Address query param is required.');
      }
      
      // Thực hiện tìm kiếm dựa trên địa chỉ
      const entities = await strapi.entityService.findMany('api::customer.customer', {
        filters: { address: { $containsi: address } },
      });

      // Trả về kết quả tìm kiếm
      return entities;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
