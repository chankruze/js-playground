/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Nov 24 2020 23:30:38 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

import styles from './Editor.module.sass';

// eslint-disable-next-line react/prop-types
export const Editor = ({ theme, fontSize, js, updateJs }) => {
	const editorRef = useRef(null);
	let editor;

	useEffect(() => {
		let logInterval;
		if (editorRef.current) {
			editor = monaco.editor.create(editorRef.current, {
				value: js,
				language: 'typescript',
				automaticLayout: true,
				theme,
				fontSize,
				roundedSelection: false,
				scrollBeyondLastLine: false
			});

			editor.onKeyUp((e) => {
				updateJs(editor.getModel().getValue().trim());
			});
		}
		return () => {
			editor.dispose();
			clearInterval(logInterval);
		};
	}, [theme, fontSize]);

	return <div className={styles.editor_wrapper} ref={editorRef}></div>;
};
