import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Lock, Mail, Send } from "lucide-react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";


export default function UserForgetPassword(
  {
    onLogin
  }: {
    onLogin: () => void;
  }
) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
        重置密码
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
          重置密码
        </Button>
      </ModalBody>
      <ModalFooter>
        <div className={"flex-auto text-center w-full"}>
          我又想起来了! <Link className={"cursor-pointer"} onPress={onLogin}>返回登录喵！</Link>
        </div>
      </ModalFooter>
    </>
  );
}
