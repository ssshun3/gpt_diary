import { IconWithButton } from "../../uiParts/iconwWthButton";
import { BiArrowToBottom } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppContext } from "../../../context/AppContext";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

export const EditDiary = () => {
  const { userID } = useAppContext();
  const [diaryId, setDiaryId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [diaryContent, setDiaryContent] = useState("");
  const textareaRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const parseDateString = (dateString) => {
    const datePattern = /(\d{4})年(\d{2})月(\d{2})日/;
    const match = dateString.match(datePattern);

    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);

      return new Date(year, month, day);
    }

    return new Date();
  };

  useEffect(() => {
    if (location.state) {
      setDiaryContent(location.state.diaryContent || "");
      const parsedDate = parseDateString(location.state.selectedDate);
      setSelectedDate(parsedDate);
      setDiaryId(location.state.diaryId || null);
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
    if (!diaryId) {
      console.error("No diaryId provided for update");
      return;
    }

    const diaryRef = doc(db, "diaries", diaryId);

    try {
      await updateDoc(diaryRef, {
        userId: userID,
        date: formatDate(selectedDate),
        content: diaryContent,
        updatedAt: serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const backToHome = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <IconWithButton
        Icon={IoMdArrowRoundBack}
        text="戻る"
        onClick={backToHome}
      />
      <h1>日記を編集</h1>
      <ContentWrapper>
        <DatePickerWrapper>
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
            text="更新する"
            onClick={() => onSubmit()}
          />
        </SubmitButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
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

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
