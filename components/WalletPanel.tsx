'use client';

import { useMemo, useState } from 'react';
import { abbreviateKey } from '@/lib/utils';

type WalletPanelProps = {
  onWalletStatusChange: (payload: { connected: boolean; demoMode: boolean; publicKey?: string }) => void;
};

type FreighterLike = {
  getPublicKey?: () => Promise<string>;
  requestAccess?: () => Promise<string>;
};

export default function WalletPanel({ onWalletStatusChange }: WalletPanelProps) {
  const freighter = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return (window as unknown as { freighterApi?: FreighterLike }).freighterApi ?? null;
  }, []);

  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [usdcBalance] = useState(142.55);

  const hasFreighter = Boolean(freighter);

  const connectWallet = async () => {
    if (!freighter) {
      setConnected(true);
      setPublicKey('GD3MDEMOACCOUNTPUBLICKEYXX1234');
      onWalletStatusChange({ connected: true, demoMode: true, publicKey: 'GD3MDEMOACCOUNTPUBLICKEYXX1234' });
      return;
    }

    try {
      const key =
        (freighter.getPublicKey ? await freighter.getPublicKey() : undefined) ||
        (freighter.requestAccess ? await freighter.requestAccess() : undefined) ||
        'GDFREIGHTERCONNECTEDPUBLICKEYXX5678';

      setConnected(true);
      setPublicKey(key);
      onWalletStatusChange({ connected: true, demoMode: false, publicKey: key });
    } catch {
      setConnected(true);
      setPublicKey('GD3MDEMOACCOUNTPUBLICKEYXX1234');
      onWalletStatusChange({ connected: true, demoMode: true, publicKey: 'GD3MDEMOACCOUNTPUBLICKEYXX1234' });
    }
  };

  return (
    <section className="surface p-3">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Wallet Stellar</h2>

      {!connected ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">Estado: Desconectado</p>
          <button
            type="button"
            onClick={connectWallet}
            className="w-full rounded-sm border border-accent bg-accent px-3 py-2 text-xs font-bold text-black"
          >
            Conectar billetera (Freighter)
          </button>
          {!hasFreighter ? (
            <p className="text-xs text-amber-300">
              Freighter no detectado. Instala Freighter y vuelve a conectar. Operando en modo demo.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-sm border border-line bg-panel2 p-2 text-xs">
            <p className="text-slate-400">Cuenta</p>
            <p className="font-mono text-sm text-slate-100">{abbreviateKey(publicKey, 6)}</p>
          </div>
          <div className="rounded-sm border border-line bg-panel2 p-2 text-xs">
            <p className="text-slate-400">Balance USDC (mock)</p>
            <p className="text-sm font-bold text-odd">{usdcBalance.toFixed(2)} USDC</p>
          </div>
          <button type="button" className="w-full rounded-sm border border-line bg-panel2 px-3 py-2 text-xs font-semibold text-slate-100 hover:border-slate-500">
            Confirmar operación en Stellar
          </button>
          {!hasFreighter ? <p className="text-[11px] text-slate-400">Conectado en modo demo.</p> : null}
        </div>
      )}
    </section>
  );
}