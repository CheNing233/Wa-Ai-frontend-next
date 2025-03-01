import { WaApp } from "@/app/app.tsx";
import { GetStaticImageUrlByIdParams } from "@/app/api/model/static-image.ts";
import { AbortableParams } from "@/app/api/model/base.ts";

export class WaStaticImage {
  app: WaApp;

  constructor(
    app: WaApp
  ) {
    this.app = app;
  }

  /**
   * 根据ID获取静态图片URL
   *
   * 此函数调用API接口以获取与给定ID关联的静态图片的URL它主要用于需要获取图片展示或下载链接的场景
   * 当接口调用成功并且返回成功标志为true时，函数会返回图片的URL字符串如果失败，返回空字符串
   *
   * @param p 包含所需静态图片ID的参数对象
   * @returns 返回一个Promise，解析为图片的URL字符串或空字符串
   */
  async getStaticImageUrlById(p: GetStaticImageUrlByIdParams & AbortableParams) {
    // 调用API的getStaticImageUrlById方法，并仅获取结果数组的第一个元素
    const [r] = await this.app.api.getStaticImageUrlById(p);

    // 如果API调用成功，则返回图片的URL
    if (r.success) {
      return r.data;
    }

    // 如果API调用失败，则返回空字符串
    return null;
  }

  getImageDimensions(image: string | Blob): Promise<{
    width: number;
    height: number;
  }> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        URL.revokeObjectURL(img.src); // 释放内存
      };
      img.onerror = reject;

      // 载入分析
      img.src = typeof image === "string" ? image : URL.createObjectURL(image);
    });
  }

  downloadImage(url: string, filename: string): void {
    const link = document.createElement('a');

    link.href = url;
    link.download = filename; // 设置下载文件名
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
