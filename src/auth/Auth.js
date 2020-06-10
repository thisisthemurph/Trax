export const logout = () => {
	localStorage.removeItem("token")
}

const genericLoginError = {
	success: false,
	error: "There has been an error logging you in, please check your details and try again.",
}

export const login = async (email, password) => {
	if (!email || !password) {
		return { success: false, error: "You must enter both the email address and password." }
	}

	try {
		const res = await fetch("http://mmurphy.co.uk/trax/api/auth/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})

		if (res.ok) {
			const result = await res.json()

			if (result && result.success) {
				localStorage.setItem("token", result.token)

				return {
					success: true,
					user: {
						...result.user,
						token: result.token,
					},
				}
			} else {
				logout()
				return genericLoginError
			}
		} else {
			// The credentials did not match any in the database
			logout()
			if (res.status === 404 || res.status === 401) {
				return {
					success: false,
					error:
						"An account cannot be found with the given email and password combination.",
				}
			}

			return genericLoginError
		}
	} catch (err) {
		logout()
		return genericLoginError
	}
}

export const verifyUserToken = async (verifyToken = null) => {
	let token = verifyToken
	if (token === null) {
		token = localStorage.getItem("token")
	}

	if (token) {
		try {
			const res = await fetch("http://mmurphy.co.uk/trax/api/auth/authenticate_token", {
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
