'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Search, X } from 'lucide-react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import type { Chat } from '@/lib/db/schema';
import { cn } from '@/lib/utils';
import { ChatItem } from './sidebar-history-item';

type SearchResults = {
  chats: Chat[];
  total: number;
};

const COMPACT_LIMIT = 8;
const PAGE_SIZE = 20;

async function fetchChatSearch(
  query: string,
  limit: number,
  offset = 0
): Promise<SearchResults & { nextOffset: number | null }> {
  if (!query)
    return {
      chats: [],
      total: 0,
      nextOffset: null,
    };

  const res = await fetch(
    `/api/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error('Failed to search chats');
  }

  const data: SearchResults = await res.json();

  return {
    ...data,
    nextOffset:
      data.chats.length < limit || data.total <= offset + data.chats.length
        ? null
        : offset + data.chats.length,
  };
}

export function ChatSearch({
  currentChatId,
  onDelete,
}: {
  currentChatId?: string;
  onDelete: (chatId: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setOpenMobile } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounce search input
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery) {
      setIsDialogOpen(false);
    }
  }, [debouncedQuery]);

  const {
    data: fullResults,
    isLoading,
    isFetching,
    isError,
  } = useQuery<SearchResults>({
    queryKey: ['chat', 'search', debouncedQuery, 'compact'],
    queryFn: async () => {
      const response = await fetchChatSearch(debouncedQuery, COMPACT_LIMIT);
      return {
        chats: response.chats,
        total: response.total,
      };
    },
    enabled: debouncedQuery.length > 0,
    staleTime: 30_000,
  });

  const {
    data: dialogPages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError: isInfiniteError,
    isLoading: isInfiniteLoading,
    isRefetching,
  } = useInfiniteQuery<SearchResults & { nextOffset: number | null }>({
    queryKey: ['chat', 'search', debouncedQuery, 'infinite'],
    queryFn: async ({ pageParam = 0 }) =>
      fetchChatSearch(
        debouncedQuery,
        PAGE_SIZE,
        typeof pageParam === 'number' ? pageParam : 0
      ),
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.nextOffset !== null
        ? lastPage.nextOffset
        : undefined,
    enabled: isDialogOpen && debouncedQuery.length > 0,
    staleTime: 30_000,
    initialPageParam: 0,
  });

  const dialogResults = dialogPages?.pages ?? [];
  const dialogChats = dialogResults.flatMap((page) => page?.chats ?? []);
  const dialogTotal =
    dialogResults.length > 0 ? (dialogResults[0]?.total ?? 0) : 0;
  const isDialogLoading = isDialogOpen && isInfiniteLoading;
  const isDialogFetching = isDialogOpen && (isFetchingNextPage || isRefetching);
  const isDialogError = isDialogOpen && (isInfiniteError || isError);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  }, []);

  const showResults = debouncedQuery.length > 0;
  const compactResults = fullResults?.chats ?? [];
  const hasResults = compactResults.length > 0;
  const totalResults = fullResults?.total ?? 0;
  const showViewAll = hasResults && totalResults > compactResults.length;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="flex flex-col gap-3 px-2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <Search
              className="absolute top-2.5 left-2 text-muted-foreground"
              size={16}
            />
            <Input
              className="h-9 w-full pl-8 pr-8"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              ref={inputRef}
              type="text"
              value={searchQuery}
            />
            {searchQuery && (
              <Button
                className="absolute top-1 right-1 h-7 w-7 p-0"
                onClick={handleClear}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X size={14} />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </motion.div>

          <AnimatePresence initial={false}>
            {showResults && (
              <motion.section
                key="results"
                className={cn(
                  'rounded-md border border-border/40 bg-muted/40 p-2 shadow-sm',
                  !hasResults && 'border-dashed'
                )}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {(isLoading || isFetching) && (
                  <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching conversations…
                  </div>
                )}

                {isError && !isLoading && !isFetching && (
                  <div className="py-4 text-center text-sm text-destructive">
                    Something went wrong while searching. Please try again.
                  </div>
                )}

                {!isError && !isLoading && !isFetching && !hasResults && (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No conversations found for “{debouncedQuery}”.
                  </div>
                )}

                {!isError && hasResults && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
                      <span>
                        Showing {compactResults.length} of {totalResults} result
                        {totalResults === 1 ? '' : 's'}
                      </span>
                    </div>
                    <SidebarMenu>
                      {compactResults.map((chat) => (
                        <ChatItem
                          chat={chat}
                          isActive={chat.id === currentChatId}
                          key={chat.id}
                          onDelete={onDelete}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </SidebarMenu>

                    {showViewAll && (
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="mt-1 w-full"
                            size="sm"
                            type="button"
                            variant="secondary"
                          >
                            View all results
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl space-y-4">
                          <DialogHeader>
                            <DialogTitle>Search results</DialogTitle>
                            <DialogDescription>
                              Showing conversations matching “{debouncedQuery}”.
                            </DialogDescription>
                          </DialogHeader>

                          {(isDialogLoading || isDialogFetching) &&
                            !dialogChats.length && (
                              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Fetching more conversations…
                              </div>
                            )}

                          {isDialogError &&
                            !isDialogLoading &&
                            !dialogChats.length && (
                              <div className="py-6 text-center text-sm text-destructive">
                                We couldn’t load the full results. Please try
                                again later.
                              </div>
                            )}

                          {!isDialogError && dialogChats.length > 0 && (
                            <ScrollArea className="max-h-[65vh] pr-4">
                              <div className="flex flex-col gap-3">
                                <div className="text-xs text-muted-foreground">
                                  {dialogTotal} conversation
                                  {dialogTotal === 1 ? '' : 's'} found
                                </div>
                                <SidebarMenu className="gap-2">
                                  {dialogChats.map((chat) => (
                                    <ChatItem
                                      chat={chat}
                                      isActive={chat.id === currentChatId}
                                      key={chat.id}
                                      onDelete={(chatId) => {
                                        onDelete(chatId);
                                        setIsDialogOpen(false);
                                      }}
                                      setOpenMobile={setOpenMobile}
                                    />
                                  ))}
                                </SidebarMenu>

                                {hasNextPage && (
                                  <Button
                                    className="mt-1 self-center"
                                    disabled={isFetchingNextPage}
                                    onClick={() => fetchNextPage()}
                                    size="sm"
                                    type="button"
                                    variant="outline"
                                  >
                                    {isFetchingNextPage
                                      ? 'Loading more…'
                                      : 'Load more results'}
                                  </Button>
                                )}
                              </div>
                            </ScrollArea>
                          )}

                          {!isDialogError &&
                            !dialogChats.length &&
                            !isDialogLoading && (
                              <div className="py-6 text-center text-sm text-muted-foreground">
                                No additional conversations found.
                              </div>
                            )}
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
