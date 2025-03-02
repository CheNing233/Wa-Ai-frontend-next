import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Github, Lock, Mail } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { FormEvent, useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";

import { useUserVM } from "@/viewModels/useUserVM.tsx";
import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { $app } from "@/app/app.tsx";
import { LoginParams } from "@/app/api/model/user.ts";

export default function UserLogin(
  {
    onForgetPassword,
    onRegister
  }: {
    onForgetPassword: () => void;
    onRegister: () => void
  }
) {
  const { userState } = useUserVM();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loginPattern, setLoginPattern] = useState<"userName" | "email">("userName");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setLoginPattern(emailPattern.test(account) ? "email" : "userName");
  }, [account]);

  const validateForm = () => {
    let isValid = true;

    // 验证账号
    if (loginPattern === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(account)) {
        setAccountError("请输入有效的邮箱地址");
        isValid = false;
      }
    } else {
      if (account.trim().length === 0) {
        setAccountError("用户名不能为空");
        isValid = false;
      }
    }

    // 验证密码
    if (password.length < 6) {
      setPasswordError("密码至少需要6位");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 清除之前的错误信息
    setAccountError("");
    setPasswordError("");

    if (!validateForm()) return;

    const formData = new FormData(e.currentTarget);
    const p: LoginParams = {
      password: password,
      rememberMe: formData.get("rememberMe") === "on",
      [loginPattern === "userName" ? "userName" : "email"]: account
    };

    $app.user.login(p).finally();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SpinWrapper cursor="not-allowed" isLoading={userState === "pending"}>
        <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
          登录到 WA
        </ModalHeader>
        <ModalBody>
          <Input
            isRequired
            description={<div>当前使用{loginPattern === "userName" ? "用户名" : "邮箱"}登录</div>}
            endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={accountError}
            isInvalid={!!accountError}
            label="账号"
            name="account"
            placeholder="请输入用户名或邮箱"
            value={account}
            variant="bordered"
            onValueChange={(value) => {
              setAccount(value);
              setAccountError("");
            }}
          />

          <Input
            isRequired
            endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            errorMessage={passwordError}
            isInvalid={!!passwordError}
            label="密码"
            name="password"
            placeholder="请输入密码"
            type="password"
            value={password}
            variant="bordered"
            onValueChange={(value) => {
              setPassword(value);
              setPasswordError("");
            }}
          />

          {/* 其余代码保持不变 */}
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              defaultSelected
              classNames={{ label: "text-small" }}
              name="rememberMe"
            >
              记住我
            </Checkbox>
            <Link className="cursor-pointer" color="primary" size="sm" onPress={onForgetPassword}>
              忘记密码?
            </Link>
          </div>
          <Button color="primary" isLoading={userState === "pending"} type="submit" variant="shadow">
            登录
          </Button>
          <div className="w-full my-6">
            <Divider />
            <Chip className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2">
              其他账号
            </Chip>
          </div>
          <Button startContent={<Github size={20} />} variant="shadow">
            使用 Github 登录
          </Button>
        </ModalBody>
        <ModalFooter>
          <div className="flex-auto text-center w-full">
            没有账号? <Link className="cursor-pointer" onPress={onRegister}>点击此处注册喵！</Link>
          </div>
        </ModalFooter>
      </SpinWrapper>
    </Form>
  );
}
