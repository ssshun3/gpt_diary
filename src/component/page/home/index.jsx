import { IconWithButton } from "../../uiParts/iconwWthButton";
import { CiLogout } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
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
import { ConfirmModal } from "../../uiParts/modal";
import styled from "styled-components";

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
      sorted.sort(
        (a, b) =>
          (b.createdAt?.toDate() || new Date()) -
          (a.createdAt?.toDate() || new Date())
      );
    } else if (sortOption === "date") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date.replace(/年|月/g, "/").replace(/日/, ""));
        const dateB = new Date(b.date.replace(/年|月/g, "/").replace(/日/, ""));
        return dateB - dateA;
      });
    } else if (sortOption === "updated") {
      sorted.sort(
        (a, b) =>
          (b.updatedAt?.toDate() || new Date()) -
          (a.updatedAt?.toDate() || new Date())
      );
    }
    setSortedDiaries(sorted);
  }, [sortOption, diaries]);

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDiaryId, setCurrentDiaryId] = useState(null);
  const handleDeleteClick = (diaryId) => {
    setCurrentDiaryId(diaryId);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = async (diaryId) => {
    try {
      await deleteDoc(doc(db, "diaries", diaryId));
      setIsModalOpen(false);
      setCurrentDiaryId(null);
    } catch (error) {
      console.error("Error deleting diary: ", error);
      setIsModalOpen(false);
      setCurrentDiaryId(null);
    }
  };

  return (
    <Wrapper>
      <UserWrapperWrapper>
        <UserWrapper>
          {user && <p>{user.email}</p>}
          <IconWithButton
            Icon={CiLogout}
            text="ログアウト"
            onClick={handleLogout}
          />
        </UserWrapper>
      </UserWrapperWrapper>
      <h1>日記一覧</h1>
      <HeaderWrapper>
        <StyledSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">作成順</option>
          <option value="date">日付順</option>
          <option value="updated">更新順</option>
        </StyledSelect>{" "}
        <IconWithButton
          Icon={FaBook}
          text="日記を作成する"
          onClick={handleCreateDiaryClick}
        />
      </HeaderWrapper>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        diaryId={currentDiaryId}
      />
      {sortedDiaries.map((diary) => (
        <DiaryWrapper key={diary.id}>
          <DiaryDate>{diary.date}</DiaryDate>
          <DiaryContent>{diary.content}</DiaryContent>
          <ButtonWrapper>
            <IconWithButton
              Icon={CiEdit}
              text="編集する"
              onClick={() =>
                navigate("/edit-diary", {
                  state: {
                    diaryId: diary.id,
                    diaryContent: diary.content,
                    selectedDate: diary.date,
                  },
                })
              }
            />
            <IconWithButton
              Icon={MdDeleteForever}
              text="削除する"
              onClick={() => handleDeleteClick(diary.id)}
            />
          </ButtonWrapper>
        </DiaryWrapper>
      ))}
    </Wrapper>
  );
};

const UserWrapperWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 10px;
  align-items: flex-end;
`;
const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin: 10px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #0052cc;
    box-shadow: 0 0 0 1px #0052cc;
  }
`;

const DiaryWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DiaryDate = styled.p`
  color: #666;
  font-size: 14px;
`;

const DiaryContent = styled.p`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
