/*
Author: chankruze (chankruze@geekofia.in)
Created: Wed Nov 25 2020 10:14:41 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useState, useEffect } from 'react';

// prefix for project keys in local storage
const PREFIX = 'js_playground';

const useLocalStorage = (key, initialValue) => {
	// add prefix to the key provided
	const prefixedKey = PREFIX + key;

	// sometimes fetching from local storage can be slow so
	// lazy init localstorage key value
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		// if item found return parsed
		if (jsonValue) return JSON.parse(jsonValue);
		// if initial value is a function, call it and return the fn's returned value
		if (typeof initialValue === 'function') return initialValue();
		// else return initial value as it is
		return initialValue;
	});

	useEffect(() => {
		// store to local storage
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [value, prefixedKey]);

	// return array [value, setterFunction]
	return [value, setValue];
};

export default useLocalStorage;
