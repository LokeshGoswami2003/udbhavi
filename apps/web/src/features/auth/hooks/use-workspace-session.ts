"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getCurrentSession,
  logout,
  refresh,
  toStoredAuthSession,
} from "@/features/auth/api";
import {
  clearStoredAuthSession,
  loadStoredAuthSession,
  persistAuthSession,
} from "@/features/auth/storage";
import type { StoredAuthSession } from "@/features/auth/types";

type ViewState =
  | { kind: "loading" }
  | { kind: "ready"; session: StoredAuthSession; onboardingStatus: string }
  | { kind: "error"; message: string };

export function useWorkspaceSession() {
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState>({ kind: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const storedSession = loadStoredAuthSession();
      if (!storedSession) {
        startTransition(() => {
          router.replace("/login");
        });
        return;
      }

      try {
        const authSession = await getCurrentSession(storedSession.accessToken);
        if (!isMounted) {
          return;
        }

        setViewState({
          kind: "ready",
          session: { ...storedSession, user: authSession.user },
          onboardingStatus: authSession.profile_onboarding_status,
        });
      } catch {
        try {
          const refreshedTokens = await refresh(storedSession.refreshToken);
          const nextSession = toStoredAuthSession(refreshedTokens);
          persistAuthSession(nextSession);
          const authSession = await getCurrentSession(nextSession.accessToken);
          if (!isMounted) {
            return;
          }

          setViewState({
            kind: "ready",
            session: { ...nextSession, user: authSession.user },
            onboardingStatus: authSession.profile_onboarding_status,
          });
        } catch (error) {
          clearStoredAuthSession();
          if (!isMounted) {
            return;
          }

          setViewState({
            kind: "error",
            message:
              error instanceof Error
                ? error.message
                : "Your session expired. Please sign in again.",
          });
          startTransition(() => {
            router.replace("/login");
          });
        }
      }
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    const storedSession = loadStoredAuthSession();
    if (storedSession) {
      await logout(storedSession.refreshToken).catch(() => undefined);
    }

    clearStoredAuthSession();
    toast.success("Signed out.");
    startTransition(() => {
      router.replace("/");
    });
  };

  return {
    handleLogout,
    viewState,
  };
}
