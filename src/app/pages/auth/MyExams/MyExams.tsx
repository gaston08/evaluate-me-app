import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'app/components/ScrollBar';
import TableNoData from './components/TableNoData';
import ExamsTableRow from './components/ExamsTableRow';
import ExamsTableHead from './components/ExamsTableHead';
import TableEmptyRows from './components/TableEmptyRows';
import ExamsTableToolbar from './components/ExamsTableToolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import {
	apiGetAllResultsResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import { subjects } from 'app/shared/data/exam';

export interface resultTableInterface {
	_id: string;
	date: string;
	subject: string;
	exam_number: number;
	exam_type: string;
	exam_year: number;
	score: string;
}

export default function MyExams() {
	const [page, setPage] = React.useState<number>(0);
	const [order, setOrder] = React.useState<string>('asc');
	const [selected, setSelected] = React.useState([]);
	const [orderBy, setOrderBy] = React.useState<string>('name');
	const [filterName, setFilterName] = React.useState<string>('');
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [results, setResults] = React.useState<Array<resultTableInterface>>([]);
	const [errors, setErrors] = React.useState<Array<string>>([]);

	React.useEffect(() => {
		async function getAllResults() {
			setLoading(true);
			const result: apiGetAllResultsResponse =
				await axiosGet('api/results/get');
			if (result.ok) {
				const newArrResults = result.data.results.map((res) => {
					const date = new Date(res.date);
					const formatted_date = `${date.getDate()}/${
						date.getMonth() + 1
					}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
					const subject = subjects.find(
						(sub) => sub.value === res.exam_subject,
					).label;
					return {
						_id: res._id,
						date: formatted_date,
						subject,
						exam_number: res.exam_number,
						exam_type: res.exam_type,
						exam_year: res.exam_year,
						score: res.score,
					};
				});
				setResults(newArrResults);
				setLoading(false);
			} else {
				const errArr = [];
				if (result.error) {
					errArr.push(result.error);
				}

				if (result.errors) {
					result.errors.forEach((err: expressError) => {
						errArr.push(err.msg);
					});
				}

				console.log(errArr);

				setErrors(errArr);

				setLoading(false);
			}
		}

		getAllResults().then().catch(console.error);
	}, []);

	const handleSort = (event: React.MouseEvent<HTMLElement>, _id: string) => {
		const isAsc = orderBy === _id && order === 'asc';
		if (_id !== '') {
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(_id);
		}
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = results.map((n) => n._id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>, _id: string) => {
		const selectedIndex = selected.indexOf(_id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, _id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (
		event: React.ChangeEvent<HTMLInputElement>,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const dataFiltered = applyFilter({
		inputData: results,
		comparator: getComparator(order, orderBy),
		filterName,
	});

	const notFound = !dataFiltered.length && !!filterName;

	return (
		<Container>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				mb={5}
			>
				<Typography variant="h4">Parciales resueltos. </Typography>
				{loading ? <Typography>Cargando...</Typography> : null}
			</Stack>

			<Card>
				<ExamsTableToolbar
					numSelected={selected.length}
					filterName={filterName}
					onFilterName={handleFilterByName}
				/>

				<Scrollbar>
					<TableContainer sx={{ overflow: 'unset' }}>
						<Table sx={{ minWidth: 800 }}>
							<ExamsTableHead
								order={order}
								orderBy={orderBy}
								rowCount={results.length}
								numSelected={selected.length}
								onRequestSort={handleSort}
								onSelectAllClick={handleSelectAllClick}
								headLabel={[
									{ id: 'subject', label: 'Materia' },
									{ id: 'exam_type', label: 'Tipo' },
									{ id: 'exam_number', label: 'Tema' },
									{ id: 'exam_year', label: 'Año' },
									{ id: 'score', label: 'Nota' },
									{ id: 'date', label: 'Fecha' },
									{ id: '' },
								]}
							/>
							<TableBody>
								{dataFiltered
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row: resultTableInterface) => (
										<ExamsTableRow
											result={row}
											key={row._id}
											selected={selected.includes(row._id)}
											handleClick={(event: React.MouseEvent<HTMLElement>) => {
												handleClick(event, row._id);
											}}
										/>
									))}

								<TableEmptyRows
									height={77}
									emptyRows={emptyRows(page, rowsPerPage, results.length)}
								/>

								{notFound && <TableNoData query={filterName} />}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<TablePagination
					page={page}
					component="div"
					count={results.length}
					rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 10, 25]}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{ backgroundColor: 'white' }}
				/>
			</Card>
			<Box sx={{ mt: 4, mb: 4 }}>
				{errors.map((err) => {
					return (
						<Typography sx={{ mb: 2 }} color="error">
							{err}
						</Typography>
					);
				})}
			</Box>
		</Container>
	);
}
