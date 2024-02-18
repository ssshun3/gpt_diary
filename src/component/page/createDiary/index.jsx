import { IconWithButton } from "../../uiParts/iconwWthButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
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
  const backToHome = () => {
    history("/");
  };
  return (
    <Wrapper>
      {isLoading ? (
        <CenteredWrapper>
          <Loader />
          <p>日記を作成中...</p>
        </CenteredWrapper>
      ) : (
        <>
          <BackButton>
            <IconWithButton
              Icon={IoMdArrowRoundBack}
              text="戻る"
              onClick={backToHome}
            />
          </BackButton>
          <h1>タグを選んで日記を作成</h1>
          <DatePickerWrapper className={"ReservationCalendar"}>
            <p>日付を選択</p>
            <StyledDatePicker
              locale="ja"
              selected={selectedDate}
              dateFormatCalendar="yyyy年 MM月"
              dateFormat="yyyy/MM/dd"
              onChange={(date) => setSelectedDate(date)}
            />
          </DatePickerWrapper>
          {tagSelectors.map((selector) => (
            <ContentWrapper key={selector.id}>
              {selector.component}
              <IconWithButton
                Icon={MdCancel}
                text=" エピソードを取消"
                onClick={() => removeTagSelector(selector.id)}
              />
            </ContentWrapper>
          ))}
          <ButtonWrapper>
            <IconWithButton
              Icon={MdNoteAdd}
              text="エピソードを追加する"
              onClick={addTagSelector}
            />
            <IconWithButton
              Icon={IoMdCreate}
              text="日記を作成する"
              onClick={handleSubmitTags}
            />
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;
const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;
`;

const ContentWrapper = styled.div`
  border: 2px solid #1ea7fd;
  border-radius: 8px;
  padding: 10px;
`;

const BackButton = styled.div`
  width: fit-content;
`;
