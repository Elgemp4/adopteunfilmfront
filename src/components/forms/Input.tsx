interface LoginInputPropsType{
    title?: string,
    postTitle?: string,
    name?: string,
    type?: string,
    required?: boolean
    value: string,
    onValueChange?: (newValue: string) => void
}


export default function Input({title = "", postTitle="", name="", type="text", required = true, value, onValueChange = () => {}} : LoginInputPropsType){
    return <div className="input-container">
        <label className="label">
            {title}
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="input"
                required={required}
            />
            {postTitle}
        </label>
    </div>
}