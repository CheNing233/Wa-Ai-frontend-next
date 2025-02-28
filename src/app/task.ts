import { WaApp } from "@/app/app.tsx";
import { GetTaskByUserParams } from "@/app/api/model/task.ts";
import { TaskDataCls } from "@/app/api/dataclass/task.tsx";

export class WaTask {
  app: WaApp;

  constructor(
    app: WaApp
  ) {
    this.app = app;
  }

  async getTaskByUser(p: GetTaskByUserParams) {
    const r = await this.app.api.getTaskByUser(p);
    const tasks = r.data.list;
    const newTasks: TaskDataCls[] = [];

    tasks.forEach((task) => {
      const taskObj = new TaskDataCls(task);

      taskObj.getImageUrl().finally(); // 获取图片地址

      newTasks.push(new TaskDataCls(task));
    });

    return newTasks;
  }
}
