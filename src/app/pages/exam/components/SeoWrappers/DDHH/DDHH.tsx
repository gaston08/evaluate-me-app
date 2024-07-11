import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface DDHHProps {
	subjectId: string;
}

export default function DDHH({ subjectId }: DDHHProps) {
	return (
		<Fragment>
			<Helmet>
				<title>Examenes de DDHH y Derecho Constitucional UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de DDHH UBA XXI, Examenes de DDHH y Derecho Constitucional UBA XXI, parciales de DDHH, finales de DDHH"
				/>
				<meta
					name="keywords"
					content="ddhh,derecho constitucional,parciales,finales,examenes,uba,xxi,cbc"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/principios-de-derechos-humanos-y-derecho-constitucional-(50)"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:title"
					content="Parciales de DDHH y Derecho Constitucional UBA XXI"
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
