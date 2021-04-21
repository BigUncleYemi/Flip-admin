const dev = {
  API_ENDPOINT_URL: 'https://myflipapp-297309.uc.r.appspot.com/'
};

const prod = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL
};

const test = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL
};

const stage = {
	API_ENDPOINT_URL: "https://myflipapp-297309.uc.r.appspot.com/",
  };

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		case "staging":
			return stage;
		default:
			break;
	}
}

export const env = getEnv()
