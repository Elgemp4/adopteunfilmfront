export default function LoginForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="form-container">
                <div className="input-container">
                    <label className="label">
                        Nom d'utilisateur:
                        <input
                            type="text"
                            className="input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label className="label">
                        Mot de passe:
                        <input
                            type="password"
                            className="input"
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button
                        type="submit"
                        className="button"
                    >
                        Se connecter
                    </button>
                    <button
                        type="submit"
                        className="button"
                    >
                        S'enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}