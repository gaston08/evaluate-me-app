import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import { axiosPost } from 'app/utils/axios';
import {
  apiPostResponse,
  expressError,
} from 'app/shared/interfaces/api-response';
import axios from 'axios';

interface formDataType {
  fullName: string;
  username: string;
  email: string;
}

interface formInfoType {
  isLoading: boolean;
  success: boolean;
  errors: Array<string>;
}

export default function AccountDetailsForm() {
  const { auth } = React.useContext<contextAuth>(AuthContext);
  const [formData, setFormData] = React.useState<formDataType>({
    fullName: auth.user.fullName,
    username: auth.user.username,
    email: auth.user.email,
  });
  const [formInfo, setFormInfo] = React.useState<formInfoType>({
    isLoading: false,
    success: false,
    errors: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...formData };

    if (e.target.name === 'fullName') {
      newValue.fullName = e.target.value;
    } else if (e.target.name === 'username') {
      newValue.username = e.target.value;
    } else if (e.target.name === 'email') {
      newValue.email = e.target.value;
    }

    setFormData(newValue);
  };

  const updateProfile = async (): void => {
    setFormInfo({
      isLoading: true,
      success: false,
      errors: [],
    });
    const result: apiPostResponse = await axiosPost(
      'api/user/update/profile',
      formData,
    );
    if (result.ok) {
      localStorage.setItem('access_token', result.data.token);
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${result.data.token}`;
      setFormInfo({
        isLoading: false,
        success: true,
        errors: [],
      });
    } else {
      const errArr = [];
      if (result.error) {
        errArr.push(result.error);
      }

      if (result.errors) {
        result.errors.forEach((err: expressError): void => {
          errArr.push(err.msg);
        });
      }

      setFormInfo({
        isLoading: false,
        success: false,
        errors: errArr,
      });
    }
  };

  return (
    <Card sx={{ backgroundColor: 'white' }}>
      <CardHeader
        subheader="Asegurate de escribir bien tus datos."
        title="Datos personales"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Nombre</InputLabel>
              <OutlinedInput
                value={formData.fullName}
                label="Nombre"
                name="fullName"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Usuario</InputLabel>
              <OutlinedInput
                value={formData.username}
                label="Usuario"
                name="username"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Correo Electrónico</InputLabel>
              <OutlinedInput
                value={formData.email}
                label="Correo Electrónico"
                name="email"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <>
            {formInfo.errors.map((error) => {
              return (
                <Box key={error}>
                  <Typography color="error">{error}</Typography>
                </Box>
              );
            })}
          </>
          <>
            {formInfo.success ? (
              <Box>
                <Typography color="#689f38">Actualizado con éxito.</Typography>
              </Box>
            ) : null}
          </>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          disabled={formInfo.isLoading}
          variant="contained"
          onClick={updateProfile}
        >
          Actualizar
        </Button>
      </CardActions>
    </Card>
  );
}
