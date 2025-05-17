interface EnvConfig {
  API_URL: string;
  API_KEY: string;
}

const getEnvConfig = (): EnvConfig => {
  // Mock data for tests

  const API_URL = process.env.VITE_API_URL || "http://95.217.134.12:4010";
  const API_KEY =
    process.env.VITE_API_KEY || "78684310-850d-427a-8432-4a6487f6dbc4";

  return {
    API_URL,
    API_KEY,
  };
};

export const envConfig = getEnvConfig();
