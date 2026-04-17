import pako from "pako";

const MAX_URL_CODE_LENGTH = 2048;

export function encodeCode(code: string): string | null {
  try {
    const compressed = pako.deflateRaw(new TextEncoder().encode(code));
    const base64 = btoa(String.fromCharCode(...compressed))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    if (base64.length > MAX_URL_CODE_LENGTH) return null;
    return base64;
  } catch {
    // fallback: plain base64
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      if (encoded.length > MAX_URL_CODE_LENGTH) return null;
      return encoded;
    } catch {
      return null;
    }
  }
}

export function decodeCode(encoded: string): string | null {
  try {
    // Restore base64url to standard base64
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decompressed = pako.inflateRaw(bytes);
    return new TextDecoder().decode(decompressed);
  } catch {
    // fallback: try plain base64
    try {
      return decodeURIComponent(escape(atob(encoded)));
    } catch {
      return null;
    }
  }
}

export async function copyShareURL(
  lang: string,
  code: string,
): Promise<{ ok: boolean; message: string }> {
  const encoded = encodeCode(code);
  if (!encoded) {
    return { ok: false, message: "代码过长，建议手动复制分享" };
  }
  const url = `${window.location.origin}/playground?lang=${lang}&code=${encoded}`;
  try {
    await navigator.clipboard.writeText(url);
    return { ok: true, message: "链接已复制" };
  } catch {
    return { ok: false, message: "复制失败，请手动复制" };
  }
}
