export default function DetailItem({
  ItemKey,
  ItemValue,
}: {
  ItemKey: string;
  ItemValue: string;
}) {
  if (!ItemValue) {
    return null;
  } else {
    return (
      <div className="flex gap-1 py-2">
        <p className="font text-gray-500 capitalize">{ItemKey}:</p>
        <p className="capitalize">{ItemValue}</p>
      </div>
    );
  }
}
