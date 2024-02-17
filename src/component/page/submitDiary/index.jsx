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
  return (
    <Wrapper>
      <p>日付:</p>
      <div>
        <DatePicker
          locale="ja"
          selected={selectedDate}
          dateFormatCalendar="yyyy年 MM月"
          dateFormat="yyyy/MM/dd"
          onChange={handleDateChange}
        />
      </div>
      <StyledTextArea
        ref={textareaRef}
        value={diaryContent}
        onChange={(e) => setDiaryContent(e.target.value)}
      />
      <button onClick={() => onSubmit()}>保存</button>
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
`;

const Wrapper = styled.div`
  padding: 20px 60px;
`;
