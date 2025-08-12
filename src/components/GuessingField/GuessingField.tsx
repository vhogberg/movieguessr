import "./GuessingField.css";

export default function GuessingField() {
  return (
    <div className="guessing-field">
      <input
        type="text"
        placeholder="Type here..."
        className="text-field"
        aria-label="Text input field"
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-arrow-right-icon lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
