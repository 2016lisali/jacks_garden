import { FloatingLabel, Form } from "react-bootstrap";

const FormInput = ({ register, errors, type, name, formattedName, tips }) => {
    return (
        <FloatingLabel className="mb-3" label={formattedName}>
            <Form.Control
                type={type}
                name={name}
                placeholder={formattedName}
                {...register(name)}
                data-tip={tips}
            />
            <p className="text-danger">{errors[name]?.message}</p>
        </FloatingLabel>
    );
};

export default FormInput;
