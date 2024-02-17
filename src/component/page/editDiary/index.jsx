import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const EditDiary = () => {
  const location = useLocation();
  const [diaryContent, setDiaryContent] = useState("");

  useEffect(() => {
    // リダイレクト時に渡された日記の内容を設定
    if (location.state && location.state.diaryContent) {
      setDiaryContent(location.state.diaryContent);
    }
  }, [location]);

  return (
    <div>
      <textarea
        value={diaryContent}
        onChange={(e) => setDiaryContent(e.target.value)}
      />
    </div>
  );
};
