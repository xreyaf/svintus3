import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis'

export default new UpstashRedisCache({
  config: {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
})
