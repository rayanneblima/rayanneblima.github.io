export const SITE_URL = "https://rayanneblima.github.io";

/**
 * Token da meta `google-site-verification` (Search Console, propriedade de
 * prefixo de URL `https://rayanneblima.github.io/`). Vazio = nenhuma tag é
 * emitida. Preencher com o token gerado no painel do GSC (tarefa 4.2).
 */
export const GOOGLE_SITE_VERIFICATION = "";

export const verification = GOOGLE_SITE_VERIFICATION
  ? { google: GOOGLE_SITE_VERIFICATION }
  : undefined;
