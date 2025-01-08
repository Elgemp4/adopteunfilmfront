interface ButtonPropsType {
    text: string,
    type?: "button" | "submit" | "reset" | undefined,
    name: string,
    className?: string,
    onClick?: (() => void) | undefined,
    [key: string]: any
}


export default function Button({ text, className = "",  type = "button", name, onClick, ...props }: ButtonPropsType) {
    return (
        <button type={type} name={name} className={"button " + className} onClick={onClick} {...props}>
            {text}
        </button>
    );
}