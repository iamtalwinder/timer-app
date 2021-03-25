import Constants from "expo-constants";

const localhost = "http://172.20.10.14:5000/api";

const ENV = {
  dev: {
    apiUrl: localhost,
  },
  staging: {
    apiUrl: "",
  },
  prod: {
    apiUrl: "[]",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
