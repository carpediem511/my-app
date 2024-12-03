import { useEffect, useState } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
	value: LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void;
		removeItem: () => void;
	},
]

export const useLocalStorage: UseLocalStorage = (key) => {

	const [value, setValue] = useState<LocalStorageReturnValue>(null)

	useEffect(() => {

		const valueFromLS = localStorage.getItem(key)

		if (valueFromLS) {
			setValue(valueFromLS)
		}

	}, [key])

	const setItem = (newValue: LocalStorageSetValue) => {
		localStorage.setItem(key, newValue)
		setValue(newValue)
	}

	const removeItem = () => {
		localStorage.removeItem(key)
		setValue(null)
	}

	return (
		[value, { setItem, removeItem }]
	)
}