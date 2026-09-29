import "./Login.css";
import {
  FormEvent,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthContext,
} from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const {
    signIn,
    loading,
    error,
  } = useAuthContext();

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [formError, setFormError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError(null);

    if (!phone.trim()) {
      setFormError(
        "Veuillez saisir votre numéro de téléphone."
      );
      return;
    }

    if (!password) {
      setFormError(
        "Veuillez saisir votre mot de passe."
      );
      return;
    }

    try {
      await signIn(
        phone.trim(),
        password
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch {
      // L'erreur est déjà gérée par useAuth.
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>JËFAL</h1>

          <p>
            Gérez votre activité simplement.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="form-group">
            <label htmlFor="phone">
              Numéro de téléphone
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="Ex : 771234567"
              autoComplete="tel"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Mot de passe
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {(formError || error) && (
            <div className="form-error">
              {formError || error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>

        </form>
      </div>
    </div>
  );
}
