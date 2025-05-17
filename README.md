# About Project

Implemented:

1. Converting text to PDF
2. Functionality to view, save, delete and share by link.
3. Supporting PWA
4. Unit-test

# Project Setup Guide

## Requirements

- **Node.js**: Ensure Node.js version 18 or higher is installed. The LTS version is recommended.
  - Check version: `node -v`
  - If not installed, download and install from [nodejs.org](https://nodejs.org/).

## Installing Dependencies

1. Clone the project repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Create a `.env` file in the project root. Use `.env.example` as a template (if available):
   ```bash
   cp .env.example .env
   ```
2. Fill the `.env` file with the required environment variables. Example structure:
   ```
   # Example environment variables
   VITE_API_URL=http://localhost:3000/
   VITE_APP_API_KEY=MyKey
   ```
   - Provide valid values for your environment (e.g., API URL, keys, etc.).
   - Refer to the team or documentation for required variables.

## Running the Project

1. **Development Mode**:
   Start the project in development mode with hot reloading:
   ```bash
   npm run dev
   ```
   - The application will be available at `http://localhost:5173` (or another port specified in the configuration).
2. **Production Build**:
   Create a production build:
   ```bash
   npm run build
   ```
   - Compiled files will be in the `dist` folder.
3. **Preview Production Build**:
   Test the production build locally:
   ```bash
   npm run preview
   ```

## Running Tests

1. Ensure all dependencies are installed (`npm install`).
2. Run tests:
   ```bash
   npm run test
   ```
   - Tests are executed using the project's testing tool (e.g., Jest, Vitest).
   - Test results will be displayed in the console.

## Additional Notes

- For specific tools (e.g., Docker, CI/CD), refer to their respective documentation.
- If errors occur:
  - Verify Node.js version 18+ is installed.
  - Ensure the `.env` file is correctly configured.
  - Check console logs and confirm all dependencies are installed.

## Troubleshooting

- **404 Errors for Assets**: Verify static file paths are correct (use imports or `public` folder).
- **Test Failures**: Check test configuration in `package.json` or the test framework’s config file.
- **.env Issues**: Ensure frontend variables start with `VITE_` for Vite projects.
