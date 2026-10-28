import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import contactHandler from './api/contact.ts';

// Local dev server plugin for /api/contact
const localApiPlugin = () => ({
  name: 'local-api-contact-handler',
  configureServer(server: any) {
    server.middlewares.use('/api/contact', async (req: any, res: any) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
        return;
      }

      let bodyStr = '';
      req.on('data', (chunk: any) => {
        bodyStr += chunk;
      });

      req.on('end', async () => {
        try {
          req.body = bodyStr ? JSON.parse(bodyStr) : {};
        } catch {
          req.body = {};
        }

        // Mock Vercel response methods for local node server
        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        try {
          await contactHandler(req, res);
        } catch (err: any) {
          console.error('[Local Dev API Error]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Internal Server Error' }));
        }
      });
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env so serverless handlers have access to RESEND_API_KEY
  for (const [key, val] of Object.entries(env)) {
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      localApiPlugin(),
    ],
  };
});


