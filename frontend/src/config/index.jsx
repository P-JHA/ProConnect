


const clientServerConfig = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:9090',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  featureFlags: {
    enableNewFeature: process.env.REACT_APP_ENABLE_NEW_FEATURE === 'true',
  },
};

export default clientServerConfig;  