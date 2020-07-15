import client from "../api-client"

const genericLoginError = {
	success: false,
	error: "There has been an error logging you in, please check your details and try again.",
}

export const login = async (email, password) => {
	if (!email || !password) {
		return { success: false, error: "You must enter both the email address and password." }
	}

	try {
		const result = await client("auth/login", { body: { email, password } })

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
	} catch (err) {
		logout()

		if (err?.msg) {
			return {
				success: false,
				error: "An account cannot be found with the given email and password combination.",
			}
		}

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
			const result = await client("auth/authenticate_token", {
				method: "POST",
				headers: {
					"auth-token": token,
				},
			})

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

export const logout = () => {
	localStorage.removeItem("token")
}
