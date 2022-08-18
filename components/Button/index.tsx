import styled from 'styled-components';

const Button = ({ text, onClick }: Props) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #e4e662;
  color: #000000;
  outline: none;
`;

type Props = {
  onClick: () => void;
  text: string;
};

export default Button;
