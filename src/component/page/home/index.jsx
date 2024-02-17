import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { useAppContext } from "../../../context/AppContext";

export const Home = () => {
  const { user, userID } = useAppContext();
  const navigate = useNavigate();

  const handleCreateDiaryClick = () => {
    navigate("/create-diary");
  };
  const [diaries, setDiaries] = useState([]);
  useEffect(() => {
    if (user) {
      const fetchDiaries = async () => {
        const diariesRef = collection(db, "diaries");
        const q = query(
          diariesRef,
          where("userId", "==", userID),
          orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const diaries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          }));
          setDiaries(diaries);
        });
        return () => unsubscribe();
      };
      fetchDiaries();
    }
  }, [userID]);
  const handleDeleteDiary = async (diaryId) => {
    try {
      await deleteDoc(doc(db, "diaries", diaryId));
      console.log("Diary deleted successfully");
    } catch (error) {
      console.error("Error deleting diary: ", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>{diary.date}</p>
          <p>{diary.content}</p>
          <button
            onClick={() =>
              navigate("/edit-diary", {
                state: {
                  diaryId: diary.id,
                  diaryContent: diary.content,
                  selectedDate: diary.date,
                },
              })
            }
          >
            編集
          </button>
          <button onClick={() => handleDeleteDiary(diary.id)}>削除</button>
        </div>
      ))}

      <button onClick={handleCreateDiaryClick}>新規作成</button>
    </div>
  );
};
