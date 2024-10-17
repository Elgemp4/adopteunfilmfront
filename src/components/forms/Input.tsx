interface LoginInputPropsType{
    title?: string,
    postTitle?: string,
    name: string,
    type: string,
    value: string,
    onValueChange?: (newValue: string) => void
}


export default function LoginInput({title = "", postTitle="", name, type, value, onValueChange = () => {}} : LoginInputPropsType){
    return <div className="input-container">
        <label className="label">
            {title}
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="input"
            />
            {postTitle}
        </label>
    </div>
}