export const generateId = (name = "id") => {
  return name + "-" + Math.random().toString(36).substr(2, 9) + new Date().getTime();
};
