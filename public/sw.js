// Minimal service worker whose only job is displaying Web Push
// notifications - no offline caching / PWA install behavior, so it can't
// interfere with normal page loads if something in it breaks.

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Tự Học Tài Chính", body: event.data.text() };
  }

  const title = payload.title || "Tự Học Tài Chính";
  const options = {
    body: payload.body || "",
    icon: "/logo.png",
    badge: "/logo.png",
    data: { url: payload.url || "/dashboard" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
