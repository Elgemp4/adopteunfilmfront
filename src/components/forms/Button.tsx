interface ButtonPropsType {
    text: string,
    type?: "button" | "submit" | "reset" | undefined,
    name: string,
    onClick?: (() => void) | undefined,
    [key: string]: any
}


export default function Button({ text, type = "button", name, onClick, ...props }: ButtonPropsType) {
    return (
        <button type={type} name={name} className="button" onClick={onClick} {...props}>
            {text}
        </button>
    );
}