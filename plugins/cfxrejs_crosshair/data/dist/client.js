"use strict";
(() => {
  // client.ts
  var isCrosshairVisible = false;
  var toggleCrosshair = (visible) => {
    isCrosshairVisible = visible;
    SendNUIMessage({
      type: "toggleCrosshair",
      display: visible
    });
  };
  setTick(() => {
    const playerPed = PlayerPedId();
    const isAiming = IsControlPressed(0, 25);
    const isPaused = IsPauseMenuActive();
    const isFreecam = IsPlayerFreeAiming(PlayerId());
    const shouldShow = isAiming && !isPaused;
    if (shouldShow !== isCrosshairVisible) {
      toggleCrosshair(shouldShow);
    }
    if (shouldShow) {
      HideHudComponentThisFrame(14);
    }
  });
  on("onResourceStop", (resourceName) => {
    if (GetCurrentResourceName() !== resourceName) return;
    toggleCrosshair(false);
  });
})();
