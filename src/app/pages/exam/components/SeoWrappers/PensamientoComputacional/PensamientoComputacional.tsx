import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface PensamientoComputacionalProps {
	subjectId: string;
}

export default function PensamientoComputacional({
	subjectId,
}: PensamientoComputacionalProps) {
	return (
		<Fragment>
			<Helmet>
				<title>Examenes de Pensamiento Computacional UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de Pensamiento Computacional UBA XXI, Examenes de Pensamiento Computacional UBA XXI, parciales de Pensamiento Computacional, finales de Pensamiento Computacional"
				/>
				<meta
					name="keywords"
					content="pensamiento computacional,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/pensamiento-computacional-(90)"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:title"
					content="Parciales de Pensamiento Computacional UBA XXI"
				/>
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
