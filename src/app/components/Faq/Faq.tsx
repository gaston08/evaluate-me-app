import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '@mui/material/styles';

const faqs = [
  {
    question: '¿Qué es ubaparciales?',
    answer:
      'ubaparciales es una plataforma diseñada para proporcionar a los estudiantes de la UBA una herramienta eficaz para prepararse para sus exámenes parciales. A través de esta plataforma, los estudiantes tienen acceso a una variedad de pruebas que incluyen cuestionarios tipo multiple choice, culminando en una calificación simbólica al término de la prueba.',
  },
  {
    question: '¿Influyen las calificaciones en la carrera?',
    answer:
      'Las calificaciones obtenidas en ubaparciales no tienen repercusión directa en las materias de la UBA. Son representativas y sirven como una medida para evaluar el nivel de preparación para los exámenes reales que se enfrentarán.',
  },
  {
    question: '¿De dónde provienen los parciales?',
    answer:
      'Los parciales disponibles en la plataforma son exámenes de años anteriores que se hacen públicos después de que los profesores de la UBA han entregado las notas oficiales correspondientes. Es importante resaltar que nunca se filtrarán exámenes que aún no se hayan tomado.',
  },
  {
    question: '¿Qué materias están disponibles?',
    answer:
      'Subiremos exámenes de todas las materias, trabajamos para tener exámenes incluso de las materias que no cuentan con un modelo de exámen.',
  },
  {
    question: '¿Qué hago si no encuentro la materia que busco?',
    answer:
      'Envianos un email a <strong>ubaparciales@gmail.com</strong> con el nombre de la materia que estás buscando.',
  },
];

function ExpandMoreIcon() {
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="magnifying-glass"
        className="svg-inline--fa fa-magnifying-glass "
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ width: 20, height: 20 }}
      >
        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
      </svg>
    </>
  );
}

export default function AccordionUsage() {
  const theme = useTheme();
  return (
    <Box sx={{ pt: 6, pb: 6 }}>
      {faqs.map((faq) => {
        return (
          <Accordion key={faq.question} sx={{ background: 'white' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{ color: theme.palette.text.secondary }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
