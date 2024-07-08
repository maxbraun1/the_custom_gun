export default function NothingFound({ message }: { message: string }) {
  return (
    <div className="text-center py-64">
      <h1 className="font-display w-full text-3xl text-gray-500">{message}</h1>
    </div>
  );
}
