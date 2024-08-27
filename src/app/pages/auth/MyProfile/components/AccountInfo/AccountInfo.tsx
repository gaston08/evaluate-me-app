import { useContext, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AvatarName from 'app/components/Avatar';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import imageCompression from 'browser-image-compression';
import { getSignedUrl, uploadFileToSignedUrl } from 'app/utils/axios';
import Avatar from '@mui/material/Avatar';
import { decodeToken } from 'react-jwt';
import { userType, authType } from 'app/shared/interfaces/auth';

interface apiCall {
  data: {
    signedUrl: string;
  };
  token: string;
}

async function handleImageUpload(
  event: Event,
  setAuth: React.Dispatch<React.SetStateAction<authType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setLoading(true);
  const imageFile = (event.target as HTMLInputElement).files[0];

  const options = {
    maxSizeMB: 0.01,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    const content_type = imageFile.type;

    const key = `profile_pictures/${window.crypto.randomUUID()}`;

    getSignedUrl({ key, content_type })
      .then((response: apiCall) => {
        localStorage.setItem('access_token', response.token);

        uploadFileToSignedUrl(
          response.data.signedUrl,
          compressedFile,
          content_type,
          null,
          () => {
            const user = decodeToken(response.token) as userType;
            setAuth({
              user,
              isLoggedIn: true,
              isLoading: false,
            });
            setLoading(false);
          },
        );
      })
      .catch(console.error);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

export default function AccountInfo() {
  const { auth, setAuth } = useContext<contextAuth>(AuthContext);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth.user;

  const fullName = user?.fullName || '';

  const handleUpload = () => {
    (inputRef.current as HTMLElement).click();
  };

  console.log(user.avatarUrl);

  return (
    <Card sx={{ backgroundColor: 'white' }}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            {user.avatarUrl === '' || user.avatarUrl === undefined ? (
              <AvatarName fullName={fullName} />
            ) : (
              <Avatar
                alt="profile picture"
                src={user.avatarUrl}
                sx={{ width: 56, height: 56 }}
              />
            )}
          </div>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cambiar imagen'}
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleImageUpload(event, setAuth, setLoading).catch(console.error);
          }}
          hidden
          ref={inputRef}
        />
      </CardActions>
    </Card>
  );
}
