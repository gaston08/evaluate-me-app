import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface SociologiaProps {
	subjectId: string;
}

export default function Sociologia({ subjectId }: SociologiaProps) {
	return (
		<Fragment>
			<Helmet>
				<title>Examenes de Sociologia UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de Sociologia UBA XXI, Examenes de Sociologia UBA XXI, parciales de Sociologia, finales de Sociologia"
				/>
				<meta
					name="keywords"
					content="sociologia,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/sociologia-(14)"
				/>
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Sociologia UBA XXI" />
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
