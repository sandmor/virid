import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getAppSession } from "@/lib/auth/session";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { convertToUIMessages } from "@/lib/utils";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await getAppSession();

  if (!session) {
    redirect("/api/auth/guest");
  }

  if (chat.visibility === "private") {
    if (!session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const uiMessages = convertToUIMessages(messagesFromDb);

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");
  const allowedModels = entitlementsByUserType[session.user.type].availableChatModelIds;
  let initialModel =
    chatModelFromCookie && allowedModels.includes(chatModelFromCookie.value)
      ? chatModelFromCookie.value
      : DEFAULT_CHAT_MODEL;
  if (!allowedModels.includes(initialModel)) {
    initialModel = allowedModels[0];
  }

  if (!chatModelFromCookie || !allowedModels.includes(chatModelFromCookie.value)) {
    return (
      <>
        <Chat
          autoResume={true}
          id={chat.id}
          initialChatModel={initialModel}
          initialLastContext={chat.lastContext ?? undefined}
          initialMessages={uiMessages}
          initialVisibilityType={chat.visibility}
          isReadonly={session?.user?.id !== chat.userId}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={true}
        id={chat.id}
  initialChatModel={initialModel}
        initialLastContext={chat.lastContext ?? undefined}
        initialMessages={uiMessages}
        initialVisibilityType={chat.visibility}
        isReadonly={session?.user?.id !== chat.userId}
      />
      <DataStreamHandler />
    </>
  );
}
