interface ImpactBarsProps {
  items: { name: string; percent: number }[];
}

export function ImpactBars({ items }: ImpactBarsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.name}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{item.name}</span>
            <span className="tabular-nums text-muted-foreground">{item.percent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full gradient-bar transition-all duration-700 ease-out"
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
