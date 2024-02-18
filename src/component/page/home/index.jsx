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
import { auth, db } from "../../../firebase";
import { useAppContext } from "../../../context/AppContext";

export const Home = () => {
  const { user, userID } = useAppContext();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("default");
  const [sortedDiaries, setSortedDiaries] = useState([]);
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
  useEffect(() => {
    let sorted = [...diaries];
    if (sortOption === "default") {
      sorted.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    } else if (sortOption === "date") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date.replace(/年|月/g, "/").replace(/日/, ""));
        const dateB = new Date(b.date.replace(/年|月/g, "/").replace(/日/, ""));
        return dateB - dateA;
      });
    } else if (sortOption === "updated") {
      sorted.sort((a, b) => b.updatedAt.toDate() - a.updatedAt.toDate());
    }
    setSortedDiaries(sorted);
  }, [sortOption, diaries]);

  const handleDeleteDiary = async (diaryId) => {
    try {
      await deleteDoc(doc(db, "diaries", diaryId));
    } catch (error) {
      console.error("Error deleting diary: ", error);
    }
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  return (
    <div>
      {user && <p>{user.email}</p>}
      <button onClick={handleLogout}>ログアウト</button>
      <h1>日記一覧</h1>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">作成順</option>
        <option value="date">日付順</option>
        <option value="updated">更新順</option>
      </select>
      <button onClick={handleCreateDiaryClick}>日記を作成</button>
      {sortedDiaries.map((diary) => (
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
    </div>
  );
};
