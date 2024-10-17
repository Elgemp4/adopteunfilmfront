
export default function GroupCreate() {
    return (
        <form className="form-container">
            <div className="input-container">
                <label className="label">
                    Nom du groupe:
                    <input
                        type="text"
                        name="groupName"
                        className="input"
                    />
                </label>
            </div>
            <div className="button-container">
                <button type="submit" className="button">
                    Créer
                </button>
            </div>
        </form>
    );
}