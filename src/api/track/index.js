import client from "../api-client"

export const getTrack = async (user, trackId) => {
	try {
		const result = await client(`tracks/${trackId}`, {
			headers: { "auth-token": user.token },
		})

		if (result && result.success) {
			return result.track
		} else {
			return null
		}
	} catch (err) {
		return null
	}
}

export const getTracks = async (user) => {
	try {
		const tracks = await client(`tracks/user/${user.id}`, {
			headers: { "auth-token": user.token },
		})

		if (tracks) {
			return tracks
		} else {
			return []
		}
	} catch (err) {
		return []
	}
}

export const createTrack = async (user, track) => {
	try {
		const result = await client(`tracks`, {
			headers: { "auth-token": user.token },
			body: { ...track },
		})

		return result ? result.success : false
	} catch (err) {
		return false
	}
}

export const updateTrack = async (user, trackId, newTrackData) => {
	try {
		const response = await client(`tracks/${trackId}`, {
			method: "PUT",
			headers: { "auth-token": user.token },
			body: newTrackData,
		})

		return response ? response.success : false
	} catch (err) {
		return false
	}
}

export const deleteTrack = async (user, trackId) => {
	try {
		const response = await client(`tracks/${trackId}`, {
			method: "DELETE",
			headers: { "auth-token": user.token },
		})

		return response ? response.success : false
	} catch (err) {
		return false
	}
}

export const addPointToTrack = async (user, trackId, point) => {
	try {
		const response = await client(`tracks/${trackId}`, {
			headers: { "auth-token": user.token },
			body: point,
		})

		return response ? response.success : false
	} catch (err) {
		return false
	}
}

export const updatePoint = async (user, trackId, pointId, newData) => {
	try {
		const result = await client(`tracks/${trackId}/point/${pointId}`, {
			method: "PUT",
			headers: { "auth-token": user.token },
			body: newData,
		})

		return result ? result.success : false
	} catch (err) {
		return false
	}
}

export const deletePoint = async (user, trackId, pointId) => {
	try {
		const result = await client(`tracks/${trackId}/point/${pointId}`, {
			method: "DELETE",
			headers: { "auth-token": user.token },
		})

		return result ? result.success : false
	} catch (err) {
		return false
	}
}
