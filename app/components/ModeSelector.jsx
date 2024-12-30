import Link from "next/link";

export default function ModeSelector() {
  return (
    <div className="flex gap-2 w-fit p-4">
      <button
        className="text-white p-2 rounded"
      >
        <Link href="/">Work</Link>
      </button>
      <button
        className="text-white bg-blue-500 p-2 rounded"
      >
        <Link href="/break">Break</Link>
      </button>
      <button
        className="text-white bg-blue-500 p-2 rounded"
      >
        <Link href="/long">Long break</Link>
      </button>
    </div>
  );
}
