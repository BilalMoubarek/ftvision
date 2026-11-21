"use client";

import { useEffect } from "react";

export default function AdsController() {
  useEffect(() => {
    try {
      const keysToClear = [
        "ftvision_ads_popunder",
        "ftvision_ads_popunder_disabled",
        "ftvision_adspopunder_disabled",
        "ftvision_ads_banner",
        "ftvision_monetag_tag",
        "ftvision_monetag_tag_disabled",
      ];
      keysToClear.forEach((k) => window.localStorage.removeItem(k));
      window.sessionStorage.removeItem("ftvision_pop_fired");

      const oldContainer = document.getElementById("ftvision-custom-ad-script");
      if (oldContainer) {
        oldContainer.remove();
      }
    } catch {
      // تجاهل أخطاء التخزين
    }
  }, []);

  return null;
}
