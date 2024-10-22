interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null;
  return (
    <div className="text-[#cc3e34fe] text-md italic py-2">{error.message}</div>
  );
}
