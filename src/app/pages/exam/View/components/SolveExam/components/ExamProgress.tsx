import { useContext, useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { useStopwatch } from 'react-timer-hook';

import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

import { SUBJECTS_ENUM } from 'app/shared/data/exam';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: '100%',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[500],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#308fe8',
  },
}));

export default function ExamProgress() {
  const {
    selectedOptions: { length: selectedLength },
    numFullSelect,
    currentSubject,
  } = useContext<contextExam>(ExamContext);
  const [progress, setProgress] = useState<number>(0);
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (!isNaN(selectedLength) || !isNaN(numFullSelect)) {
      setProgress(Number(((selectedLength / numFullSelect) * 100).toFixed(0)));
    }
  }, [numFullSelect, selectedLength]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: -4,
        mb: 3,
        width: '250px',
        ml: 'auto',
        mr: 'auto',
        pr: 2,
        pl: 2,
        borderRadius: 10,
        zIndex: 1000,
        color: 'white',
        backgroundColor:
          currentSubject.value === SUBJECTS_ENUM.PENSAMIENTO_COMPUTACIONAL
            ? 'black'
            : '#777',
      }}
    >
      <Typography>{progress}%</Typography>
      <BorderLinearProgress variant="determinate" value={progress} />
      <Box sx={{ display: 'flex' }}>
        <Fragment>{hours !== 0 && <Typography>{hours}:</Typography>}</Fragment>
        <Typography>{minutes}:</Typography>
        <Typography>{seconds < 10 ? '0' + seconds : seconds}</Typography>
      </Box>
    </Box>
  );
}
