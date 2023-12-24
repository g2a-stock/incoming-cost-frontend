import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Авторизация',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
