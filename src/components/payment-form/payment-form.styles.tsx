import styled from 'styled-components';
import { BaseButton } from '../button/button.styles';

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;
`

export const PaymentButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    margin-top: 30px;
`