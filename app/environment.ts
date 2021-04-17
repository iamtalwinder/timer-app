import Constants from "expo-constants";

const localhost = "https://task-api-pro.herokuapp.com/api";

const ENV = {
  dev: {
    apiUrl: localhost,
  },
  staging: {
    apiUrl: "https://task-api-pro.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://task-api-pro.herokuapp.com/api",
  },
};

type CurrentEnvs = {
  apiUrl: string;
};

const getEnvVars = (env = Constants.manifest.releaseChannel): CurrentEnvs => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }

  return ENV.dev;
};

export default getEnvVars;
