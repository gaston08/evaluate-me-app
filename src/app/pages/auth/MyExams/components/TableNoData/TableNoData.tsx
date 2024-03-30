import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

interface TableNoDataProps {
  query: string;
}

export default function TableNoData({ query }: TableNoDataProps) {
  return (
    <TableRow sx={{ backgroundColor: 'white' }}>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            p: 3,
          }}
        >
          <Typography variant="h6" paragraph>
            Sin resultados
          </Typography>

          <Typography variant="body2">
            Ningún resultado para &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Asegurate de escribir correct el nombre de la materia.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
