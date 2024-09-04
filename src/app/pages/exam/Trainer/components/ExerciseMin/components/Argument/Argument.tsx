import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { exerciseType, argumentType } from 'app/shared/interfaces/exam';
import LikeButtons from './components/LikeButtons';

function getIcon(feed) {
	if (feed === 'chat-gpt') return <ChatGptIcon />;
	else if (feed === 'deepai') return <DeepaiIcon />;
}

interface argumentProps {
	exercise: exerciseType;
}

export default function Argument(props: argumentProps) {
	const exercise: exerciseType = props.exercise;
	const [index, setIndex] = useState<number>(0);
	const [arrIndex, setArrIndex] = useState<Array<number>>([]);
	const [args] = useState<Array<argumentType>>(() => {
		return exercise.argument
			.map((arg) => {
				return {
					...arg,
					icon: getIcon(arg.feed),
				};
			})
			.sort((a, b) => b.likes - a.likes);
	});

	useEffect(() => {
		document.getElementById(exercise.id).scrollIntoView({
			behavior: 'smooth',
		});

		let effect = '';

		if (arrIndex.includes(index)) {
			effect = 'full-view';
		} else {
			setArrIndex((prev) => {
				return [...prev, index];
			});
			effect = 'typewriting';
		}

		const timer = printSentence(
			'argument-container',
			args[index].text,
			5,
			effect,
		);

		return () => {
			clearInterval(timer);
		};
	}, [index]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setIndex(newValue);
	};

	return (
		<Alert
			sx={{ minHeight: 200, position: 'relative', paddingBottom: 10 }}
			severity="success"
			id={exercise.id}
			className="argument-feedback"
		>
			<Tabs value={index} onChange={handleChange} sx={{ mb: 4 }}>
				{args.map((arg) => {
					return <Tab key={arg.feed} icon={arg.icon} label={arg.feed} />;
				})}
			</Tabs>
			<AlertTitle>Correcto!</AlertTitle>
			<div id="argument-container"></div>
			<LikeButtons likes={args[index].likes} dislikes={args[index].dislikes} />
		</Alert>
	);
}

const printSentence = (
	id: string,
	sentence: string,
	speed: number = 10,
	type,
) => {
	let index: number = 0;
	const element: HTMLDivElement = document.getElementById(id);

	if (type === 'full-view') {
		element.innerHTML = sentence;
		return;
	} else if (type === 'typewriting') {
		const timer = setInterval(function () {
			const char: string = sentence[index];

			if (char === '<') {
				index = sentence.indexOf('>', index); // skip to greater-than
			}

			element.innerHTML = sentence.slice(0, index);

			if (++index === sentence.length) {
				clearInterval(timer);
			}
		}, speed);

		return timer;
	}
};

function ChatGptIcon() {
	return <img src={'/logos/chatgpt.svg'} style={{ width: 30, height: 30 }} />;
}

function DeepaiIcon() {
	return <img src={'/logos/deepai.svg'} style={{ width: 30, height: 30 }} />;
}
