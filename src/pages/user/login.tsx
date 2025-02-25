import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Github, Lock, Mail } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { useUserVM } from "@/controller/useUserVM.tsx";
import { FormEvent, useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { app } from "@/app/app.tsx";
import { LoginParams } from "@/app/api/model/user.ts";


export default function UserLogin(
  {
    onForgetPassword,
    onRegister
  }: {
    onForgetPassword: () => void;
    onRegister: () => void;
  }
) {
  const { userState } = useUserVM();

  const [account, setAccount] = useState<string>("");
  const [loginPattern, setLoginPattern] = useState<"userName" | "email">("userName");

  useEffect(() => {
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(account)) {
      setLoginPattern("email");
    } else {
      setLoginPattern("userName");
    }

    console.log(account, loginPattern);
  }, [account]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let p: LoginParams = {
      password: formData.get("password") as string,
      rememberMe: formData.get("rememberMe") as string === "on"
    };

    if (loginPattern === "userName") {
      p["userName"] = account;
    } else {
      p["email"] = account;
    }

    app.user.login(p).finally();
  };

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <SpinWrapper
        cursor={"not-allowed"}
        isLoading={userState === "pending"}
      >
        <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
          登录到 WA
        </ModalHeader>
        <ModalBody>
          <Input
            description={<div>当前使用{loginPattern === "userName" ? "用户名" : "邮箱"}登录</div>}
            endContent={
              <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired={true}
            label="账号"
            name={"account"}
            placeholder="请输入用户名或邮箱"
            value={account}
            variant="bordered"
            onValueChange={setAccount}
          />
          <Input
            endContent={
              <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired={true}
            label="密码"
            name={"password"}
            placeholder="请输入密码"
            type="password"
            variant="bordered"
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small"
              }}
              defaultValue={"on"}
              name={"rememberMe"}
            >
              记住我
            </Checkbox>
            <Link className={"cursor-pointer"} color="primary" size={"sm"} onPress={onForgetPassword}>
              忘记密码?
            </Link>
          </div>
          <Button color="primary" type={"submit"} variant={"shadow"}>
            登录
          </Button>
          <div className={"w-full my-6"}>
            <Divider />
            <Chip className={"absolute -translate-y-1/2 left-1/2 -translate-x-1/2"}>
              其他账号
            </Chip>
          </div>
          <Button startContent={<Github size={20} />} variant={"shadow"}>
            使用 Github 登录
          </Button>

        </ModalBody>
        <ModalFooter>
          <div className={"flex-auto text-center w-full"}>
            没有账号? <Link className={"cursor-pointer"} onPress={onRegister}>点击此处注册喵！</Link>
          </div>
        </ModalFooter>
      </SpinWrapper>
    </Form>
  );
}
