import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';

interface IcseSeoWrapperProps {
	subjectId: string;
}

export default function IcseSeoWrapper({ subjectId }: IcseSeoWrapperProps) {
	return (
		<Fragment>
			<Helmet>
				<title>
					Examenes de ICSE UBA XXI - Introduccion al conocimiento de la sociedad
					y el estado
				</title>
				<meta
					name="description"
					content="Modelos de examenes de ICSE UBA XXI, introduccion al conocimiento de la sociedad y el estado uba xxi"
				/>
				<meta name="keywords" content="icse, uba xxi, cbc" />
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/introduccion-al-conocimiento-de-la-sociedad-y-el-estado-(icse)-(24)"
				/>
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Parciales de ICSE UBA XXI" />
				<meta
					property="og:description"
					content="Practica parciales y potencia tu aprendizaje."
				/>
				<meta
					property="og:image"
					content="https://ubaparciales.com/opengraph/imgs/ipc-meta.jpg"
				/>
			</Helmet>
			<SubjectExams subjectId={subjectId} />;
		</Fragment>
	);
}
