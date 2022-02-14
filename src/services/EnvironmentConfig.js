const dev = {
	API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  };
  
  const prod = {
	API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  };
  
  const test = {
	API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  };
  
  const stage = {
	API_ENDPOINT_URL:  process.env.REACT_APP_API_URL,
					 
  };
  
  const getEnv = () => {
	if (process.env.NODE_ENV === "development") {
	  return dev;
	}
	
	switch (process.env.REACT_APP_ENV) {
	  case "development":
		return dev;
	  case "production":
		return prod;
	  case "test":
		return test;
	  case "staging":
		return stage;
	  default:
		break;
	}
  };
  
  export const env = getEnv();
  