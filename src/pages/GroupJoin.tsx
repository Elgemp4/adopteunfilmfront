
export default function GroupJoin() {
    return (
        <form className="form-container">
            <div className="input-container">
                <label className="label">
                    Code du groupe:
                    <input
                        type="text"
                        name="groupCode"
                        className="input"
                    />
                </label>
            </div>
            <div className="button-container">
                <button type="submit" className="button">
                    Rejoindre
                </button>
            </div>
        </form>
    );
}