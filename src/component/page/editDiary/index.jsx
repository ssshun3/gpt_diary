import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppContext } from "../../../context/AppContext";

export const EditDiary = () => {
  const { userID } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  const [diaryContent, setDiaryContent] = useState("");
  const textareaRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (location.state) {
      if (location.state.diaryContent) {
        setDiaryContent(location.state.diaryContent);
      }
      if (location.state.selectedDate) {
        setSelectedDate(new Date(location.state.selectedDate));
      }
    }
  }, [location]);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
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
      <p>日付: {formatDate(selectedDate)}</p>
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
