import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


import { posthogServerMiddleware } from './middleware.js'
app.use('*', posthogServerMiddleware)

import { exceptionToPosthog } from './errorReporting.js'
app.onError(exceptionToPosthog)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
