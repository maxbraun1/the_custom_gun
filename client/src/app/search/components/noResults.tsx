export default function NoResults({ term }: { term?: string }) {
  return (
    <div className="flex w-full items-center justify-center h-64 font-display text-3xl text-gray-500">
      <p>No listings found</p>
    </div>
  );
}
