let API_URL
if (process.env.NODE_ENV === "production") {
	API_URL = process.env.REACT_APP_API_BASE_URL
} else {
	API_URL = process.env.REACT_APP_API_BASE_URL_DEV
}

const client = (endpoint, { body, ...customConfig } = {}) => {
	console.log({
		endpoint,
		body,
		customConfig,
	})

	const config = {
		method: body ? "POST" : "GET",
		...customConfig,
		headers: {
			Accept: "application-json",
			"Content-Type": "application/json",
			...customConfig.headers,
		},
	}

	if (body) {
		config.body = JSON.stringify(body)
	}

	return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

export default client
