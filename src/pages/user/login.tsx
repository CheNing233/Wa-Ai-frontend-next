import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Github, Lock, Mail } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";


export default function UserLogin(
  {
    onForgetPassword,
    onRegister
  }: {
    onForgetPassword: () => void;
    onRegister: () => void;
  }
) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1 text-3xl text-center my-3">
        登录到 WA
      </ModalHeader>
      <ModalBody>
        <Input
          endContent={
            <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="账号"
          placeholder="请输入用户名或邮箱"
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
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small"
            }}
          >
            记住我
          </Checkbox>
          <Link className={"cursor-pointer"} color="primary" size={"sm"} onPress={onForgetPassword}>
            忘记密码?
          </Link>
        </div>
        <Button color="primary" variant={"shadow"}>
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
    </>
  );
}
