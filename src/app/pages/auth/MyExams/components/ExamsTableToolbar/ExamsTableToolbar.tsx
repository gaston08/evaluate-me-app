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
                <SearchIcon />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Eliminar">
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon />
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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="magnifying-glass"
      className="svg-inline--fa fa-magnifying-glass "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: 20, height: 20 }}
    >
      <path
        fill="currentColor"
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      ></path>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="trash"
      className="svg-inline--fa fa-trash "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ width: 20, height: 20 }}
    >
      <path
        fill="currentColor"
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      ></path>
    </svg>
  );
}
