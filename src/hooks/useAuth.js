import { useContext } from 'react';
import { AuthContext } from 'src/contexts/JWTContext';
import { SnackContext } from 'src/contexts/SnackBarContext';

const useAuth = () => useContext(AuthContext);
const useSnack = () => useContext(SnackContext);

export { useAuth, useSnack };
