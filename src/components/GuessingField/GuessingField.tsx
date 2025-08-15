import { useRef } from "react";
import "./GuessingField.css";

interface GuessingFieldProps {
  onSubmit: (guess: string) => void;
}

export default function GuessingField({ onSubmit }: GuessingFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop page reload
    if (inputRef.current) {
      onSubmit(inputRef.current.value);
      inputRef.current.value = ""; // clear after submit
    }
  }

  return (
    <form className="guessing-field" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        className="text-field"
        aria-label="Text input field"
      />
      <button type="submit" className="guess-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
