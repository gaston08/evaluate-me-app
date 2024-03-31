import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resultTableInterface } from '../MyExams';

import {
  apiPostResponse,
  expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';

export default function ExamsTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selected,
  getAllResults,
  setSelected,
}: {
  numSelected: number;
  filterName: string;
  onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: Array<resultTableInterface>;
  getAllResults: () => void;
  setSelected: () => void;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<boolean>>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrors([]);
    setLoading(false);
    setOpen(false);
  };

  const deleteSelected = async (): void => {
    setLoading(true);
    const data = { arrIds: selected };
    const result: apiPostResponse = await axiosPost('api/results/delete', data);
    if (result.ok) {
      setOpen(false);
      setLoading(false);
      setSelected([]);
      getAllResults();
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

      setErrors(errArr);
      setLoading(false);
    }
  };

  console.log(errors);
  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} Seleccionados
          </Typography>
        ) : (
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Buscar exámen..."
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Eliminar">
            <IconButton onClick={handleClickOpen}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
      <Dialog open={open} onClose={handleClose}>
        <>
          {errors.length === 0 ? (
            <DialogTitle>Eliminar registro.</DialogTitle>
          ) : (
            <DialogTitle color="error">Error</DialogTitle>
          )}
        </>
        <DialogContent
          sx={{
            width: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {errors.length === 0 ? (
                <DialogContentText>
                  ¿Estás seguro de que deseas eliminar este registro? No se
                  podrá deshacer la operación.
                </DialogContentText>
              ) : (
                <DialogContentText>
                  No se pudo eliminar el registro. Intenta más tarde.
                </DialogContentText>
              )}
            </>
          )}
        </DialogContent>
        <>
          {errors.length === 0 ? (
            <DialogActions sx={{ pb: 2 }}>
              <Button
                disabled={loading}
                variant="contained"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                variant="contained"
                color="error"
                onClick={deleteSelected}
                autoFocus
              >
                Eliminar
              </Button>
            </DialogActions>
          ) : (
            <DialogActions sx={{ pb: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleClose}>
                Aceptar
              </Button>
            </DialogActions>
          )}
        </>
      </Dialog>
    </>
  );
}
