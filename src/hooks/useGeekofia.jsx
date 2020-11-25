/*
Author: chankruze (chankruze@geekofia.in)
Created: Wed Nov 25 2020 01:02:18 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useState } from 'react';

export const useInputText = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const reset = () => setValue(initialValue);

	const bind = {
		value,
		onChange: (e) => {
			setValue(e.target.value);
		}
	};

	return [value, bind, reset];
};

export const useInputFloat = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const reset = () => setValue(initialValue);

	const bind = {
		value,
		onChange: (e) => {
			setValue(parseFloat(e.target.value));
		}
	};

	return [value, bind, reset];
};

export const useInputCheckBox = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const reset = () => setValue(initialValue);

	const bind = {
		checked: value,
		onChange: () => {
			setValue(!value);
		}
	};

	return [value, bind, reset];
};

export const useSelect = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const reset = () => setValue(initialValue);

	const bind = {
		value,
		onChange: () => {
			setValue(!value);
		}
	};

	return [value, bind, reset];
};
