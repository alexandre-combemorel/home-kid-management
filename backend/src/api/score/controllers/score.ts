/**
 * score controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::score.score", () => ({
  async find(ctx) {
    ctx.query.filters = {
      ...((ctx.query.filters ?? {}) as object),
      users_permissions_user: { $eq: ctx.state.user.id },
    }
    return await super.find(ctx)
  },
  async findOne(ctx) {
    ctx.query.filters = {
      ...((ctx.query.filters ?? {}) as object),
      users_permissions_user: { $eq: ctx.state.user.id },
    }
    return super.findOne(ctx)
  },
  async create(ctx) {
    ctx.request.body.data = {
      ...ctx.request.body.data,
      users_permissions_user: ctx.state.user.id,
    }
    return super.create(ctx)
  },
}))
