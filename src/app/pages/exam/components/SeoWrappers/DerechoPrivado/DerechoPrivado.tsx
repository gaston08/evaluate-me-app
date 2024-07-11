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
				<title>Examenes de Derecho Privado UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de Derecho Privado UBA XXI, Examenes de Principios Generales de Derecho Privado UBA XXI, parciales de Derecho Privado, finales de Derecho Privado"
				/>
				<meta
					name="keywords"
					content="derecho privado,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/principios-generales-de-derecho-privado-(89)"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:title"
					content="Parciales de Derecho Privado UBA XXI"
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
