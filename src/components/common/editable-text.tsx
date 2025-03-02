import { Edit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@heroui/react";

interface EditableTextProps {
  text: string;
  onEditEnd: (newText: string) => void;
}

export const EditableText = ({ text, onEditEnd }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  // 同步外部 text 更新到内部 value（仅在非编辑状态时）
  useEffect(() => {
    if (!isEditing) {
      setValue(text);
    }
  }, [text, isEditing]); // [4,5](@ref)

  // 自动聚焦输入框
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmed = value.trim();

    setIsEditing(false);
    setValue(trimmed);
    onEditEnd(trimmed); // [2](@ref)
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(text); // 重置为原始值 [5](@ref)
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full group">
      {/* 文本/输入框区域 */}
      {isEditing ? (
        <Input
          ref={inputRef}
          className="flex-1"
          size={"sm"}
          value={value}
          onBlur={handleSubmit} // 失焦提交 [2,3](@ref)
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(); // Enter 提交 [2,3](@ref)
            } else if (e.key === "Escape") {
              handleCancel(); // ESC 取消 [9](@ref)
            }
          }}
        />
      ) : (
        <span className="flex-1">{value}</span>
      )}

      {/* 编辑/取消按钮 */}
      <Button
        className="flex-shrink-0"
        isIconOnly={true}
        size={"sm"}
        variant={"light"}
        onPress={() => {
          if (isEditing) {
            handleCancel(); // 点击 X 取消编辑 [5](@ref)
          } else {
            setIsEditing(true);
          }
        }}
      >
        {isEditing ? <X size={16} /> : <Edit size={16} />}
      </Button>
    </div>
  );
};
