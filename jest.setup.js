// tests/jest.setup.js

expect.extend({
    toBeISODateString(received) {
      const pass = typeof received === 'string' && received === new Date(received).toISOString();
      if (pass) {
        return {
          message: () => `expected ${received} not to be a valid ISO date string`,
          pass: true,
        };
      } else {
        return {
          message: () => `expected ${received} to be a valid ISO date string`,
          pass: false,
        };
      }
    },
  });
  