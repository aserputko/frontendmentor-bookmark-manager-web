import { useCallback } from 'react';

export function useCopyBookmarkURL() {
  const copyToClipboard = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL to clipboard by navigator.clipboard', error);

      // Fallback for older browsers or when clipboard API is not available
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (fallbackError) {
        console.error('Failed to copy URL to clipboard', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  return { copyToClipboard };
}
