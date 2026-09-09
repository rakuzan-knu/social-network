import { createContext, useContext } from 'react';
import type { useCallManager } from './useCallManager';

export type CallContextValue = ReturnType<typeof useCallManager>;

export const CallContext = createContext<CallContextValue | null>(null);

export function useCall(): CallContextValue {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
}
