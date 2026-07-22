// src/wdyr.ts
import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

// التأكد من أن المكتبة تعمل في وضع التطوير (Development) فقط حتى لا تؤثر على الإنتاج (Production)
if (import.meta.env.DEV) {
  whyDidYouRender(React, {
    trackAllPureComponents: true, // لتتبع المكونات التي تستخدم React.memo تلقائياً
    trackHooks: true, // لتتبع الـ Hooks
  });
}
