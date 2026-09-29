import {
  useEffect,
  useRef,
  useState,
} from "react";

interface VoiceButtonProps {
  onResult?: (
    text: string
  ) => void;

  disabled?: boolean;
}

interface SpeechRecognitionEvent
  extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent
  extends Event {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart:
    | (() => void)
    | null;

  onend:
    | (() => void)
    | null;

  onresult:
    | ((
        event: SpeechRecognitionEvent
      ) => void)
    | null;

  onerror:
    | ((
        event: SpeechRecognitionErrorEvent
      ) => void)
    | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;

    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function VoiceButton({
  onResult,
  disabled = false,
}: VoiceButtonProps) {
  const [
    isListening,
    setIsListening,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(
      null
    );

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "La reconnaissance vocale n'est pas disponible sur ce navigateur."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "fr-FR";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (
      event
    ) => {
      const result =
        event.results[0];

      if (!result) {
        return;
      }

      const text =
        result[0]?.transcript
          ?.trim();

      if (
        text &&
        onResult
      ) {
        onResult(text);
      }
    };

    recognition.onerror = (
      event
    ) => {
      setIsListening(false);

      if (
        event.error ===
        "not-allowed"
      ) {
        setError(
          "L'accès au microphone a été refusé."
        );
        return;
      }

      if (
        event.error ===
        "no-speech"
      ) {
        setError(
          "Aucune parole détectée."
        );
        return;
      }

      setError(
        "Une erreur est survenue avec la reconnaissance vocale."
      );
    };

    recognitionRef.current =
      recognition;

    return () => {
      recognition.abort();

      recognitionRef.current =
        null;
    };
  }, [onResult]);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    const recognition =
      recognitionRef.current;

    if (!recognition) {
      setError(
        "La reconnaissance vocale n'est pas disponible."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      return;
    }

    setError(null);

    try {
      recognition.start();
    } catch {
      setError(
        "Impossible de démarrer le microphone."
      );
    }
  };

  return (
    <div className="voice-button-container">

      <button
        type="button"
        className={
          isListening
            ? "voice-button listening"
            : "voice-button"
        }
        onClick={handleClick}
        disabled={disabled}
        aria-label={
          isListening
            ? "Arrêter la reconnaissance vocale"
            : "Démarrer la reconnaissance vocale"
        }
        title={
          isListening
            ? "Arrêter"
            : "Parler"
        }
      >
        <span
          aria-hidden="true"
        >
          {isListening
            ? "■"
            : "🎤"}
        </span>

        <span>
          {isListening
            ? "Écoute..."
            : "Parler"}
        </span>
      </button>

      {error && (
        <p className="voice-button-error">
          {error}
        </p>
      )}

    </div>
  );
}