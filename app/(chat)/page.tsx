import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL, isModelIdAllowed } from "@/lib/ai/models";
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
  const cookieCandidate = modelIdFromCookie ? modelIdFromCookie.value : undefined;
  let initialModel = cookieCandidate && isModelIdAllowed(cookieCandidate, allowedModels)
    ? cookieCandidate
    : DEFAULT_CHAT_MODEL;
  if (!isModelIdAllowed(initialModel, allowedModels)) {
    initialModel = allowedModels[0];
  }

  if (!modelIdFromCookie || !isModelIdAllowed(modelIdFromCookie.value, allowedModels)) {
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
