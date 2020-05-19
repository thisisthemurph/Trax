export const logout = () => {
	localStorage.removeItem("token")
}

export const login = async (email, password) => {
	if (!email || !password) {
		return false
	}

	try {
		const res = await fetch("http://localhost:5000/trax/api/auth/login", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})

		const result = await res.json()

		if (result && result.success) {
			localStorage.setItem("token", result.token)

			return {
				...result.user,
				token: result.token,
			}
		} else {
			logout()
			return null
		}
	} catch (err) {
		logout()
		console.error(err)
		return null
	}
}

export const verifyUserToken = async (verifyToken = null) => {
	let token = verifyToken
	if (verifyToken === null) {
		token = localStorage.getItem("token")
	}

	if (token) {
		try {
			const res = await fetch("http://localhost:5000/trax/api/auth/authenticate_token", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"auth-token": token,
				},
			})

			const result = await res.json()

			if (result && result.success) {
				return {
					...result.user,
					token: result.token,
				}
			} else {
				logout()
				return null
			}
		} catch (err) {
			logout()
			return null
		}
	} else {
		logout()
		return null
	}
}
