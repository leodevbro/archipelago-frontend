import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

//
import { Database } from '../database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

console.log(typeof supabase, supabase);

setTimeout(() => {
  supabase.auth.admin.deleteUser('user-id').then(() => {
    console.log('User deleted');
  });
}, 3000);

//

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
  const [count, setCount] = useState(0);

  return (
    <div>
      <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>

      {/* <ImgTest /> */}
    </div>
  );
}

export default App;
