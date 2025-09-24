import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { getTierForUserType } from "@/lib/ai/tiers";
import { generateUUID } from "@/lib/utils";
import { getAppSession } from "@/lib/auth/session";

export default async function Page() {
  const session = await getAppSession();

  if (!session) {
    redirect("/api/auth/guest");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const { modelIds: allowedModels } = await getTierForUserType(session.user.type);
  let initialModel = modelIdFromCookie && allowedModels.includes(modelIdFromCookie.value)
    ? modelIdFromCookie.value
    : DEFAULT_CHAT_MODEL;
  if (!allowedModels.includes(initialModel)) {
    initialModel = allowedModels[0];
  }

  if (!modelIdFromCookie || !allowedModels.includes(modelIdFromCookie.value)) {
    return (
      <>
        <Chat
          autoResume={false}
          id={id}
          initialChatModel={initialModel}
          initialMessages={[]}
          initialVisibilityType="private"
          isReadonly={false}
          key={id}
          allowedModelIds={allowedModels}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
  initialChatModel={initialModel}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
        allowedModelIds={allowedModels}
      />
      <DataStreamHandler />
    </>
  );
}
