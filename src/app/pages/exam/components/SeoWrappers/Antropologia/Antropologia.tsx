import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface DerechoPrivadoProps {
	subjectId: string;
}

export default function DerechoPrivado({ subjectId }: DerechoPrivadoProps) {
	return (
		<Fragment>
			<Helmet>
				<title>Examenes de Antropología UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de Antropologia UBA XXI, Examenes de Antropología UBA XXI, parciales de antropologia, finales de antropologia"
				/>
				<meta
					name="keywords"
					content="antropologia,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/antropologia-(16)"
				/>
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Parciales de Antropología UBA XXI" />
				<meta
					property="og:description"
					content="Practica parciales y potencia tu aprendizaje."
				/>
				<meta
					property="og:image"
					content="https://ubaparciales.com/opengraph/imgs/ipc-meta.jpg"
				/>
			</Helmet>
			<SubjectExams subjectId={subjectId} />
		</Fragment>
	);
}
