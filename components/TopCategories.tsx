type TopCategoriesProps = {
  categories: string[];
  active?: string;
};

export default function TopCategories({ categories, active }: TopCategoriesProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 pb-2">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              className={`rounded-sm border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-line bg-panel2 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}