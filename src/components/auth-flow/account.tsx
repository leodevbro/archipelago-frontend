import { useState, useEffect, FormEventHandler } from 'react';
import { Session } from '@supabase/supabase-js';
// import { api } from '../../api/general-bridge';
import { sbInit } from '../../api/for-specific-backends/supabase-leo/init';

const supabase = sbInit.supabase;

export type AccountProps = {
  session: Session;
};

export function Account({ session }: AccountProps) {
  const [loading, setLoading] = useState(true);
  const [a001, setA001] = useState<null | string>(null);
  const [a002, setA002] = useState<null | number>(null);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;
      const { data, error } = await supabase
        .from('profiles')
        .select(`id, aaa`)
        // .select(`*`);
        .eq('id', user.id);

      console.log('data', data);

      if (!ignore) {
        if (error) {
          console.log('haaaaaa');
          console.warn(error);
        } else if (data) {
          if (data.length) {
            setA001(data[0].id);
            setA002(data[0].aaa);
          }
        }
      }
      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const { error } = await supabase
      .from('profiles')
      .update({
        aaa: a002,
      })
      .eq('id', user.id);

    if (error) {
      alert(error.message);
    } else {
      //
    }
    setLoading(false);
  };

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="a001">a001</label>
        <input
          id="a001"
          type="text"
          required
          value={a001 || ''}
          onChange={(e) => setA001(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a002">a002</label>
        <input
          id="a002"
          type="number"
          value={a002 || ''}
          onChange={(e) => setA002(+e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <button
        onClick={async () => {
          // to be implemented
          alert('to be implemented');
        }}
      >
        try to delete my user profile and user entirely
      </button>
    </form>
  );
}
