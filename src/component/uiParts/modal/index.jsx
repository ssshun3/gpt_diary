import styled from "styled-components";

export const ConfirmModal = ({ isOpen, onClose, onConfirm, diaryId }) => {
  if (!isOpen) return null;

  return (
    <Wrapper>
      <Modal>
        <Text>この日記を削除してもよろしいですか？</Text>
        <ButtonWrapper>
          <NoButton onClick={onClose}>いいえ</NoButton>
          <YesButton
            onClick={() => {
              onConfirm(diaryId);
              onClose();
            }}
          >
            はい
          </YesButton>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  display: flex;
  width: 520px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p`
  color: var(--black_NightRider, #333);
  text-align: center;
  font-family: "Noto Sans JP";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28.8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  padding: 8px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 50px;
  background: gray;
  color: var(--white, #fff);
  text-align: center;
  font-family: "Noto Sans JP";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

const YesButton = styled(Button)`
  background: #008046;
  &:hover {
    background-color: #00a057;
  }
`;

const NoButton = styled(Button)`
  background: #9e1818b5;
  &:hover {
    background-color: #c92121;
  }
`;
