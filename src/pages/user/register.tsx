import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Github, Lock, Mail, Send, Tag, User } from "lucide-react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { InputOtp } from "@heroui/input-otp";


export default function UserRegister(
  {
    onLogin
  }: {
    onLogin: () => void;
  }
) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
        注册
      </ModalHeader>
      <ModalBody>
        <Input
          endContent={
            <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="邮箱"
          placeholder="请输入邮箱"
          variant="bordered"
        />
        <div className={"flex flex-row gap-3 items-center"}>
          <InputOtp length={6} variant={"bordered"} />
          <Button className={"flex-auto"} startContent={<Send />}>
            发送验证码
          </Button>
        </div>
        <Input
          endContent={
            <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="用户名"
          placeholder="请输入用户名"
          variant="bordered"
        />
        <Input
          endContent={
            <Tag className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="昵称"
          placeholder="请输入昵称"
          variant="bordered"
        />
        <Input
          endContent={
            <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="密码"
          placeholder="请输入密码"
          type="password"
          variant="bordered"
        />
        <Input
          endContent={
            <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="确认密码"
          placeholder="请再次输入密码"
          type="password"
          variant="bordered"
        />
        <Button color="primary" variant={"shadow"}>
          注册
        </Button>
        <div className={"w-full my-6"}>
          <Divider />
          <Chip className={"absolute -translate-y-1/2 left-1/2 -translate-x-1/2"}>
            其他账号
          </Chip>
        </div>
        <Button startContent={<Github size={20} />} variant={"shadow"}>
          使用 Github 注册并登录
        </Button>
      </ModalBody>
      <ModalFooter>
        <div className={"flex-auto text-center w-full"}>
          我又有账号了! <Link className={"cursor-pointer"} onPress={onLogin}>返回登录喵！</Link>
        </div>
      </ModalFooter>
    </>
  );
}
