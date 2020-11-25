/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Nov 24 2020 07:04:05 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';

// components
import { Rnd } from 'react-rnd';
import { Editor } from './Editor';

// custom hook
import { useInputText, useInputFloat } from '../hooks/useGeekofia';
import useLocalStorage from '../hooks/useLocalStorage';

// css
import styles from './App.module.sass';
import { LogsContainer } from './LogsContainer';

// scroll to bottom
const scrollToBottom = (bottomRef) => {
	bottomRef.current.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
	const [theme, bindTheme] = useInputText('vs-dark');
	// const [saveToLocalStorage, bindSaveToLocalStorage] = useInputText('dsls');
	const [fontSize, bindFontSize] = useInputFloat(16);
	const [js, setJs] = useState('');
	const [srcDoc, setSrcDoc] = useState('');
	const iframeRef = useRef(null);
	const dlRef = useRef(null);

	useEffect(() => {
		// Listen for messages
		window.addEventListener('message', (response) => {
			// Make sure message is from our iframe,
			// extensions like React dev tools might use the same technique and mess up our logs
			if (response.data && response.data.source === 'iframe') {
				console.log(response.data.message[0]);
			}
		});
	}, []);

	const handleRun = () => {
		setSrcDoc(`
			<html>
			<body></body>
			<style></style>
			<script>
			// Save the current console log function in case we need it.
			const _log = console.log;
			// Override the console
			console.log = function(...rest) {
			  // window.parent is the parent frame that made this window
			  window.parent.postMessage(
				{
				  source: 'iframe',
				  message: rest,
				},
				'*'
			  );
			  // Finally applying the console statements to saved instance earlier
			  _log.apply(console, arguments);
			};
			${js}
			</script>
			</html>
			`);
	};

	const handleSave = () => {
		const element = document.createElement('a');
		const file = new Blob([js], {
			type: 'text/plain;charset=utf-8'
		});
		element.href = URL.createObjectURL(file);
		element.download = `js_${Date.now()}.js`;
		dlRef.current.appendChild(element);
		element.click();
	};

	return (
		<div className={styles.app}>
			<div className={styles.toolbar}>
				<div className={styles.brand}>
					<p>JS Playground</p>
				</div>
				<div className={styles.options}>
					<div className={styles.option_div}>
						<button className={cx(styles.btn, styles.run)} onClick={handleRun}>
							Run
						</button>
					</div>

					<div className={styles.option_div}>
						<button
							className={cx(styles.btn, styles.save)}
							onClick={handleSave}
							ref={dlRef}
						>
							save as file
						</button>
					</div>
					<div className={styles.option_div}>
						{/* <p>Theme</p> */}
						<select type="text" {...bindTheme}>
							<option value="vs">Visual Studio Light</option>
							<option value="vs-dark">Visual Studio Dark</option>
							<option value="hc-black">High Contrast Dark</option>
						</select>
					</div>
					{/* <div className={styles.option_div}>
						<select type="text" {...bindSaveToLocalStorage}>
							<option value="dsls">Don&apos;t Save to Local Storage</option>
							<option value="sls">Save to Local Storage</option>
						</select>
					</div> */}
					<div className={styles.option_div}>
						<p>Font Size</p>
						<input type="number" {...bindFontSize} />
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<Rnd
					disableDragging={true}
					enableResizing={{
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false
					}}
					className={styles.left_pane_rnd}
				>
					<Editor theme={theme} fontSize={fontSize} js={js} updateJs={setJs} />
				</Rnd>
				<div className={styles.console}>
					<LogsContainer className={styles.logs_container} />

					<iframe
						ref={iframeRef}
						srcDoc={srcDoc}
						title="output"
						frameBorder="0"
						sandbox="allow-scripts"
						width="0%"
						height="0%"
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
