"use client";

import { useEffect } from "react";

export default function AdsController() {
  useEffect(() => {
    try {
      window.localStorage.setItem("ftvision_ads_popunder", "false");
      window.localStorage.setItem("ftvision_monetag_tag", "");
      window.sessionStorage.removeItem("ftvision_pop_fired");

      const oldContainer = document.getElementById("ftvision-custom-ad-script");
      if (oldContainer) {
        oldContainer.remove();
      }
    } catch {
      // تجاهل أي خطأ في التخزين المحلي
    }
  }, []);

  return null;
}
