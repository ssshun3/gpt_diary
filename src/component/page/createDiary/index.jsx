import React, { useState } from "react";
import { TagSelector } from "../../project/tagSelector";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import OpenAI from "openai";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

export const CreateDiary = () => {
  const history = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [tagSelectors, setTagSelectors] = useState([
    {
      id: 0,
      component: (
        <TagSelector
          key={0}
          onTagsChange={(tags) => handleTagsChangeFromChild(0, tags)}
        />
      ),
    },
  ]);

  const addTagSelector = () => {
    const newId = tagSelectors.length;
    const newSelector = {
      id: newId,
      component: (
        <TagSelector
          key={newId}
          onTagsChange={(tags) => handleTagsChangeFromChild(newId, tags)}
        />
      ),
    };
    setTagSelectors((prevSelectors) => [...prevSelectors, newSelector]);
  };

  const removeTagSelector = (id) => {
    setTagSelectors((prevSelectors) =>
      prevSelectors.filter((selector) => selector.id !== id)
    );
  };
  const [selectedTagsFromChildren, setSelectedTagsFromChildren] = useState({});

  const handleTagsChangeFromChild = (childId, tags) => {
    setSelectedTagsFromChildren((prev) => ({
      ...prev,
      [childId]: tags,
    }));
  };

  const handleSubmitTags = async () => {
    setIsLoading(true);
    const promptText = Object.entries(selectedTagsFromChildren)
      .map(([key, value]) => {
        const formattedValue =
          typeof value === "object" && value !== null
            ? Object.entries(value)
                .map(
                  ([subKey, subValue]) =>
                    `${subKey}: ${
                      Array.isArray(subValue) ? subValue.join(", ") : subValue
                    }`
                )
                .join(", ")
            : Array.isArray(value)
            ? value.join(", ")
            : value;
        return `${key}: ${formattedValue}`;
      })
      .join("\n");

    const prompt = `次のキーワードを使用して日記を作成して下さい。複数のエピソードが含まれている可能性がありますが、1日の出来事のため、一つの日記にしてください。返答の制限として返す内容は日記の内容のみです。日付や日記のタイトルは不要です。:\n${promptText}`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const diaryContent = response.choices[0].message.content;

      history("/submit-diary", { state: { diaryContent, selectedDate } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <Loader />
          <p>日記を作成中...</p>
        </>
      ) : (
        <>
          <h1>タグを選んで日記を作成</h1>
          <DatePickerWrapper className={"ReservationCalendar"}>
            <p>日付:</p>
            <div>
              <DatePicker
                locale="ja"
                selected={selectedDate}
                dateFormatCalendar="yyyy年 MM月"
                dateFormat="yyyy/MM/dd"
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
          </DatePickerWrapper>
          {tagSelectors.map((selector) => (
            <div key={selector.id}>
              {selector.component}
              <button onClick={() => removeTagSelector(selector.id)}>
                取消
              </button>
            </div>
          ))}
          <button onClick={addTagSelector}>エピソードを追加</button>
          <button onClick={handleSubmitTags}>タグを提出</button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 40px;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;
