import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Braces, Copy, Heart, Send, Share2, ThumbsUp, Zap } from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Textarea } from "@heroui/input";

const ImageContent = () => {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"overflow-visible py-5 flex flex-row justify-center"}>
        {/*<Card className={"w-full"}>*/}
        {/*  <CardBody className={"overflow-hidden flex flex-row justify-center"}>*/}
        <Image
          alt={"123"}
          className={"object-contain max-h-[100dvh]"}
          isBlurred={true}
          src={"/test.png"}
        />
        {/*  </CardBody>*/}
        {/*</Card>*/}
      </div>

      <div className={"flex-1 flex flex-col gap-4 px-5 py-6"}>

        <h1 className={"text-2xl font-bold"}>
          大萤酱AAAAAAAAAAAAAAAAA
        </h1>

        <div className="flex flex-grow gap-4 items-center cursor-pointer">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            name={"xChenNing"}
            size="md"
            src={"https://avatars.githubusercontent.com/u/32773451?v=4"}
          />
          <div className="flex flex-col items-start">
            <p className="text-md font-bold">xChenNing</p>
          </div>

          <div className={"flex-1"} />

          <div className={"flex-none flex flex-row gap-4"}>
            <Button
              startContent={<Heart size={20} />}
            >
              233
            </Button>
            <Button
              startContent={<ThumbsUp size={20} />}
            >
              666
            </Button>
          </div>

        </div>

        <div className={"py-3"}>
          这里是描述
        </div>
      </div>

    </div>
  );
};

const PromptsBox = () => {
  return (
    // <Card>
    <div className={"flex flex-col gap-4 px-2 py-3 w-full"}>
      <Textarea
        label={"正向提示词"}
        labelPlacement={"outside"}
      />
      <Textarea
        label={"反向提示词"}
        labelPlacement={"outside"}
      />

      <Textarea
        label={"模型"}
        labelPlacement={"outside"}
        minRows={1}
      />

      <div className={"flex flex-row gap-3"}>
        <Textarea
          className={"basis-1/2"}
          label={"宽度"}
          labelPlacement={"outside"}
          minRows={1}
        />
        <Textarea
          className={"basis-1/2"}
          label={"高度"}
          labelPlacement={"outside"}
          minRows={1}
        />
      </div>

      <div className={"flex flex-row gap-3 mt-2"}>
        <Textarea
          className={"flex-1"}
          label={"采样方法"}
          labelPlacement={"outside"}
          minRows={1}
        />

        <Textarea
          className={"basis-20 shrink-0"}
          label={"采样步数"}
          labelPlacement={"outside"}
          minRows={1}
        />
      </div>

      <Textarea
        label={"CFG"}
        labelPlacement={"outside"}
        minRows={1}
      />

      <div className={"flex flex-row gap-3 mt-2"}>
        <Button
          className={"flex-1"}
          color={"secondary"}
          size={"lg"}
          startContent={<Braces size={20} />}
          variant={"shadow"}
        >
          查看完整参数
        </Button>
        <Button
          isIconOnly={true}
          size={"lg"}
        >
          <Copy size={20} />
        </Button>
      </div>

    </div>
    // </Card>
  );
};

const Comment = () => {
  return (
    <Card className={"mx-5 my-6"}>
      <CardHeader className={"flex flex-row gap-4 items-start"}>
        <Avatar
          isBordered
          as="button"
          className={"transition-transform  flex-none"}
          name={"xChenNing"}
          size="md"
          src={"https://avatars.githubusercontent.com/u/32773451?v=4"}
        />

        <Textarea
          className={"translate-y-px"}
          minRows={1}
          placeholder={"来发表一下你的意见喵"}
        />

        <Button
          color={"primary"}
          startContent={<Send size={250} />}
          variant={"shadow"}
        >
          发表评论
        </Button>
      </CardHeader>
      <CardBody>
        <div className={"w-full p-5 text-center"}>
          哎喵，这里空荡荡的呢
        </div>
      </CardBody>
    </Card>
  );
};

const ImagesModalViewer = NiceModal.create(function _ImagesModalViewer() {
  const modal = useModal();


  return (
    <Modal
      backdrop={"blur"}
      // closeButton={<></>}
      isOpen={modal.visible}
      placement="center"
      scrollBehavior={"outside"}
      size={"5xl"}
      onOpenChange={() => modal.hide()}
    >
      <ModalContent className={"md:px-3"}>
        {(onClose) => {
          return (
            <div className={"flex flex-col gap-4"}>
              <div className={"flex flex-row flex-wrap gap-4 p-3"}>

                <div className={"flex-1"}>
                  <ImageContent />
                </div>

                <div className={"basis-full md:basis-1/3 flex flex-col gap-4 pt-5"}>

                  <div className={"flex flex-row gap-4 px-2"}>
                    <Button
                      className={"flex-1"}
                      color={"primary"}
                      size={"lg"}
                      startContent={<Zap size={20} />}
                      variant={"shadow"}
                    >
                      做同款
                    </Button>
                    <Button
                      className={"shrink"}
                      isIconOnly={true}
                      size={"lg"}
                    >
                      <Share2 size={20} />
                    </Button>
                  </div>

                  <PromptsBox />

                </div>
              </div>

              <div className={"flex-auto"}>
                <Comment />
              </div>

            </div>
          );
        }}
      </ModalContent>
    </Modal>
  )
    ;
});

export default ImagesModalViewer;
