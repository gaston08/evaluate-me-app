import { Fragment } from 'react';
import { SubjectExams } from 'app/pages/exam';
import { Helmet } from 'react-helmet-async';

interface IpcSeoWrapperProps {
	subjectId: string;
}

export default function IpcSeoWrapper({ subjectId }: IpcSeoWrapperProps) {
	return (
		<Fragment>
			<Helmet>
				<title>
					Examenes de IPC UBA XXI - Introduccion al pensamiento cientifico
				</title>
				<meta
					name="description"
					content="Modelos de examenes de IPC UBA XXI, introduccion al pensamiento cientifico uba xxi, parciales de ipc, finales de ipc"
				/>
				<meta
					name="keywords"
					content="ipc,parciales,finales,examenes,uba,xxi,cbc,"
				/>
				{/* social media */}
				<meta
					property="og:url"
					content="https://ubaparciales.com/tests/introduccion-al-pensamiento-cientifico-(40)"
				/>
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Parciales de IPC UBA XXI" />
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
