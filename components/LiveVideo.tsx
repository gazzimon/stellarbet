type LiveVideoProps = {
  home: string;
  away: string;
  premiumMember: boolean;
};

export default function LiveVideo({ home, away, premiumMember }: LiveVideoProps) {
  return (
    <section className="surface p-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Video Player</h2>
        {premiumMember ? <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold text-black">HD</span> : null}
      </div>

      <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-gradient-to-br from-slate-800 to-slate-900">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(36,179,107,0.24),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(245,217,106,0.15),transparent_35%)] ${premiumMember ? '' : 'blur-[1.2px]'}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <button type="button" className="rounded-full border border-white/30 bg-black/45 px-4 py-2 text-xs font-semibold text-white">
            Reproducir
          </button>
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-slate-300">
          {home} vs {away}
        </div>

        {!premiumMember ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 p-4 text-center backdrop-blur-[1px]">
            <p className="text-sm font-semibold">Hazte socio para ver el partido en vivo HD</p>
            <button type="button" className="rounded-sm border border-accent bg-accent px-3 py-1.5 text-xs font-bold text-black">
              Hacerse socio
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
