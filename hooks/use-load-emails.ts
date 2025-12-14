import { useEffect, useState } from "react";
import { useEmailStore } from "@/store/email-store";
import { parseAPIResponse } from "@/lib/email-utils";
import mockApiData from "@/tria_mock_key_api_request_response.json";
import type { APIResponse } from "@/types/api";
import toast from "react-hot-toast";


export function useLoadEmails() {
  const { setEmails, setLoading, setError, setGlobalSummary, fetchEmails } =
    useEmailStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const loadEmails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch real API data
        try {
          await fetchEmails();
        } catch (apiError) {
          // If real API fails, fallback to mock data
          
          const apiResponse = mockApiData as APIResponse;
          const emails = parseAPIResponse(apiResponse);
          setEmails(emails);

          // Set global summary from mock data
          if (apiResponse.summary) {
            setGlobalSummary(apiResponse.summary);
          }

          // Show toast notification
          toast.error(
            "Kestra backend not configured. Displaying mock data.",
            {
              duration: 5000,
              position: "top-center",
              icon: "⚠️",
            }
          );
        }

        setIsInitialized(true);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load emails"
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [isInitialized, setEmails, setLoading, setError, setGlobalSummary]);

  return { isInitialized };
}
