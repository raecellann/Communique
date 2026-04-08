export default {
  root: './src', // Set the root directory for your project
  build: {
    outDir: '../dist', // Directory to output the build
  },
  publicDir: '../public', // Location of public assets
  server: {
    watch: {
      usePolling: true, // Enables polling for file changes
    },
  },
};
