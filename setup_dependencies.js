const { execSync } = require('child_process');

// List of project dependencies
const dependencies = [
  'nodemon',
  'express',
  'dotenv',
  'cookie-parser',
  'cors',
  'pg',
  'pg-format'
];

// Function to install all dependencies
function installDependencies() {
  console.log('Installing dependencies...');
  dependencies.forEach(dependency => {
    try {
      console.log(`Installing ${dependency}`);
      execSync(`npm install ${dependency}`, { stdio: 'inherit' });
      console.log(`${dependency} installed successfully.`);
    } catch (error) {
      console.error(`Error installing ${dependency}: ${error}`);
    }
  });
}

// Call de function to install dependencies
installDependencies();