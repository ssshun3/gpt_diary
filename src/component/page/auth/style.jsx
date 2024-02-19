import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(248, 249, 250);
  height: 100vh;
`;

export const AuthButton = styled.button`
  cursor: pointer;
  font-weight: 700;
  background-color: rgb(0, 165, 89);
  border-radius: 50px;
  color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.098) 0px 4px 5px;
  font-size: 14px;
  line-height: 25px;
  padding: 8px 20px;
  border: none;
`;

export const AuthInput = styled.input`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  height: 34px;
  background: rgb(248, 249, 250);
  border-radius: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
`;

export const WarnMessage = styled.span`
  color: rgb(255, 80, 81);
  font-size: 14px;
  line-height: 25px;
`;

export const PrivacyPolicyLink = styled.div`
  color: gray;
  text-decoration: underline;
`;

export const PrivacyPolicyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
