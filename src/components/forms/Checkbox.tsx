interface CheckboxProps{
    title: string,
    value: boolean,
    onChange: (newValue: boolean) => void
}

export default function Checkbox({title, value, onChange} : CheckboxProps){
    return <div className="input-container">
    <label className="label">
        <input
            type="checkbox"
            name="rememberMe"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="checkbox"
        />
        {title}
    </label>
</div>
}