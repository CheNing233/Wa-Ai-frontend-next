import React, { ReactNode, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { TriangleDashed } from "lucide-react";

const TiltCard = (
  {
    cardSlot,
    cardAspectRatio,
    cardMaxWidth = "100%",
    cardMaxHeight = "100%",
    wrapperSlot
  }: {
    cardSlot?: ReactNode;
    cardAspectRatio?: string;
    cardMaxWidth?: string;
    cardMaxHeight?: string;
    wrapperSlot?: ReactNode;
  }
) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const setTilt = (rotateX: number, rotateY: number) => {
    setTiltStyle({
      transform: `perspective(1000px) translateX(-50%) translateY(-50%) translate3d(0, 0, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };

  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = e.currentTarget;

    // 计算鼠标相对于父元素的坐标
    const x = clientX - e.currentTarget.offsetLeft;
    const y = clientY - e.currentTarget.offsetTop;

    // 计算旋转角度
    const rotateX = -((y / offsetHeight - 0.5) * 5);
    const rotateY = -((x / offsetWidth - 0.5) * -5);

    setTilt(rotateX, rotateY);
  };

  return (
    <div
      className={"w-full h-full relative"}
      onMouseLeave={() => setTilt(0, 0)}
      onMouseMove={handleMouseMove}
    >
      <div className={"absolute left-0 top-0 bottom-0 right-0 overflow-visible"}>
        {wrapperSlot}
      </div>


      <div
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
          "overflow-visible " +
          "max-w-full h-dvh"
        }
        style={{
          maxHeight: cardMaxHeight,
          transition: "transform 0.1s ease-out",
          aspectRatio: cardAspectRatio,
          ...tiltStyle
        }}
      >
        <Card
          className={
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
            "overflow-visible " +
            "max-h-full w-dvw"
          }
          style={{
            maxWidth: cardMaxWidth,
            aspectRatio: cardAspectRatio
          }}
        >
          <CardBody
            className={"flex flex-col items-center justify-center gap-3 overflow-visible"}
          >
            <TriangleDashed size={48} />
            <span className={"font-bold"}>这里空荡荡的喵~</span>
            <div className={"absolute left-0 top-0 bottom-0 right-0 overflow-visible"}>
              {cardSlot}
            </div>
          </CardBody>
        </Card>
      </div>

    </div>
  );
};

export default TiltCard;
