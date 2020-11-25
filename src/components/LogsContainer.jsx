/*
Author: chankruze (chankruze@geekofia.in)
Created: Wed Nov 25 2020 02:36:29 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import React, { useState, useEffect, useRef } from 'react';
import { Console, Hook, Unhook } from 'console-feed';

// scroll to bottom
const scrollToBottom = (bottomRef) => {
	bottomRef.current.scrollIntoView({ behavior: 'smooth' });
};

const LogsContainer = () => {
	const [logs, setLogs] = useState([]);

	const bottomRef = useRef(null);

	// run once!
	useEffect(() => {
		Hook(
			window.console,
			(log) => setLogs((currLogs) => [...currLogs, log]),
			false
		);
		return () => Unhook(window.console);
	}, []);

	useEffect(() => {
		if (bottomRef) {
			scrollToBottom(bottomRef);
		}
	}, [logs]);

	return (
		<div>
			<Console logs={logs} variant="dark" />
			<div ref={bottomRef}></div>
		</div>
	);
};

export { LogsContainer };
