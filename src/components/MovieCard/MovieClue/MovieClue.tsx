import "./MovieClue.css";

interface MovieClueProps {
    clueLabel: string;
    clueContent: string;
    isHidden?: boolean;
}

export default function MovieClue({ clueLabel, clueContent, isHidden = true }: MovieClueProps) {
    return (
        <p className="movie-clue">
            <span className="movie-clue-label">
                {clueLabel}
            </span>
            <span className={`movie-clue-content ${isHidden ? "movie-clue-content-blurred" : ""}`}>
                {" " + clueContent}
            </span>
        </p>
    );
}