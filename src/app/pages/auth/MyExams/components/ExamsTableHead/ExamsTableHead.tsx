import * as React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '../../utils';

enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

interface HeadCellInterface {
  id: string;
  label: string;
  align?: string;
}

interface ExamsTableHeadProps {
  order: ORDER;
  orderBy: string;
  rowCount: number;
  headLabel: Array<HeadCellInterface>;
  numSelected: number;
  onRequestSort: (a: React.MouseEvent<HTMLElement>, b: string) => void;
  onSelectAllClick: (a: React.MouseEvent<HTMLElement>) => void;
}

export default function ExamsTableHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}: ExamsTableHeadProps) {
  const onSort =
    (property: string) => (event: React.MouseEvent<HTMLElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: 'white' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headLabel.map((headCell: HeadCellInterface) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            //sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === ORDER.DESC
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
