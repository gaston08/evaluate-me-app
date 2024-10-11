import { useState, useCallback, useRef, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as htmlToImage from 'html-to-image';
import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface ScreenshotButtonProps {
	exercise: exerciseType;
}

export default function ScreenshotButtonPC(props: ScreenshotButtonProps) {
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
				link.download = `ubaparciales.com_${new Date().toString().replaceAll(' ', '_').toLowerCase()}.png`;
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
			<Box sx={{ display: 'flex', gap: 1, filter: 'brightness(1.3)' }}>
				<Button
					disabled={loading}
					onClick={takeScreenshot}
					variant="contained"
					size="small"
					color="success"
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
					left: -1000,
					top: -1000,
				}}
			>
				<Box ref={ref}>
					<Fragment>
						{Array.from(Array(exercise.question.length), (e, i: number) => {
							return (
								<Fragment key={i}>
									<Fragment>
										{exercise.question[i].python_code ? (
											<Box
												sx={{
													border: '1px solid #ccc',
													overflow: 'scroll',
												}}
												className="highlight-code"
											>
												<Box
													className="lightbulb"
													dangerouslySetInnerHTML={{
														// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
														__html: exercise.question[i].text,
													}}
												></Box>
											</Box>
										) : (
											<Box
												sx={{
													border: '1px solid white',
												}}
												className="highlight-code"
											>
												<Box
													className="lightbulb"
													dangerouslySetInnerHTML={{
														// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
														__html: exercise.question[i].text,
													}}
													sx={{ p: 3 }}
												></Box>
											</Box>
										)}
									</Fragment>

									<Fragment>
										{exercise.options[i].map((option: optionType) => {
											return (
												<Box
													sx={{
														width: '100%',
													}}
													className="highlight-code"
													key={option.id}
												>
													<Box>
														{option.python_code ? (
															<Box
																className="lightbulb"
																dangerouslySetInnerHTML={{
																	__html: option.title,
																}}
																sx={{
																	p: 2,
																	border: 'none',
																	width: '100%',
																	borderBottom: '1px solid black',
																}}
															></Box>
														) : (
															<Box
																className="lightbulb"
																dangerouslySetInnerHTML={{
																	__html: option.title,
																}}
																sx={{
																	p: 2,
																	border: 'none',
																	width: '100%',
																	borderBottom: '1px solid #ccc',
																}}
															></Box>
														)}
													</Box>
												</Box>
											);
										})}
									</Fragment>
								</Fragment>
							);
						})}
					</Fragment>
					<Box
						sx={{
							background: 'black',
							color: 'white',
							display: 'flex',
							justifyContent: 'center',
							pb: 1,
							pt: 1,
						}}
					>
						<Typography>Capturado en: ubaparciales.com</Typography>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
}
