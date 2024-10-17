interface ButtonPropsType{
    text: string,
    type?: "button" | "submit" | "reset" | undefined
    name: string
}


export default function Button({text, type = "button", name} : ButtonPropsType){
    return <button type={type} name={name} className="button">
    {text}
</button>
}