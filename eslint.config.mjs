import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['dist/', 'web-build/', 'node_modules/']),
  ...expoConfig,
  {
    // You can add your own custom rule overrides here
    rules: {
      'no-console': 'warn', // Example: Warns you if you leave console.logs
      'react/react-in-jsx-scope': 'off', // Not needed in modern React
    },
  },
);
