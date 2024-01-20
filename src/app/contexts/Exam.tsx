import { createContext } from 'react';
import { createExam } from 'app/shared/interfaces/exam';

export const ExamContext = createContext<createExam | null>();
