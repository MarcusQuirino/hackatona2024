/* eslint-disable @typescript-eslint/no-unsafe-return */
export function getPreviousUrl(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("previousUrl");
  }
  return null;
}

export function setPreviousUrl(url: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("previousUrl", url);
  }
}

// Remove getSelectedQualities and setSelectedQualities functions as they're no longer needed
