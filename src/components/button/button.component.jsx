
import './button.styles.scss';

const BUTTON_TYPE_CLASSE = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...buttonOptions }) => {

    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSE[buttonType]}`} {...buttonOptions}>
            {children}
        </button>
    )

}

export default Button;