import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../Api/supabase";
import { useState } from "react";

// This hook fetches the current user's transactions with optional filtering and pagination.
// It gives the UI a simple API: current page, page size, and a way to change the page.
export function useTransaction(searchTerm?: string) {
  // Number of rows shown per page for the transaction list.
  const pageSize = 10;

  // Track which page the user is currently viewing.
  const [page, setPage] = useState(0);

  // Convert the page number into the starting and ending indexes for Supabase pagination.
  const from = page * pageSize;
  const to = from + (pageSize - 1);

  // Get the logged-in user so we only fetch that user's transactions.
  const { user } = useAuth();

  // React Query handles caching, loading, and refetching for this data request.
  const query = useQuery({
    // Include the user id, page, and current search term in the query cache key.
    queryKey: ["transactions", user?.id, page, searchTerm],

    // Fetch the transactions from Supabase when the user is available.
    queryFn: async () => {
      // Start with all transactions for the current user.
      let query = supabase
        .from("transactions")
        .select("*", { count: "exact" })
        .eq("user_id", user!.id);

      // If the user typed a search, filter by matching description or category text.
      if (searchTerm) {
        query = query.or(
          `description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`,
        );
      }

      // Sort latest items first and then only fetch the current page range.
      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(from, to);

      if (error) throw error;

      // Return the result together with a total count for pagination metadata.
      return { data, count: count ?? 0 };
    },

    // Only run the query if a user is logged in.
    enabled: !!user,
    placeholderData: keepPreviousData, // Keep the previous page's data while loading the next page.
  });

  // Expose the query result plus pagination controls to the component using this hook.
  return { ...query, page, setPage, pageSize };
}
