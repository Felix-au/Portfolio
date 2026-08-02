import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginString from 'vite-plugin-string';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for local dev server
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      vitePluginString(),
      {
        name: 'local-api-routes',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.startsWith('/api/contact') && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const module = await server.ssrLoadModule('./api/contact.ts');
                  const handler = module.default;

                  const parsedBody = JSON.parse(body || '{}');

                  const vercelReq = {
                    method: req.method,
                    body: parsedBody,
                    query: {},
                  } as any;

                  const vercelRes = {
                    status(code: number) {
                      res.statusCode = code;
                      return this;
                    },
                    json(data: any) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                      return this;
                    },
                    setHeader(name: string, value: any) {
                      res.setHeader(name, value);
                      return this;
                    },
                  } as any;

                  await handler(vercelReq, vercelRes);
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: false,
                      error: 'Failed to execute local handler',
                      details: err instanceof Error ? err.message : String(err),
                    })
                  );
                }
              });
              return;
            }

            if (req.url?.startsWith('/api/github-stats') && req.method === 'GET') {
              try {
                const url = new URL(req.url, `http://${req.headers.host}`);
                const username = url.searchParams.get('username') || 'Felix-au';

                const vercelReq = {
                  method: 'GET',
                  query: { username },
                  body: {},
                } as any;

                const vercelRes = {
                  status(code: number) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data: any) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  },
                  setHeader(name: string, value: any) {
                    res.setHeader(name, value);
                    return this;
                  },
                } as any;

                // Load and run github-stats handler dynamically
                (async () => {
                  try {
                    const module = await server.ssrLoadModule('./api/github-stats.ts');
                    const handler = module.default;
                    await handler(vercelReq, vercelRes);
                  } catch (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        error: 'Failed to execute local handler',
                        details: err instanceof Error ? err.message : String(err),
                      })
                    );
                  }
                })();
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: 'Failed to process request',
                    details: err instanceof Error ? err.message : String(err),
                  })
                );
              }
              return;
            }

            next();
          });
        },
      },
    ],
  };
});
