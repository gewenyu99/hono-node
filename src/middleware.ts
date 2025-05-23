import { env } from 'hono/adapter'
import { createMiddleware } from 'hono/factory'
import { PostHog } from 'posthog-node'
const posthogServerMiddleware = createMiddleware(async (c, next) => {
    const { POSTHOG_PUBLIC_KEY } = env<{ POSTHOG_PUBLIC_KEY: string }>(c)
    const posthog = new PostHog(POSTHOG_PUBLIC_KEY, { host: 'https://us.i.posthog.com' })

    posthog.capture({
        distinctId: 'distinct_id_of_user', // Their user id or email
        event: 'user_did_something',
    })

    await posthog.shutdown()
    await next()
})

export { posthogServerMiddleware }