import { IconWithButton } from "../../uiParts/iconwWthButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiArrowToBottom } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppContext } from "../../../context/AppContext";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

export const SubmitDiary = () => {
  const { userID } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  const [diaryContent, setDiaryContent] = useState("");
  const textareaRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (location.state) {
      setDiaryContent(location.state.diaryContent || "");
      setSelectedDate(new Date(location.state.selectedDate) || new Date());
    }
  }, [location]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}年${month}月${day}日`;
  };
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [diaryContent]);
  const onSubmit = async () => {
    try {
      await addDoc(collection(db, "diaries"), {
        userId: userID,
        date: formatDate(selectedDate),
        content: diaryContent,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const backToHome = () => {
    navigate("/create-diary");
  };
  return (
    <Wrapper>
      <IconWithButton
        Icon={IoMdArrowRoundBack}
        text="戻る"
        onClick={backToHome}
      />
      <h1>日記を書く</h1>
      <ContentWrapper>
        <DatePickerWrapper className={"ReservationCalendar"}>
          <p>日付</p>
          <StyledDatePicker
            locale="ja"
            selected={selectedDate}
            dateFormatCalendar="yyyy年 MM月"
            dateFormat="yyyy/MM/dd"
            onChange={handleDateChange}
          />
        </DatePickerWrapper>
        <StyledTextArea
          ref={textareaRef}
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
        />
        <SubmitButtonWrapper>
          <IconWithButton
            Icon={BiArrowToBottom}
            text="保存する"
            onClick={() => onSubmit()}
          />
        </SubmitButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #ccc;
  resize: none;
  overflow: hidden;
  min-height: 100px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
`;
const StyledDatePicker = styled(DatePicker)`
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  & .react-datepicker__month-container {
    background-color: #f0f0f0;
  }

  & .react-datepicker__header {
    background-color: #007bff;
    color: white;
  }

  & .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0.166rem;
  }

  & .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: #007bff;
    color: white;
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
