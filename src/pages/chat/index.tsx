import { title } from "@/components/utils/primitives.ts";

export default function ChatPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Chat</h1>
      </div>
    </section>
  );
}
