import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBookmarks,
  createBookmark,
  deleteBookmark,
} from "@/lib/api/bookmarks";

export const bookmarksQueryKey = ["bookmarks"];

export function useBookmarks() {
  return useQuery({
    queryKey: bookmarksQueryKey,
    queryFn: fetchBookmarks,
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarksQueryKey,
      });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarksQueryKey,
      });
    },
  });
}
