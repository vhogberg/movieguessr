import { useRef } from "react";
import "./GuessingField.css";

interface GuessingFieldProps {
  onSubmit: (guess: string) => void;
}

export default function GuessingField({ onSubmit }: GuessingFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to reset viewport zoom
  const resetZoom = () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
      // Force reflow to ensure zoom reset
      document.body.style.zoom = "1";
    }
  };

  // Handle form submission (button click)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Stop page reload
    if (inputRef.current) {
      const guess = inputRef.current.value.trim();
      if (guess) {
        onSubmit(guess);
        inputRef.current.value = ""; // Clear after submit
        resetZoom(); // Reset zoom after submission
      }
    }
  }

  // Handle Enter key press
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if already handled
      if (inputRef.current) {
        const guess = inputRef.current.value.trim();
        if (guess) {
          onSubmit(guess);
          inputRef.current.value = ""; // Clear after submit
          resetZoom(); // Reset zoom after Enter
        }
      }
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
        onKeyDown={handleKeyDown}
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