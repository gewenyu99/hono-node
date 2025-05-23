import { env } from "hono/adapter"
import { PostHog } from "posthog-node"
import type { Context } from "hono"

const exceptionToPosthog = (err: Error, c: Context) => {
    const { POSTHOG_PUBLIC_KEY } = env<{ POSTHOG_PUBLIC_KEY:string }>(c)
    const posthog = new PostHog(POSTHOG_PUBLIC_KEY, { host: 'https://us.i.posthog.com' })
    
    posthog.captureException(new Error(err.message, { cause: err }), 'user_distinct_id_with_err_rethrow', {
      path: c.req.path,
      method: c.req.method,
      url: c.req.url,
      headers: c.req.header(),
      // ... other properties
    })
    posthog.shutdown() 
    // other error handling logic
    return c.text('Internal Server Error', 500)
}

export { exceptionToPosthog }