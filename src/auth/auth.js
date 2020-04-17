class Auth {
    constructor() {
        this.authenticated = false
        this.user = null
    }

    async login(email, password) {
        if (!email || !password) {
            return false
        }

        try {
			const res = await fetch('http://localhost:5000/trax/api/auth/login', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password })
			})

			const result = await res.json()

			if (result && result.success) {
                localStorage.setItem('token', result.token)
                this.authenticated = true
			} else {
                this.logout()
			}
		} 
		catch(e) {
			console.error('There has been an ERROR')
            this.logout()
			throw e
        }

        return await this.authenticateCurrentToken()
    }

    async authenticateCurrentToken() {
        const token = localStorage.getItem('token')

        if (token) {
            console.log('Attempting login with current token')

            try {	
				const res = await fetch('http://localhost:5000/trax/api/auth/authenticate_token', {
					method: 'post',
					'headers': {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'auth-token': token
					}
				})
	
				const result = await res.json()
	
				if (result && result.success) {
                    console.log('Token authenticated')
                    this.authenticated = true
                    this.user = result.user
				} else {
                    console.log('Token is not authentic')
                    this.logout()
				}
			} 
			catch(e) {
                console.error('Error authenticating token')
                this.logout()
				throw e
			}
        } else {
            this.logout()
        }

        return this.isAuthenticated()
    }

    logout() {
        localStorage.removeItem('token')
        this.authenticated = false
        this.user = null
    }

    isAuthenticated() {
        const token = localStorage.getItem('token')

        if (!token) {
            this.logout()
        }

        return this.authenticated
    }
}

export default new Auth()