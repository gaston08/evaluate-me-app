interface selectType {
	label: string;
	value: string;
}

export const subjects: Array<selectType> = [
	/*{ label: 'ÁLGEBRA', value: 'algebra' },
	{ label: 'ANÁLISIS MATEMÁTICO', value: 'analisis-matematico' },
	{
		label: 'ANÁLISIS MATEMÁTICO PARA CS. ECONÓMICAS',
		value: 'analisis-matematico-para-cs-economicas',
	},
	{ label: 'ANTROPOLOGÍA', value: 'antropologia' },
	{ label: 'BIOFÍSICA', value: 'biofisica' },
	{ label: 'BIOLOGÍA', value: 'biologia' },
	{ label: 'BIOLOGÍA CELULAR', value: 'biologia-celular' },
	{ label: 'CIENCIAS POLÍTICAS', value: 'ciencias-politicas' },
	{
		label: 'DERECHOS HUMANOS Y DERECHO CONSTITUCIONAL',
		value: 'derechos-humanos-y-derecho-constitucional',
	},
	{ label: 'ECONOMÍA', value: 'economia' },
	{ label: 'FILOSOFÍA', value: 'filosofia' },
	{ label: 'FÍSICA', value: 'fisica' },
	{
		label: 'HISTORIA ECONÓMICA SOCIAL Y GENERAL',
		value: 'historia-economica-social-y-general',
	},
	{ label: 'MATEMÁTICA', value: 'matematica' },
	{ label: 'MATEMÁTICA PARA AGRONOMÍA', value: 'matematica-para-agronomia' },*/
	{ label: 'PENSAMIENTO CIENTÍFICO', value: 'pensamiento-cientifico' },
	/*
	{ label: 'PENSAMIENTO COMPUTACIONAL', value: 'pensamiento-computacional' },
	{
		label: 'PRINCIPIOS GENERALES DE DERECHO PRIVADO',
		value: 'principios-generales-de-derecho-privado',
	},
	{ label: 'PSICOLOGÍA', value: 'psicologia' },
	{ label: 'QUÍMICA', value: 'quimica' },
	{ label: 'SEMIOLOGÍA', value: 'semiologia' },
	*/
	{ label: 'SOCIEDAD Y ESTADO', value: 'sociedad-y-estado' },
	/*
	{ label: 'SOCIOLOGÍA', value: 'sociologia' },
	{ label: 'TRABAJO Y SOCIEDAD', value: 'trabajo-y-sociedad' },
	*/
];

export enum SUBJECTS_ENUM {
	PENSAMIENTO_CIENTIFICO = 'pensamiento-cientifico',
	SOCIEDAD_Y_ESTADO = 'sociedad-y-estado',
}

export const years: Array<number> = [
	2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
];

export const exam_types: Array<selectType> = [
	{
		label: '1er Parcial',
		value: 'primer_parcial',
	},
	{
		label: '2do Parcial',
		value: 'segundo_parcial',
	},
	{
		label: 'Recuperatorio 1er Parcial',
		value: 'recuperatorio_primer_parcial',
	},
	{
		label: 'Recuperatorio 2do Parcial',
		value: 'recuperatorio_segundo_parcial',
	},
	{
		label: 'Final',
		value: 'final',
	},
];

interface departmentsType {
	[SUBJECTS_ENUM.PENSAMIENTO_CIENTIFICO]: Array<selectType>;
	[SUBJECTS_ENUM.SOCIEDAD_Y_ESTADO]: Array<selectType>;
}

export const departments: departmentsType = {
	'pensamiento-cientifico': [
		{
			label: '(Cátedra: BUACAR, Natalia)',
			value: 'catedra-buacar-natalia',
		},
	],
	'sociedad-y-estado': [
		{
			label: '(Cátedra: PEDROSA, Fernando)',
			value: 'catedra-pedrosa-fernando',
		},
	],
};

export const exam_numbers: Array<number> = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
