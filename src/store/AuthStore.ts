import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../util/api";

interface User {
  nome: string;
  roles: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (nome: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      error: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha: password }),
          });

          if (!response.ok) {
            let errorMessage = "Falha no login";
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch {
              try {
                errorMessage = await response.text();
              } catch {}
            }
            throw new Error(errorMessage);
          }

          // Extrair token: pode vir como JSON { token } ou body puro
          let token: string | null = null;
          try {
            const text = await response.text();
            if (!text) throw new Error("Resposta vazia do servidor");
            try {
              const parsed = JSON.parse(text);
              if (typeof parsed === "string") token = parsed;
              else token = parsed.token || parsed.accessToken || null;
            } catch {
              token = text;
            }
          } catch (e) {
            throw new Error("Não foi possível ler resposta do servidor");
          }

          if (!token) throw new Error("Token inválido recebido");

          // Decodifica token uma vez, extrai roles (se houver) e atualiza o estado.
          let decoded: any = {};
          try {
            decoded = jwtDecode(token as string);
          } catch {}

          // Normaliza roles vindas do token (se houver)
          let tokenRoles: string[] = [];
          if (Array.isArray(decoded?.roles) && decoded.roles.length > 0) {
            tokenRoles = decoded.roles.map((r: any) =>
              typeof r === "string" ? r : String(r)
            );
          } else if (
            Array.isArray(decoded?.authorities) &&
            decoded.authorities.length > 0
          ) {
            tokenRoles = decoded.authorities.map((a: any) => {
              if (typeof a === "string") return a;
              if (a?.authority) return a.authority;
              if (a?.role) return a.role;
              return String(a);
            });
          }

          const basicUser: User = {
            nome:
              decoded?.nome || decoded?.name || decoded?.given_name || decoded?.sub || decoded?.email || "",
            roles: tokenRoles,
          };

          set({ token, user: basicUser, isAuthenticated: true, error: null });

          // Se token não trouxer roles, buscar /auth/me para popular roles
          if (!basicUser.roles || basicUser.roles.length === 0) {
            (async () => {
              try {
                const resp = await fetch(API_URL + "/auth/me", {
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (resp.ok) {
                  const profile = await resp.json();
                  const profileRoles: string[] = Array.isArray(profile.roles)
                    ? profile.roles
                    : Array.isArray(profile.authorities)
                    ? profile.authorities.map((a: any) =>
                        typeof a === "string"
                          ? a
                          : a.authority || a.role || String(a)
                      )
                    : [];
                  const nome =
                    profile.nome ||
                    profile.username ||
                    profile.email ||
                    basicUser.nome;
                  set({ user: { nome, roles: profileRoles } });
                }
              } catch (e) {
                // ignore
              }
            })();
          }

          return true;
        } catch (error: any) {
          const errorMessage = error?.message || "Ocorreu um erro desconhecido";
          set({ error: errorMessage });
          return false;
        }
      },

      register: async (nome, email, password) => {
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha: password }),
          });

          if (!response.ok) {
            let errorMessage = "Falha no registro";
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }

          return true;
        } catch (error: any) {
          const errorMessage = error?.message || "Ocorreu um erro desconhecido";
          set({ error: errorMessage });
          return false;
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false, error: null });
        try {
          localStorage.removeItem("auth-storage");
        } catch {}
      },

      hasRole: (role: string) => {
        const user = get().user;
        const roles = user?.roles || [];
        const normalized = role.toUpperCase();
        return (
          roles.includes(role) ||
          roles.includes(normalized) ||
          roles.includes(`ROLE_${normalized}`) ||
          roles.includes(`ROLE_${role}`)
        );
      },

      setError: (error) => {
        set({ error });
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;

// Rehydrate on load: if there's a persisted token, populate basic user and try /auth/me
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (raw) {
      let parsed: any = null;
      try {
        parsed = JSON.parse(raw);
      } catch {}
      const state = parsed?.state ?? parsed;
      const token = state?.token;
      const alreadyAuth = useAuthStore.getState().isAuthenticated;
      if (token && !alreadyAuth) {
        try {
          let decoded: any = {};
          try {
            decoded = jwtDecode(token);
          } catch {}
          const basicUser: User = {
            nome:
              decoded?.nome || decoded?.name || decoded?.given_name || decoded?.sub || decoded?.email || "",
            roles: [],
          };
          useAuthStore.setState({
            token,
            user: basicUser,
            isAuthenticated: true,
          });

          (async () => {
            try {
              const resp = await fetch(API_URL + "/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (resp.ok) {
                const profile = await resp.json();
                const profileRoles: string[] = Array.isArray(profile.roles)
                  ? profile.roles
                  : Array.isArray(profile.authorities)
                  ? profile.authorities.map((a: any) =>
                      typeof a === "string"
                        ? a
                        : a.authority || a.role || String(a)
                    )
                  : [];
                const nome =
                  profile.nome ||
                  profile.username ||
                  profile.email ||
                  basicUser.nome;
                useAuthStore.setState({ user: { nome, roles: profileRoles } });
              }
            } catch {}
          })();
        } catch {}
      }
    }
  } catch {}
}

// Dev shortcut: expose the store on window for debugging
try {
  if (
    typeof window !== "undefined" &&
    (import.meta as any).env?.MODE !== "production"
  ) {
    (window as any).useAuthStore = useAuthStore;
  }
} catch {}
// Rehydrate helper: se houver um token persistido mas o store não estiver marcado como autenticado,
// decodifica o token e popula `user` + `isAuthenticated` para manter a UI consistente após reload.
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (raw) {
      let parsed: any = null;
      try {
        parsed = JSON.parse(raw);
      } catch {}
      const state = parsed?.state ?? parsed;
      const token = state?.token;
      const alreadyAuth = useAuthStore.getState().isAuthenticated;
      if (token && !alreadyAuth) {
        try {
          const decoded: any = jwtDecode(token);
          let roles: string[] = [];
          if (Array.isArray(decoded.roles) && decoded.roles.length > 0) {
            roles = decoded.roles.map((r: any) =>
              typeof r === "string" ? r : String(r)
            );
          } else if (
            Array.isArray(decoded.authorities) &&
            decoded.authorities.length > 0
          ) {
            roles = decoded.authorities.map((a: any) => {
              if (typeof a === "string") return a;
              if (a?.authority) return a.authority;
              if (a?.role) return a.role;
              return String(a);
            });
          }
          const user: User = {
            nome:
              decoded?.nome || decoded?.name || decoded?.given_name || decoded?.sub || decoded?.email || "",
            roles,
          };
          useAuthStore.setState({ token, user, isAuthenticated: true });
        } catch {}
      }
    }
  } catch {}
}
