interface filterItem {
  key: string;
  label: string;
}

export interface filterSection {
  sectionTitle: string;
  items: filterItem[];
}

export const modelsFilter: filterSection[] = [
  {
    sectionTitle: "模型类型", items: [
      {
        key: "checkpoint",
        label: "Checkpoint"
      },
      {
        key: "vae",
        label: "VAE"
      },
      {
        key: "controlnet",
        label: "ControlNet"
      },
      {
        key: "lora",
        label: "LoRA"
      },
      {
        key: "ly-kr",
        label: "LyCORIS"
      },
      {
        key: "embedding",
        label: "Embedding"
      },
      {
        key: "hypernetwork",
        label: "Hypernetwork"
      }
    ]
  },
  {
    sectionTitle: "基底模型", items: [
      {
        key: "sd-1-5",
        label: "SD1.5"
      },
      {
        key: "sd-xl",
        label: "SDXL"
      },
      {
        key: "pony",
        label: "Pony"
      },
      {
        key: "il",
        label: "Illustrious"
      },
      {
        key: "flux-1-schnell",
        label: "Flux.1 Schnell"
      },
      {
        key: "flux-1-dev",
        label: "Flux.1 Dev"
      },
      {
        key: "noob",
        label: "Noob"
      }
    ]
  }
];
