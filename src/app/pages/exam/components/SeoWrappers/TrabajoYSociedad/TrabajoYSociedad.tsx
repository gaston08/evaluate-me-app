import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface TrabajoYSociedadProps {
	subjectId: string;
}

export default function TrabajoYSociedad({ subjectId }: TrabajoYSociedadProps) {
	return (
		<Fragment>
			<Helmet>
				<title>Examenes de Trabajo y Sociedad UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de Trabajo Y Sociedad UBA XXI, Examenes de Trabajo Y Sociedad UBA XXI, parciales de Trabajo Y Sociedad, finales de Trabajo Y Sociedad"
				/>
				<meta
					name="keywords"
					content="trabajo y sociedad,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/trabajo-y-sociedad-(70)"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:title"
					content="Parciales de Trabajo Y Sociedad UBA XXI"
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
