export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-[#cc3e34fe] text-xs italic mt-1 py-2">
      {err}
    </div>
  ));
}
