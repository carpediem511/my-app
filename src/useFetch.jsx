import { useEffect, useState } from "react"

export const useFetch = (url) => {

	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		fetchData(url)
	}, [url])

	async function fetchData(requestURL) {

		setIsLoading(true)
		setError(null)

		try {

			const response = await fetch(requestURL)

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			const result = await response.json()
			setData(result)

		} catch (err) {
			setError(err.message)
		}

		setIsLoading(false)
	}

	function refetch({ params } = {}) {

		let newURL = url

		if (params) {

			let queryParams = ''

			for (const key in params) {
				queryParams += `${key} = ${params[key]}&`
			}

			queryParams = queryParams.slice(0, -1)
			newURL = `${url}?${queryParams}`
		}

		fetchData(newURL)
	}

	return (
		{ data, isLoading, error, refetch }
	)
}
