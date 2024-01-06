import * as React from 'react';
import { useState } from 'react';
import '../../create.scss';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
	faBold,
	faItalic,
	faStrikethrough,
	faList,
	faListOl,
	faQuoteLeft,
	faWindowMinimize,
	faArrowTurnDown,
	faSquareCaretLeft,
	faSquareCaretRight,
	faParagraph,
} from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import Exercise from '../../components/Exercise';
import Exercises from '../../components/Exercises';
import { exerciseType } from 'app/shared/interfaces/exercise';

function MenuBar() {
	const { editor } = useCurrentEditor();

	if (!editor) {
		return null;
	}

	return (
		<div className="flexContainer">
			<div>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
					title="Negrita"
				>
					<FontAwesomeIcon icon={faBold} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
					title="Italica"
				>
					<FontAwesomeIcon icon={faItalic} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'is-active' : ''}
					title="Subrayar"
				>
					<FontAwesomeIcon icon={faStrikethrough} />
				</button>
				{/**<button
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					className={editor.isActive('code') ? 'is-active' : ''}
				>
					code
				</button>
				<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					clear marks
				</button>
				<button onClick={() => editor.chain().focus().clearNodes().run()}>
					clear nodes
				</button>
				**/}
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive('paragraph') ? 'is-active' : ''}
					title="Parrafo (default)"
				>
					<FontAwesomeIcon icon={faParagraph} />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
					}
				>
					h1
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
					}
				>
					h2
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
					}
				>
					h3
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					className={
						editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
					}
				>
					h4
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 5 }).run()
					}
					className={
						editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
					}
				>
					h5
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 6 }).run()
					}
					className={
						editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
					}
				>
					h6
				</button>
			</div>
			<div>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
					title="Lista Desordenada"
				>
					<FontAwesomeIcon icon={faList} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'is-active' : ''}
					title="Lista Ordenada"
				>
					<FontAwesomeIcon icon={faListOl} />
				</button>
				{/**<button
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={editor.isActive('codeBlock') ? 'is-active' : ''}
				>
					code block
				</button>**/}
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
					title="Citar"
				>
					<FontAwesomeIcon icon={faQuoteLeft} />
				</button>
				<button
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					title="Linea Horizontal"
				>
					<FontAwesomeIcon icon={faWindowMinimize} />
				</button>
				<button
					onClick={() => editor.chain().focus().setHardBreak().run()}
					title="Salto de linea"
				>
					<FontAwesomeIcon icon={faArrowTurnDown} />
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className={
						!editor.can().chain().focus().undo().run() ? 'disabled-btn' : ''
					}
					title="Deshacer"
				>
					<FontAwesomeIcon icon={faSquareCaretLeft} />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					className={
						!editor.can().chain().focus().redo().run() ? 'disabled-btn' : ''
					}
					title="Rehacer"
				>
					<FontAwesomeIcon icon={faSquareCaretRight} />
				</button>
				{/**<button
					onClick={() => editor.chain().focus().setColor('#958DF1').run()}
					className={
						editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
					}
				>
					purple
				</button>**/}
			</div>
		</div>
	);
}

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ types: [ListItem.name] }),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
		},
	}),
];

export default function Create() {
	const [option, setOption] = useState<string>('');
	const [exercise, setExercise] = useState<exerciseType>(() => {
		return {
			id: window.self.crypto.randomUUID(),
			question:
				'<p>Escribe tu pregunta aquí. Puedes estilizar este texto con el editor!</p>',
			options: [
				{
					id: window.self.crypto.randomUUID(),
					title: 'Esta opción debe eliminarse.',
				},
			],
		};
	});

	const update = (props: { editor: object }) => {
		const editor: { getHTML: () => string } = props.editor;
		setExercise((prev) => {
			return {
				...prev,
				question: editor.getHTML(),
			};
		});
	};

	const handleSubmitOption = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setExercise((prev) => {
			const optArr = [...prev.options];
			optArr.push({
				id: window.self.crypto.randomUUID(),
				title: option,
			});
			return {
				...prev,
				options: optArr,
			};
		});
		setOption('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
	};

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				{/** this is a helper **/}
				<Grid item xs={12} md={4} lg={4}></Grid>
				<Grid
					item
					xs={12}
					md={4}
					lg={4}
					sx={{ position: 'fixed', width: '100%' }}
				>
					<EditorProvider
						slotBefore={<MenuBar />}
						extensions={extensions}
						content={''}
						injectCSS={true}
						onUpdate={update}
					></EditorProvider>
					<Typography variant="h6" gutterBottom sx={{ ml: 2, mt: 2 }}>
						Añade más de una opción.
					</Typography>
					<form action="post" onSubmit={handleSubmitOption}>
						<TextField
							multiline
							rows={4}
							sx={{ mt: 0, width: '100%' }}
							value={option}
							onChange={handleChange}
						/>
						<Button variant="outlined" type="submit" sx={{ mt: 3 }}>
							Agregar opción
						</Button>
					</form>
				</Grid>
				<Grid item xs={12} md={8} lg={8} className="gridRight">
					<div className="previewContainer">
						<Exercise exercise={exercise} canSelect={false} />
					</div>
					<div></div>
					<Exercises />
				</Grid>
			</Grid>
		</div>
	);
}
