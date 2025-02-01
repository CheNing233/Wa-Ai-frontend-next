import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";

export default function PostsPage(){
  return (
    <div className={"w-full"}>
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
      <div className={"flex flex-row flex-wrap gap-3 py-5"}>
        123
      </div>
    </div>
  )
}
