import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Hourglass, Lock, Mail, Send } from "lucide-react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { Form } from "@heroui/form";
import { FormEvent, useState } from "react";

import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { useUserVM } from "@/controller/useUserVM.tsx";
import { ResetPasswordParams } from "@/app/api/model/user.ts";
import { app } from "@/app/app.tsx";

export default function UserForgetPassword({ onLogin }: { onLogin: () => void }) {
  const { userState, sendEmailCode, sendEmailCodeCoolingTime } = useUserVM();

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    emailCode: "",
    password: "",
    rePassword: ""
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {
      email: "",
      emailCode: "",
      password: "",
      rePassword: ""
    };

    // 邮箱验证
    if (!email) {
      newErrors.email = "邮箱不能为空";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    // 验证码验证
    if (emailCode.length !== 6) {
      newErrors.emailCode = "请输入6位验证码";
    }

    // 密码验证
    if (!password) {
      newErrors.password = "密码不能为空";
    } else if (password.length < 6) {
      newErrors.password = "密码至少需要6位";
    }

    // 确认密码验证
    if (!rePassword) {
      newErrors.rePassword = "请确认密码";
    } else if (password !== rePassword) {
      newErrors.rePassword = "两次输入的密码不一致";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const p: ResetPasswordParams = {
      email: email,
      emailCode: emailCode,
      password: password,
      rePassword: rePassword
    };

    app.user.resetPassword(p).then((success) => {
      if (success) {
        onLogin(); // 返回登录页面
      }
    });
  };

  const handleSendEmailCode = () => {
    if (!emailPattern.test(email)) {
      setErrors(prev => ({ ...prev, email: "请输入有效的邮箱地址" }));

      return;
    }

    sendEmailCode({
      email: email,
      type: "forgetPassword"
    }).finally();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SpinWrapper cursor="not-allowed" isLoading={userState === "pending"}>
        <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
          重置密码
        </ModalHeader>
        <ModalBody>
          <Input
            endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.email}
            isInvalid={!!errors.email}
            isRequired={true}
            label="邮箱"
            name="email"
            placeholder="请输入邮箱"
            type="email"
            value={email}
            variant="bordered"
            onValueChange={(value) => {
              setEmail(value);
              setErrors(prev => ({ ...prev, email: "" }));
            }}
          />

          <div className="flex flex-row gap-3 items-center">
            <InputOtp
              errorMessage={errors.emailCode}
              isInvalid={!!errors.emailCode}
              isRequired={true}
              length={6}
              name="emailCode"
              value={emailCode}
              variant="bordered"
              onValueChange={(value) => {
                setEmailCode(value);
                setErrors(prev => ({ ...prev, emailCode: "" }));
              }}
            />
            <Button
              className="flex-auto"
              isDisabled={sendEmailCodeCoolingTime !== 0}
              startContent={sendEmailCodeCoolingTime !== 0 ? <Hourglass size={20} /> : <Send size={20} />}
              onPress={handleSendEmailCode}
            >
              {sendEmailCodeCoolingTime !== 0 ? `${sendEmailCodeCoolingTime}s` : "发送验证码"}
            </Button>
          </div>

          <Input
            endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.password}
            isInvalid={!!errors.password}
            isRequired={true}
            label="密码"
            name="password"
            placeholder="请输入密码"
            type="password"
            value={password}
            variant="bordered"
            onValueChange={(value) => {
              setPassword(value);
              setErrors(prev => ({ ...prev, password: "" }));
            }}
          />

          <Input
            endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.rePassword}
            isInvalid={!!errors.rePassword}
            isRequired={true}
            label="确认密码"
            name="rePassword"
            placeholder="请再次输入密码"
            type="password"
            value={rePassword}
            variant="bordered"
            onValueChange={(value) => {
              setRePassword(value);
              setErrors(prev => ({ ...prev, rePassword: "" }));
            }}
          />

          <Button color="primary" type="submit" variant="shadow">
            重置密码
          </Button>
        </ModalBody>
        <ModalFooter>
          <div className="flex-auto text-center w-full">
            我又想起来了! <Link className="cursor-pointer" onPress={onLogin}>返回登录喵！</Link>
          </div>
        </ModalFooter>
      </SpinWrapper>
    </Form>
  );
}
