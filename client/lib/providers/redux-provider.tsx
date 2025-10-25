'use client';

import { store } from '@/lib/store/store';
import { Provider } from 'react-redux';
import { AuthInitializer } from '@/lib/components/AuthInitializer';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}

