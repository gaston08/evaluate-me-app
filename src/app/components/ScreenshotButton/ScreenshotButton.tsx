import { useState, useCallback, useRef, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as htmlToImage from 'html-to-image';
import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface ScreenshotButtonProps {
	exercise: exerciseType;
}

export default function ScreenshotButton(props: ScreenshotButtonProps) {
	const { exercise } = props;
	const ref = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const takeScreenshot = useCallback(() => {
		setSuccess(false);
		setError(false);
		setLoading(true);
		htmlToImage
			.toPng(ref.current, { quality: 0.5 })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = `ubaparciales.com_${new Date().toString().replaceAll(' ', '_')}.png`;
				link.href = dataUrl;
				link.click();
				setLoading(false);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setLoading(false);
			});
	}, [ref]);

	return (
		<Fragment>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button
					disabled={loading}
					onClick={takeScreenshot}
					variant="contained"
					size="small"
				>
					screenshot
				</Button>
				<Fragment>
					{success && <Typography sx={{ color: 'green' }}>Listo!</Typography>}
				</Fragment>
				<Fragment>
					{error && (
						<Typography sx={{ color: 'red' }}>No se pudo capturar</Typography>
					)}
				</Fragment>
			</Box>
			<Box
				sx={{
					position: 'absolute',
					left: -550,
					maxWidth: 500,
				}}
			>
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
			</Box>
		</Fragment>
	);
}
