import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

interface ConfettiEffectProps {
  confetties: number;
}

export default function ConfettiEffect({ confetties }: ConfettiEffectProps) {
  const { width, height } = useWindowSize();

  console.log('confetties');

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={confetties}
      recycle={false}
      gravity={0.3}
      onConfettiComplete={(confetti) => {
        confetti.reset();
      }}
    />
  );
}
