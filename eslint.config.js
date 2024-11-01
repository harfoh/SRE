// eslint.config.js

module.exports = [
    {
      files: ['*.js'], // Specify the files to which these rules apply
      languageOptions: {
        ecmaVersion: 2021, // Specify the ECMAScript version
        sourceType: 'module', // Enable ES module syntax
      },
      plugins: {
        // Define any plugins you are using as an object
        // For example, if you're using the React plugin:
        // react: require('eslint-plugin-react'), // Uncomment and install if using React
      },
      rules: {
        'no-console': 'warn', // Warn on console logs
        'semi': ['error', 'always'], // Enforce semicolons
        // Add other custom rules as needed
      },
    },
    // Additional configurations can be added here if needed
  ];
  