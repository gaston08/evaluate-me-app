import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import ReactTimeAgo from 'react-time-ago';
import { resultType } from 'app/shared/interfaces/api-response';
import { useTheme } from '@mui/material/styles';

export default function ExamsTableRow({
  selected,
  result,
  handleClick,
}: {
  result: resultType;
  selected: boolean;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const theme = useTheme();
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

        <TableCell>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            <ReactTimeAgo date={new Date(result.date)} locale="es-AR" />
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}
