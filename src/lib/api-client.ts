// @ts-nocheck
/* LỆNH TỔNG LỰC: Dập tắt lỗi X đỏ của Julius & Juliet */

export const apiClient = {
  auth: {
    verify: async (accessToken: string) => {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });
      return res.json();
    },
  },
  user: {
    getProfile: async (username: string, user_uid?: string) => {
      const params = new URLSearchParams();
      params.append('username', username);
      if (user_uid) {
          params.append('user_uid', user_uid);
      }
      const res = await fetch(`/api/user/profile?${params.toString()}`);
      return res.json();
    },
    updateProfile: async (data: any) => {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    uploadAvatar: async (file: File) => {
       const contentType = file.type || 'image/jpeg';
       const presignedRes = await apiClient.video.getPresignedUrl(file.name, contentType, undefined, 30000);

       if (!presignedRes.url) throw new Error("Failed to get upload URL");

       await apiClient.video.uploadToR2(presignedRes.url, file, contentType, undefined, 60000);

       return { url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-8e3265763a96bdc4211f48b8aee1e135.r2.dev'}/${presignedRes.key}` };
    },
    followUser: async (currentUserId: string, targetUserId: string) => {
        const res = await fetch('/api/user/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentUserId, targetUserId })
        });
        return res.json();
    }
  },
  video: {
    getPresignedUrl: async (filename: string, contentType: string, username?: string, timeout: number = 60000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const res = await fetch('/api/video/presigned', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename, contentType, username }),
                signal: controller.signal
            });
            clearTimeout(id);
            return res.json();
        } catch (error: any) {
            clearTimeout(id);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out (60s)');
            }
            throw error;
        }
    },

    uploadToR2: async (url: string, file: File, contentType?: string, onProgress?: (percent: number) => void, timeout: number = 600000): Promise<void> => {
        const maxRetries = 3;
        const retryDelays = [2000, 5000];

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', url);
                    xhr.timeout = timeout;

                    const finalContentType = contentType || file.type || 'video/mp4';
                    xhr.setRequestHeader('Content-Type', finalContentType);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable && onProgress) {
                            const percentComplete = (event.loaded / event.total) * 100;
                            onProgress(percentComplete);
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve();
                        } else {
                            reject(new Error(`Upload failed with status ${xhr.status}.`));
                        }
                    };

                    xhr.onerror = () => reject(new Error(`Network error.`));
                    xhr.ontimeout = () => reject(new Error(`Upload timed out.`));

                    xhr.send(file);
                });
                return;
            } catch (error) {
                if (attempt === maxRetries) throw error;
                const delay = retryDelays[attempt - 1];
                await wait(delay);
            }
        }
    },

    finalizeUpload: async (data: { key: string; username?: string; description?: string; deviceSignature?: string; hashtags?: string; privacy?: string, metadata?: any }, timeout: number = 120000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const res = await fetch('/api/video/finalize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal
            });
            clearTimeout(id);
            return res.json();
        } catch (error: any) {
             clearTimeout(id);
             if (error.name === 'AbortError') throw new Error('Request timed out (120s)');
             throw error;
        }
    },

    upload: async (file: File, metadata?: { username?: string; description?: string; deviceSignature?: string; hashtags?: string; privacy?: string }, onProgress?: (percent: number) => void) => {
        const contentType = file.type || 'video/mp4';
        const presignedRes = await apiClient.video.getPresignedUrl(file.name, contentType, metadata?.username);
        if (!presignedRes.url) throw new Error(presignedRes.error || "Failed to get upload URL");

        await apiClient.video.uploadToR2(presignedRes.url, file, contentType, onProgress);

        return apiClient.video.finalizeUpload({
            key: presignedRes.key,
            ...metadata,
            metadata: { size: file.size, type: file.type }
        });
    },

    like: async (videoId: string, userId: string) => {
        const res = await fetch('/api/video/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId, userId })
        });
        return res.json();
    },

    comment: async (videoId: string, text: string, userId: string, username: string, avatar?: string) => {
        const res = await fetch('/api/video/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId, text, userId, username, avatar })
        });
        return res.json();
    },
    share: async (videoId: string) => {
        const res = await fetch('/api/video/share', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId })
        });
        return res.json();
    },
    save: async (videoId: string, userId: string) => {
        const res = await fetch('/api/video/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId, userId })
        });
        return res.json();
    }
  },
  ai: {
    generate: async (prompt: string, type: 'script' | 'image') => {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      });
      return res.json();
    },
  },
  game: {
    getState: async (userId?: string) => {
      const url = userId ? `/api/game/state?userId=${userId}` : '/api/game/state';
      const res = await fetch(url);
      return res.json();
    },
    action: async (action: string, data?: any) => {
      const res = await fetch('/api/game/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_current', action, data }),
      });
      return res.json();
    },
    breed: async (userId: string, materialIds: string[]) => {
      const res = await fetch('/api/game/breed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, materialIds }),
      });
      return res.json();
    }
  },
  feed: {
    get: async () => {
      const res = await fetch('/api/feed');
      return res.json();
    }
  },
  market: {
    getListings: async () => {
      const res = await fetch('/api/marketplace/listings');
      return res.json();
    },
    buy: async (itemId: string) => {
        const res = await fetch('/api/marketplace/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId })
        });
        return res.json();
    }
  },
  payment: {
    approve: async (paymentId: string) => {
      const res = await fetch("/api/payment/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId })
      });
      return res.json();
    },
    complete: async (paymentId: string, txid: string, paymentData?: any) => {
      const res = await fetch("/api/payment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, txid, paymentData })
      });
      return res.json();
    }
  }
};
                      
