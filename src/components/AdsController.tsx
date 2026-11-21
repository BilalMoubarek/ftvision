"use client";

import { useEffect } from "react";

export default function AdsController() {
  useEffect(() => {
    const popunderEnabled =
      window.localStorage.getItem("ftvision_ads_popunder") === "true";
    const monetagTag = (
      window.localStorage.getItem("ftvision_monetag_tag") || ""
    ).trim();

    if (monetagTag) {
      const existing = document.getElementById("ftvision-custom-ad-script");
      if (!existing) {
        const container = document.createElement("div");
        container.id = "ftvision-custom-ad-script";
        container.style.display = "none";
        container.innerHTML = monetagTag;

        const scripts = container.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          if (oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });

        document.body.appendChild(container);
      }
    }

    if (!popunderEnabled) return;

    const handleFirstClick = () => {
      if (window.sessionStorage.getItem("ftvision_pop_fired") === "1") {
        return;
      }
      window.sessionStorage.setItem("ftvision_pop_fired", "1");
    };

    document.addEventListener("click", handleFirstClick, { once: true });
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  return null;
}
