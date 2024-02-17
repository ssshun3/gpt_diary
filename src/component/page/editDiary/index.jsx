import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export const EditDiary = () => {
  const location = useLocation();
  const [diaryContent, setDiaryContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.diaryContent) {
      setDiaryContent(location.state.diaryContent);
    }
  }, [location]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [diaryContent]);
  return (
    <Wrapper>
      <StyledTextArea
        ref={textareaRef}
        value={diaryContent}
        onChange={(e) => setDiaryContent(e.target.value)}
      />
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
