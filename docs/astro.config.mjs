// @ts-check
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://your-library.com',
  title: 'Data Structure React Hooks',
  description: 'A collection of React hooks for working with data structures like Arrays, Maps, Sets, Queues, and Stacks with automatic re-rendering.',
});