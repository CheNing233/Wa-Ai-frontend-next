export const generateId = (name = "id") => {
  return name + "-" + Math.random().toString(36).substr(2, 9) + new Date().getTime();
};

export const getChineseDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份补零
  const day = date.getDate().toString().padStart(2, "0");          // 日期补零
  const hours = date.getHours().toString().padStart(2, "0");       // 小时补零
  const minutes = date.getMinutes().toString().padStart(2, "0");   // 分钟补零
  const seconds = date.getSeconds().toString().padStart(2, "0");   // 秒补零

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};
