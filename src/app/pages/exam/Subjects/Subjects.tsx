import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { faculties } from 'app/shared/data/exam';
import Faq from 'app/components/Faq';
import { Helmet } from 'react-helmet-async';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useCareers } from 'app/hooks/useCareers';
import { useSubjects } from 'app/hooks/useSubjects';

import { apiPostResponse } from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';

export default function Subjects() {
	const [faculty, setFaculty] = useState(() => {
		const faculty_local = localStorage.getItem('faculty');
		return faculty_local !== null ? faculty_local : '';
	});
	const [career, setCareer] = useState(() => {
		const career_local = localStorage.getItem('career');
		return career_local !== null ? career_local : '';
	});
	const [careers] = useCareers(faculty);
	const [subjects, setSubjects] = useSubjects(faculty, career);

	const handleChangeFaculty = (event: SelectChangeEvent) => {
		setFaculty(event.target.value);
		setCareer('');
		setSubjects([]);
	};

	const handleChangeCareer = (event: SelectChangeEvent) => {
		setCareer(event.target.value);
		axiosPost('api/user/update/profile', {
			career: event.target.value,
			faculty,
		})
			.then((result: apiPostResponse) => {
				if (result.ok) {
					console.log('ok');
				} else {
					console.log(result.error);
					console.log(result.errors);
				}
			})
			.catch(console.error);
	};

	return (
		<Fragment>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h5">Selecciona una carrera.</Typography>
			</Box>
			<Box sx={{ maxWidth: 300, mb: 2 }}>
				<FormControl fullWidth>
					<InputLabel id="faculty-select-label">Facultad</InputLabel>
					<Select
						labelId="faculty-select-label"
						id="faculty-select"
						value={faculty}
						label="Facultad"
						onChange={handleChangeFaculty}
					>
						{faculties.map((facu) => {
							return (
								<MenuItem key={facu} value={facu}>
									{facu}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
			<Box sx={{ maxWidth: 300, mb: 2 }}>
				<FormControl fullWidth>
					<InputLabel id="career-select-label">Carrera</InputLabel>
					<Select
						labelId="career-select-label"
						id="career-select"
						value={career}
						label="Carrera"
						onChange={handleChangeCareer}
						disabled={careers.length === 0}
					>
						{careers.map((career) => {
							return (
								<MenuItem key={career} value={career}>
									{career}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
			<Box>
				<Fragment>
					{subjects.length !== 0 ? (
						<Box sx={{ minHeight: 200, mt: 4 }}>
							{subjects.map((subject) => {
								return (
									<Box sx={{ mb: 2 }} key={subject.value}>
										<Typography variant="h6">
											<Link
												component={RouterLink}
												to={`/entrenamiento/${subject.value}`}
											>
												<>{subject.short + ' '}</>
												{subject.long !== '' ? `(${subject.long})` : null}
											</Link>
										</Typography>
									</Box>
								);
							})}
						</Box>
					) : (
						<Box sx={{ p: 4 }}>
							<Typography variant="h6">
								Elige una carrera para ver las materias.
							</Typography>
						</Box>
					)}
				</Fragment>
				<Box>
					<Faq />
				</Box>
			</Box>
			<Helmet>
				<title>Examenes de UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de UBA XXI. Parciales de cbc y uba xxi."
				/>
				<meta name="keywords" content="uba xxi, cbc" />
				{/* social media */}
				<meta property="og:url" content="https://ubaparciales.com/tests" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Parciales de UBA XXI" />
				<meta
					property="og:description"
					content="Practica parciales y potencia tu aprendizaje."
				/>
				<meta
					property="og:image"
					content="https://ubaparciales.com/opengraph/imgs/ipc-meta.jpg"
				/>
			</Helmet>
		</Fragment>
	);
}
