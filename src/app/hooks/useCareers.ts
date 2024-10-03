import { useState, useEffect } from 'react';
import { facultyInterface } from 'app/shared/data/exam';

import agronomia from 'app/shared/data/careers/agronomia';
import arquitectura_diseño_y_urbanismo from 'app/shared/data/careers/arquitectura_diseño_y_urbanismo';
import ciencias_economicas from 'app/shared/data/careers/ciencias_economicas';
import ciencias_exactas_y_naturales from 'app/shared/data/careers/ciencias_exactas_y_naturales';
import ciencias_sociales from 'app/shared/data/careers/ciencias_sociales';
import ciencias_veterinarias from 'app/shared/data/careers/ciencias_veterinarias';
import derecho from 'app/shared/data/careers/derecho';
import farmacia_y_bioquimica from 'app/shared/data/careers/farmacia_y_bioquimica';
import filosofia_y_letras from 'app/shared/data/careers/filosofia_y_letras';
import ingenieria from 'app/shared/data/careers/ingenieria';
import medicina from 'app/shared/data/careers/medicina';
import odontologia from 'app/shared/data/careers/odontologia';
import psicologia from 'app/shared/data/careers/psicologia';

export const useCareers = (facultyName) => {
	const [careers, setCareers] = useState([]);

	useEffect(() => {
		if (facultyName !== '') {
			let faculty: facultyInterface;

			switch (facultyName) {
				case 'Facultad de Agronomía': {
					faculty = agronomia as facultyInterface;
					break;
				}
				case 'Facultad de Arquitectura, Diseño y Urbanismo': {
					faculty = arquitectura_diseño_y_urbanismo as facultyInterface;
					break;
				}
				case 'Facultad de Ciencias Económicas': {
					faculty = ciencias_economicas as facultyInterface;
					break;
				}
				case 'Facultad de Ciencias Exactas y Naturales': {
					faculty = ciencias_exactas_y_naturales as facultyInterface;
					break;
				}
				case 'Facultad de Ciencias Sociales': {
					faculty = ciencias_sociales as facultyInterface;
					break;
				}
				case 'Facultad de Ciencias Veterinarias': {
					faculty = ciencias_veterinarias as facultyInterface;
					break;
				}
				case 'Facultad de Derecho': {
					faculty = derecho as facultyInterface;
					break;
				}
				case 'Facultad de Farmacia y Bioquímica': {
					faculty = farmacia_y_bioquimica as facultyInterface;
					break;
				}
				case 'Facultad de Filosofía y Letras': {
					faculty = filosofia_y_letras as facultyInterface;
					break;
				}
				case 'Facultad de Ingeniería': {
					faculty = ingenieria as facultyInterface;
					break;
				}
				case 'Facultad de Medicina': {
					faculty = medicina as facultyInterface;
					break;
				}
				case 'Facultad de Odontología': {
					faculty = odontologia as facultyInterface;
					break;
				}
				case 'Facultad de Psicología': {
					faculty = psicologia as facultyInterface;
					break;
				}
			}

			setCareers(faculty.careers.map((car) => car.career));
		}
	}, [facultyName]);

	return [careers];
};
