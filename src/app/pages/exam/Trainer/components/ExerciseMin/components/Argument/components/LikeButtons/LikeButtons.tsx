import { useState } from 'react';
import Box from '@mui/material/Box';

interface LikeButtonsProps {
	likes: number;
	dislikes: number;
}

interface LikeState {
	like: boolean;
	dislike: boolean;
}

export default function LikeButtons(props: LikeButtonsProps) {
	const { likes, dislikes } = props;
	const [likeState, setLikeState] = useState<LikeState>({
		like: false,
		dislike: false,
	});

	return (
		<Box
			id="like-buttons-container"
			sx={{ position: 'absolute', bottom: 10, display: 'flex', gap: 4 }}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					onClick={() => {
						setLikeState((prev) => {
							return {
								dislike: false,
								like: !prev.like,
							};
						});
					}}
				>
					{likeState.like ? <LikeDarkIcon /> : <LikeIcon />}
				</Box>
				<Box>{likes + (likeState.like ? 1 : 0)}</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					onClick={() => {
						setLikeState((prev) => {
							return {
								like: false,
								dislike: !prev.dislike,
							};
						});
					}}
				>
					{likeState.dislike ? <DislikeDarkIcon /> : <DislikeIcon />}
				</Box>
				<Box>{dislikes + (likeState.dislike ? 1 : 0)}</Box>
			</Box>
		</Box>
	);
}

function LikeIcon() {
	return <img src={'/icons/like.svg'} style={{ width: 20, height: 20 }} />;
}

function LikeDarkIcon() {
	return <img src={'/icons/like-dark.svg'} style={{ width: 20, height: 20 }} />;
}

function DislikeIcon() {
	return <img src={'/icons/dislike.svg'} style={{ width: 20, height: 20 }} />;
}

function DislikeDarkIcon() {
	return (
		<img src={'/icons/dislike-dark.svg'} style={{ width: 20, height: 20 }} />
	);
}
