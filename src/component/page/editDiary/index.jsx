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
  useEffect(() => {
    if (location.state) {
      setDiaryContent(location.state.diaryContent || "");
      setSelectedDate(new Date(location.state.selectedDate) || new Date());
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

    const diaryRef = doc(db, "diaries", diaryId); // diaryId を使用してドキュメントの参照を取得

    try {
      await updateDoc(diaryRef, {
        userId: userID,
        date: formatDate(selectedDate),
        content: diaryContent,
        updatedAt: serverTimestamp(), // 更新日時
      });
      navigate("/"); // 更新後はホームページに戻る
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Wrapper>
      <h1>日記を編集</h1>
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
      <button onClick={() => onSubmit()}>更新</button>
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
