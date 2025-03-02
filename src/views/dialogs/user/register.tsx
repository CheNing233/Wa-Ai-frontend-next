import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Github, Hourglass, Lock, Mail, Send, Tag, User } from "lucide-react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { InputOtp } from "@heroui/input-otp";
import { Form } from "@heroui/form";
import { FormEvent, useState } from "react";

import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { useUserVM } from "@/viewModels/useUserVM.tsx";
import { $app } from "@/app/app.tsx";
import { RegisterParams } from "@/app/api/model/user.ts";

export default function UserRegister({ onLogin }: { onLogin: () => void }) {
  const { userState, sendEmailCode, sendEmailCodeCoolingTime } = useUserVM();

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    userName: "",
    password: "",
    rePassword: "",
    emailCode: ""
  });

  // 验证规则
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userNamePattern = /^[a-zA-Z0-9]+$/;

  const validateForm = () => {
    const newErrors = {
      email: "",
      userName: "",
      password: "",
      rePassword: "",
      emailCode: ""
    };

    // 邮箱验证
    if (!emailPattern.test(email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    // 验证码验证
    if (emailCode.length !== 6) {
      newErrors.emailCode = "请输入6位验证码";
    }

    // 用户名验证
    if (!userNamePattern.test(userName)) {
      newErrors.userName = "只能包含字母和数字";
    } else if (userName.length < 3) {
      newErrors.userName = "用户名至少需要3个字符";
    }

    // 密码验证
    if (password.length < 6) {
      newErrors.password = "密码至少需要6位";
    }

    // 重复密码验证
    if (password !== rePassword) {
      newErrors.rePassword = "两次输入的密码不一致";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(e.currentTarget);
    const p: RegisterParams = {
      email: formData.get("email") as string,
      emailCode: formData.get("emailCode") as string,
      userName: formData.get("userName") as string,
      nickName: formData.get("nickName") as string,
      password: formData.get("password") as string,
      rePassword: formData.get("rePassword") as string
    };

    $app.user.register(p).then((success) => {
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
      type: "register"
    }).finally();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SpinWrapper cursor="not-allowed" isLoading={userState === "pending"}>
        <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
          注册
        </ModalHeader>
        <ModalBody>
          <Input
            isRequired
            endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.email}
            isInvalid={!!errors.email}
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
              isRequired
              errorMessage={errors.emailCode}
              isInvalid={!!errors.emailCode}
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
            isRequired
            endContent={<User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.userName}
            isInvalid={!!errors.userName}
            label="用户名"
            name="userName"
            placeholder="请输入用户名"
            variant="bordered"
            onValueChange={(value) => {
              setUserName(value);
              setErrors(prev => ({ ...prev, userName: "" }));
            }}
          />

          <Input
            isRequired
            endContent={<Tag className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            label="昵称"
            name="nickName"
            placeholder="请输入昵称"
            variant="bordered"
          />

          <Input
            isRequired
            endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.password}
            isInvalid={!!errors.password}
            label="密码"
            name="password"
            placeholder="请输入密码"
            type="password"
            variant="bordered"
            onValueChange={(value) => {
              setPassword(value);
              setErrors(prev => ({ ...prev, password: "" }));
            }}
          />

          <Input
            isRequired
            endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={errors.rePassword}
            isInvalid={!!errors.rePassword}
            label="确认密码"
            name="rePassword"
            placeholder="请再次输入密码"
            type="password"
            variant="bordered"
            onValueChange={(value) => {
              setRePassword(value);
              setErrors(prev => ({ ...prev, rePassword: "" }));
            }}
          />

          <Button color="primary" type="submit" variant="shadow">
            注册
          </Button>

          {/* 其余代码保持不变 */}
          <div className="w-full my-6">
            <Divider />
            <Chip className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2">
              其他账号
            </Chip>
          </div>
          <Button startContent={<Github size={20} />} variant="shadow">
            使用 Github 注册并登录
          </Button>
        </ModalBody>
        <ModalFooter>
          <div className="flex-auto text-center w-full">
            我又有账号了! <Link className="cursor-pointer" onPress={onLogin}>返回登录喵！</Link>
          </div>
        </ModalFooter>
      </SpinWrapper>
    </Form>
  );
}
