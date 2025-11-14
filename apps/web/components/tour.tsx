"use client";

import { driver } from "driver.js";
import { useEffect } from "react";

const driverObj = driver();

export function Tour() {
  const handleClick = () => {
    driverObj.highlight({
      element: "button[data-custom-id='suspense-debugger:button']",
      disableActiveInteraction: false,
      popover: {
        title: "Suspense Debugger",
        description: "Click to open the Suspense Debugger",
      },
    });
  };

  useEffect(() => {
    const devButton = document.querySelector(
      "button[data-custom-id='suspense-debugger:button']"
    );

    const handleDevButtonClick = () => {
      driverObj.isActive() && driverObj.destroy();
    };

    devButton?.addEventListener("click", handleDevButtonClick);

    return () => {
      devButton?.removeEventListener("click", handleDevButtonClick);
      driverObj.destroy();
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="hover:underline font-bold cursor-pointer"
    >
      here
    </button>
  );
}
