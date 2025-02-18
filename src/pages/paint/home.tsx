import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Volume2, Wand } from "lucide-react";
import { Kbd } from "@heroui/kbd";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";

import { title } from "@/components/utils/primitives.ts";
import ImageCard from "@/components/ui/image-card.tsx";
import Container from "@/components/ui/container.tsx";
import FlexCol from "@/components/ui/flex-col.tsx";

const Banner = () => (
  <div className={"w-full py-2"}>
    <h1
      className={"text-4xl font-bold"}
    >
      欢迎来到 <span className={`${title({ color: "violet", size: "default" })}`}>WA</span> ，今天想画点什么？
    </h1>
    <p className={"mt-6"}>
      这里是 WA，一个复合 AI 生成平台，我们在这里提供各种免费的 AIGC 服务。现在输入一些英文提示词，立即尝试一下喵！
    </p>
    <div
      className={"mt-5 flex flex-row flex-wrap items-center gap-4"}
    >
      <Input
        className={"flex-1 -translate-x-px"}
        size={"lg"}
        startContent={(
          <Tooltip content={"默认SD模型只支持英文提示喵"}>
            <Kbd>SD+En</Kbd>
          </Tooltip>
        )}
        value={"1girl, white shirt, black miniskirt, medium breasts, bare thighs"}
        variant={"bordered"}
      />
      <Button
        className={"flex-shrink -translate-y-px"}
        color={"primary"}
        size={"lg"}
        startContent={<span className={"text-2xl"}><Wand /></span>}
        variant={"shadow"}
      >
        立即生成
      </Button>
    </div>
    <Card
      className={"mt-4 h-8 w-full flex flex-row items-center cursor-pointer"}
      isPressable={true}
    >
      <CardBody>
        <p>
          <Volume2 className={"inline mr-2"} size={16} />
          公告：本站正在维护喵，请3月1号再来
        </p>
      </CardBody>
    </Card>
  </div>
);


const ICard = () => {

  const [isLiked, setIsLiked] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);

  return (
    <div
      style={{
        aspectRatio: "3/4"
        // flex: "1 1 calc(25% - 12px * 3 / 4)"
      }}
    >
      <ImageCard
        favouriteNum={isFavourited ? 1 : 0}
        height={4}
        isFavourited={isFavourited}
        isLiked={isLiked}
        likeNum={isLiked ? 1 : 0}
        src={"/test.png"}
        title={"大萤酱AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
        userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
        userNickName={"xChenNing"}
        width={3}
        withRankBar={true}
        onFavouriteBtnClick={() => setIsFavourited(!isFavourited)}
        onLikeBtnClick={() => setIsLiked(!isLiked)}
      />
    </div>
  );
};

export default function PaintHome() {
  return (
    <Container>
      <Banner />
      <Divider className={"opacity-50"} />
      <div className={"w-full py-2"}>
        <div className={"flex flex-row flex-nowrap"}>
          <h2 className={"text-2xl flex-1"}>
            最新帖子
          </h2>
          <Button
            endContent={<span className={"text-sm"}><ArrowRight /></span>}
            variant={"light"}
          >
            查看更多
          </Button>
        </div>
        <p className={"opacity-50"}>
          来看看魔法师们今天的创作吧！
        </p>

        <FlexCol
          className={"mt-4"}
          cols={{
            xs: 2,
            sm: 3,
            lg: 4,
            xl: 4,
            xxl: 5
          }}
          gapX={1}
          gapY={1}
        >
          <ICard />
          <ICard />
          <ICard />
          <ICard />
          <ICard />
          <ICard />
          <ICard />
          <ICard />
        </FlexCol>
      </div>
    </Container>
  );
}
