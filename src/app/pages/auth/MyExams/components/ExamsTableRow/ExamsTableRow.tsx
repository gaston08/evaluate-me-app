import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import { resultType } from 'app/shared/interfaces/api-response';

export default function ExamsTableRow({
  selected,
  result,
  handleClick,
}: {
  result: resultType;
  selected: boolean;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <>
      <TableRow
        sx={{ backgroundColor: 'white' }}
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{result.subject}</TableCell>

        <TableCell>{result.exam_type}</TableCell>

        <TableCell>{result.exam_number}</TableCell>

        <TableCell>{result.exam_year}</TableCell>

        <TableCell>{result.score}</TableCell>

        <TableCell>{result.date}</TableCell>
      </TableRow>
    </>
  );
}
