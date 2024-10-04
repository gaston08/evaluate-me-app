import { useCallback, useRef, Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as htmlToImage from 'html-to-image';
import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface ScreenshotButtonProps {
	exercise: exerciseType;
}

export default function ScreenshotButton(props: ScreenshotButtonProps) {
	const { exercise } = props;

	const ref = useRef(null);

	const takeScreenshot = useCallback(() => {
		htmlToImage
			.toPng(ref.current, { quality: 0.5 })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = `ubaparciales.com_${new Date().toString().replaceAll(' ', '_')}.png`;
				link.href = dataUrl;
				link.click();
			})
			.catch(console.error);
	}, [ref]);

	return (
		<Fragment>
			<Box>
				<Button onClick={takeScreenshot} variant="contained" size="small">
					screenshot
				</Button>
			</Box>
			<Box ref={ref}>
				{Array.from(Array(exercise.question.length), (e, i: number) => {
					return (
						<Fragment key={i}>
							<Box
								elevation={0}
								sx={{ p: 2, background: 'rgba(238, 238, 238, 1)' }}
							>
								<div
									dangerouslySetInnerHTML={{
										__html: exercise.question[i],
									}}
								></div>
							</Box>
							<Fragment>
								{exercise.options[i].map((option: optionType) => {
									return (
										<Box
											key={option.id}
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												cursor: 'auto',
												p: 2,
												background: 'white',
											}}
										>
											<div
												dangerouslySetInnerHTML={{ __html: option.title }}
											></div>
										</Box>
									);
								})}
							</Fragment>
						</Fragment>
					);
				})}
			</Box>
		</Fragment>
	);
}
