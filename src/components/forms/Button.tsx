interface ButtonPropsType {
    text: string,
    type?: "button" | "submit" | "reset" | undefined,
    name: string,
    onClick?: (() => void) | undefined
}


export default function Button({ text, type = "button", name, onClick }: ButtonPropsType) {
    return (
        <button type={type} name={name} className="button" onClick={onClick}>
            {text}
        </button>
    );
}