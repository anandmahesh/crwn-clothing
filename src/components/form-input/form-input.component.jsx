import { Group, Input, FormInputLabel } from './form-input.style.jsx';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input
                autoComplete={'current-password'}
                {...otherProps}
            />
            {
                label && (
                    <FormInputLabel
                        shrink={otherProps.value.length}>
                        {label}
                    </FormInputLabel>
                )
            }
        </Group>
    );
}

export default FormInput;