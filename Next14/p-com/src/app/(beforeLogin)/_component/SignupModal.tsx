import style from "./signup.module.css";
// import onSubmit from "../_lib/signup";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
// import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

// function showMessage(messasge: string | null | undefined) {
//   if (messasge === "no_id") {
//     return "아이디를 입력하세요.";
//   }
//   if (messasge === "no_name") {
//     return "닉네임을 입력하세요.";
//   }
//   if (messasge === "no_password") {
//     return "비밀번호를 입력하세요.";
//   }
//   if (messasge === "no_image") {
//     return "이미지를 업로드하세요.";
//   }
//   if (messasge === "user_exists") {
//     return "이미 사용 중인 아이디입니다.";
//   }
//   return "";
// }

export default function SignupModal() {
  // name을 인식해서 데이터를 가져옴
  // const [state, formAction] = useFormState(onSubmit, { message: null });
  // const { pending } = useFormStatus();

  const submit = async (formData: FormData) => {
    "use server";
    console.log("씨발");
    if (!formData.get("id")) {
      return "아이디를 입력하세요.";
    }
    if (!formData.get("name")) {
      return "닉네임을 입력하세요.";
    }
    if (!formData.get("password")) {
      return "비밀번호를 입력하세요.";
    }
    if (!formData.get("image")) {
      return "이미지를 업로드하세요.";
    }
    let shouldRedirect = false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_MOCKING}`, {
        method: "post",
        body: formData,
        credentials: "include",
      });
      console.log(response.status);
      if (response.status === 403) {
        return { message: "유저가 존재함" };
      }
      console.log(await response.json());
      shouldRedirect = true;
    } catch (error) {
      console.log(error);
    }
    if (shouldRedirect) {
      redirect("/home"); // redirect는 try catch문 안에서 쓰면 안됨
      return;
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input id="id" name="id" className={style.input} type="text" placeholder="" required />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input id="name" name="name" className={style.input} type="text" placeholder="" required />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input id="password" name="password" className={style.input} type="password" placeholder="" required />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input id="image" name="image" required className={style.input} type="file" accept="image/*" />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                {/* <button type="submit" className={style.actionButton} disabled={pending}> */}
                가입하기
              </button>
              {/* <div className={style.error}>{showMessage(state?.message)}</div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
