import { useEffect, useState } from "react";
import { useEmailStore } from "@/store/email-store";
import { parseAPIResponse } from "@/lib/email-utils";
import mockApiData from "@/tria_mock_key_api_Request_two_data_ke_saath.json";
import type { APIResponse } from "@/types/api";


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

        // Load mock data
        const apiResponse = mockApiData as APIResponse;
        const emails = parseAPIResponse(apiResponse);
        setEmails(emails);

        // Set global summary from API
        if (apiResponse.summary) {
          setGlobalSummary(apiResponse.summary);
        }

        // Uncomment below to use real API instead of mock data
        // await fetchEmails();

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to load emails:", error);
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
