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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>

      <p>reactLogo</p>
      <p>{reactLogo}</p>

      <br />
      <br />

      <p>viteLogo</p>
      <p>{viteLogo}</p>
    </div>
  );
}

export default App;
