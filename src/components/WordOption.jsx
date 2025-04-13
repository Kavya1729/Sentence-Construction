export default function WordOption({
  word,
  selected,
  selectionNumber,
  onSelect,
}) {
  return (
    <button
      onClick={onSelect}
      className={`px-4 py-2 rounded-lg transition-all relative ${
        selected
          ? "bg-blue-500 text-white"
          : "bg-blue-100 hover:bg-blue-200 cursor-pointer"
      }`}
    >
      {word}
      {selectionNumber && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {selectionNumber}
        </span>
      )}
    </button>
  );
}
