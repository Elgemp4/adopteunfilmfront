import Button from "./Button.tsx";

interface ButtonPropsType {
    text: string;
    type?: "button" | "submit" | "reset" | undefined;
    name: string;
    onClick?: () => void;
}

interface ButtonContainerProps {
    buttons: ButtonPropsType[];
}

export default function ButtonContainer({ buttons }: ButtonContainerProps) {
    return (
        <div className="button-container">
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    text={button.text}
                    type={button.type}
                    name={button.name}
                    onClick={button.onClick}
                />
            ))}
        </div>
    );
}