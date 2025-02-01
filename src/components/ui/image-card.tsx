import { Image, ImageProps } from "@heroui/image";
import { Card, CardFooter, CardProps } from "@heroui/card";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Heart, Info, Star } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";

interface ImageCardProps {
  width: number;
  height: number;

  src: string;
  title: string;
  tooltipContent?: string;
  onCardClick?: () => void;

  userNickName: string;
  userAvatarUrl: string;
  userUpdatedAt?: string;
  onFollowUser?: () => void;
  onNavigateToUser?: () => void;

  withRankBar?: boolean;
  likeNum?: number;
  isLiked?: boolean;
  onLikeBtnClick?: () => void;
  favouriteNum?: number;
  isFavourited?: boolean;
  onFavouriteBtnClick?: () => void;

  cardProps?: CardProps;
  imageProps?: ImageProps;
}


export default function ImageCard(
  {
    cardProps,
    imageProps,
    src,
    width,
    height,
    title,
    tooltipContent,
    onCardClick,
    userNickName,
    userAvatarUrl,
    userUpdatedAt,
    onFollowUser,
    onNavigateToUser,
    withRankBar = false,
    likeNum = 0,
    isLiked = false,
    onLikeBtnClick,
    favouriteNum = 0,
    isFavourited = false,
    onFavouriteBtnClick
  }: ImageCardProps
) {
  return (
    <Card
      isPressable={true}
      style={{
        aspectRatio: `${width}/${height}`
      }}
      onPress={onCardClick}
      {...cardProps}
    >
      {/*image*/}
      <Image
        alt={title}
        className={"z-0 w-full h-full object-cover"}
        isZoomed={true}
        removeWrapper={true}
        src={src}
        {...imageProps}
      />

      {/*footer*/}
      <CardFooter
        className="absolute z-10 bg-gradient-to-t from-black/60 to-transparent bottom-0"
      >
        <div className="flex flex-col w-full gap-1">
          {/*user info*/}
          <Dropdown>
            <DropdownTrigger>
              <div className="flex flex-grow gap-2 items-center cursor-pointer">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  name={userNickName}
                  size="sm"
                  src={userAvatarUrl}
                />
                <div className="flex flex-col items-start">
                  <p className="text-tiny text-white">{userNickName}</p>
                  <p className="text-tiny text-white">{userUpdatedAt}</p>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="user-follow"
                onPress={onFollowUser}
              >
                关注
              </DropdownItem>
              <DropdownItem
                key="navigate-to-user"
                onPress={onNavigateToUser}
              >
                查看主页
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/*title*/}
          <div
            className={"flex flex-row items-center"}
          >
            <h2
              aria-label={title}
              className={"font-semibold text-medium text-white w-full truncate text-start"}
              title={title}
            >
              {title}
            </h2>
            <Tooltip
              content={(
                <div className="px-1 py-2">
                  <div className="text-small font-bold max-w-xs break-words">{title}</div>
                  <div className={"w-full"}>
                    {tooltipContent}
                  </div>
                </div>
              )}
              showArrow={true}
            >
              <Button
                className={"text-white"}
                isIconOnly={true}
                size={"sm"}
                variant={"light"}
              >
                <Info size={18} />
              </Button>
            </Tooltip>
          </div>

          {/*rank bar*/}
          {withRankBar && <div className={"flex flex-row flex-nowrap gap-2 justify-start"}>
            <Tooltip
              content={"喜欢"}
              showArrow={true}
            >
              <Chip
                className={"select-none cursor-pointer opacity-75"}
                color={isLiked ? "danger" : "default"}
                size={"sm"}
                startContent={<Heart className={"ml-1 mr-0.5"} size={10} />}
                variant={isLiked ? "shadow" : "solid"}
                onClick={onLikeBtnClick}
              >
                {likeNum}
              </Chip>
            </Tooltip>

            <Tooltip
              content={"收藏"}
              showArrow={true}
            >
              <Chip
                className={"select-none cursor-pointer opacity-75"}
                color={isFavourited ? "warning" : "default"}
                size={"sm"}
                startContent={<Star className={"ml-1 mr-0.5"} size={10} />}
                variant={isFavourited ? "shadow" : "solid"}
                onClick={onFavouriteBtnClick}
              >
                {favouriteNum}
              </Chip>
            </Tooltip>
          </div>}

        </div>
      </CardFooter>
    </Card>
  );
}
