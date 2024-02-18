import { IconWithButton } from "../../../uiParts/iconwWthButton";
import { FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import React from "react";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { AuthContainer, AuthInput, AuthForm, WarnMessage } from "../style";

export const Login = () => {
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        history("/");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("そのようなユーザーは存在しません。");
        } else {
          alert(error.message);
        }
      });
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        history("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <AuthContainer>
      <h1>ログイン</h1>
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
          <IconWithButton Icon={CiLogin} text="ログイン" type="submit" />
        </div>
        <IconWithButton
          onClick={handleGoogleLogin}
          Icon={FaGoogle}
          text="Googleでログイン"
        />
        <div>
          <span>初めてご利用の方はこちら</span>
          <Link to="/auth/register">新規登録</Link>
        </div>
      </AuthForm>
    </AuthContainer>
  );
};
