import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

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

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Box sx={{ mr: 2 }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Box>
          Editar
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Box sx={{ mr: 2 }}>
            <FontAwesomeIcon icon={faTrash} />
          </Box>
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
}
