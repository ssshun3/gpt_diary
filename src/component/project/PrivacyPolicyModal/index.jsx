import { MdCancel } from "react-icons/md";
import React from "react";
import styled from "styled-components";

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <MdCancel size={30} onClick={onClose} />
        </CloseButton>
        <h1>プライバシーポリシー</h1>
        <Paragraph>
          「TagDiary」（以下、「当アプリ」とします）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーでは、当アプリが収集する情報とその使用方法について説明します。
        </Paragraph>

        <SectionTitle>1. 収集する情報と目的</SectionTitle>
        <Paragraph>
          当アプリでは、以下の目的で必要最小限の個人情報を収集します。
        </Paragraph>
        <List>
          <ListItem>
            メールアドレス: アカウント作成およびユーザーサポートのため。
          </ListItem>
          <ListItem>
            日記の内容: 当アプリの主要機能である日記作成のため。
          </ListItem>
          <ListItem>
            タグの選択情報: ユーザーが選択したタグに基づき、OpenAI
            APIを通じて日記を自動生成するため。
          </ListItem>
        </List>
        <Paragraph>
          これらの情報は、アプリの機能提供とユーザーサポートの目的でのみ使用されます。
        </Paragraph>

        <SectionTitle>2. 情報の共有</SectionTitle>
        <Paragraph>
          当アプリは、以下の場合を除き、ユーザーの個人情報を第三者と共有または公開しません。
        </Paragraph>
        <List>
          <ListItem>ユーザーの同意がある場合</ListItem>
          <ListItem>法的義務に基づき情報開示が求められた場合</ListItem>
        </List>

        <SectionTitle>3. データの保護</SectionTitle>
        <Paragraph>
          当アプリのセキュリティはFirebaseによって提供されており、ユーザーのデータ保護に最大限の注意を払っています。
        </Paragraph>

        <SectionTitle>4. プライバシーポリシーの変更</SectionTitle>
        <Paragraph>
          当アプリは、必要に応じて本プライバシーポリシーを更新することがあります。本ポリシーに重大な変更がある場合は、アプリ内を通じて通知します。
        </Paragraph>

        <SectionTitle>5. お問い合わせ</SectionTitle>
        <Paragraph>
          当アプリのプライバシーポリシーに関するご質問やご懸念がございましたら、
          <Link href="mailto:precipitous.div@gmail.com">
            precipitous.div@gmail.com
          </Link>
          までお問い合わせください。
        </Paragraph>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  width: 520px;
  max-height: 80%;
  overflow-y: auto;
`;

const CloseButton = styled.div`
  float: right;
  cursor: pointer;
  background: none;
  border: none;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-top: 20px;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
`;

const List = styled.ul`
  list-style: inside;
  margin-top: 10px;
`;

const ListItem = styled.li`
  color: #666;
  line-height: 1.6;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
