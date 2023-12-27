// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
