import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthContainer,
  AuthButton,
  AuthInput,
  AuthForm,
  WarnMessage,
} from "../style";

export const Register = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        history.push("/auth/login");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("このメールアドレスはすでに使用されています。");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <AuthInput
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "不適切なメールアドレスです。",
              },
            })}
            type="text"
            placeholder="メールアドレス"
          />
          {errors.email && <WarnMessage>{errors.email.message}</WarnMessage>}
        </div>
        <div>
          <label>Password</label>
          <AuthInput
            type="password"
            {...register("password", {
              required: "パスワードは必須です。",
              minLength: {
                value: 6,
                message: "6文字以上入力してください。",
              },
            })}
            placeholder="password"
          />
          {errors.password && (
            <WarnMessage>{errors.password.message}</WarnMessage>
          )}
        </div>

        <div>
          <AuthButton type="submit">新規登録</AuthButton>
        </div>
        <div>
          <span>既にアカウントをお持ちですか？</span>
          <Link to="/auth/login">ログインページへ</Link>
        </div>
      </AuthForm>
    </AuthContainer>
  );
};