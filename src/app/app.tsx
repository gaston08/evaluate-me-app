import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ExercisesContext } from './contexts/Exercises';
import { ExerciseContext, defaultCurrentExercise } from './contexts/Exercise';
import { AuthContext } from './contexts/Auth';
import { exerciseType } from 'app/shared/interfaces/exercise';
import ThemeWrapper from 'app/components/ThemeWrapper';

interface selectedOption {
  optionId: string;
  exerciseId: string;
}

export default function App() {
  const [selected, setSelected] = useState<Array<selectedOption>>([]);
  const [exercises, setExercises] = useState<Array<exerciseType>>([]);
  const [currentExercise, setCurrentExercise] = useState(
    defaultCurrentExercise,
  );
  const [auth, setAuth] = useState({
    isLogged: false,
    user: {},
  });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      <ExercisesContext.Provider
        value={{
          selected,
          setSelected,
          exercises,
          setExercises,
        }}
      >
        <ExerciseContext.Provider
          value={{
            currentExercise,
            setCurrentExercise,
          }}
        >
          <ThemeWrapper>
            <RouterProvider router={router} />
          </ThemeWrapper>
        </ExerciseContext.Provider>
      </ExercisesContext.Provider>
    </AuthContext.Provider>
  );
}
