import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { api } from '../../api/general-bridge';
import { Login } from './elements/login';
import { Account } from './account';
import { PasswordReset } from './elements/reset-password';
import { SignUp } from './elements/signup';
import { TyAny } from '../../types/basic';

const authViewArr = ['Signup', 'Signin', 'ResetPassword'] as const;

type AuthView = (typeof authViewArr)[number];

type AuthViewMap = Record<AuthView, React.FC<TyAny>>;

export const AuthBox: React.FC = () => {
  const [session, setSession] = useState<null | Session>(null);

  const [currAuthView, setCurrAuthView] = useState<AuthView>('Signin');

  useEffect(() => {
    api.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const authState = api.auth.onAuthStateChange((_event, session) => {
      console.log('_event:', _event);
      setSession(session);
    });

    return () => {
      authState.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('session:', session);
  }, [session]);

  const handleLogout = async () => {
    const { error } = await api.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('Logged out successfully');
    }
  };

  const authViewMap = {
    Signup: SignUp,
    Signin: Login,
    ResetPassword: PasswordReset,
  } as const satisfies AuthViewMap;

  const CurrViewComponent = authViewMap[currAuthView];

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <div
        className="authNav"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          columnGap: '8px',
        }}
      >
        {authViewArr.map((viewName) => {
          const isCurr = viewName === currAuthView;
          return (
            <div
              key={viewName}
              className={`nav${viewName}`}
              onClick={() => setCurrAuthView(viewName)}
              style={{
                cursor: 'pointer',
                borderRadius: '4px',
                padding: '4px',
                outline: `2px solid ${isCurr ? 'blue' : 'transparent'}`,
              }}
            >
              {viewName}
            </div>
          );
        })}
      </div>

      <br />

      <div>{<CurrViewComponent />}</div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {session && <Account key={session.user.id} session={session} />}

      <br />
      <br />
      <br />
      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
