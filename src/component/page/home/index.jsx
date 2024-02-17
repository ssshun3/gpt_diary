import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
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
                  diaryContent: diary.content,
                  selectedDate: diary.date,
                },
              })
            }
          >
            編集
          </button>
        </div>
      ))}
      <button onClick={handleCreateDiaryClick}>新規作成</button>
    </div>
  );
};
