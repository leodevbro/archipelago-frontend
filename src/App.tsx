import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { AuthBox } from './components/auth-flow/auth-box';

// setTimeout(() => {
//   // supabase.auth.admin.deleteUser('user-id').then(() => {
//   //   console.log('User deleted');
//   // });

//   supabase
//     .from('profiles')
//     .select('*')
//     .then(({ data, error }) => {
//       console.log(data, error);
//     });
// }, 3000);

export const ImgTest = () => {
  return (
    <div>
      <p>public</p>
      <p>{viteLogo}</p>
      <img src={viteLogo} />

      <br />
      <br />

      <p>assets</p>
      <p>{reactLogo}</p>
      <img src={reactLogo} />
    </div>
  );
};

function App() {
  useEffect(() => {
    console.log('App');
  }, []);

  return (
    <div>
      {/* <ImgTest /> */}

      <br />

      <AuthBox />
    </div>
  );
}

export default App;
