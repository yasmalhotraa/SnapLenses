import { bootstrapCameraKit } from "@snap/camera-kit";

async function init() {
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const lensGroupId = import.meta.env.VITE_GROUP_ID;

  // 1. Bootstrap
  const cameraKit = await bootstrapCameraKit({ apiToken });

  // 2. Create session and attach to canvas
  const canvas = document.getElementById("camera-canvas");
  const session = await cameraKit.createSession({ liveRenderTarget: canvas });

  // 3. Set up the camera
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  await session.setSource(mediaStream);
  await session.play();

  // 4. Load all lenses in the group
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    lensGroupId,
  ]);

  if (lenses.length === 0) {
    console.warn("No lenses found in group");
    return;
  }

  console.log(
    "Loaded lenses:",
    lenses.map((l) => l.id)
  );

  await session.applyLens(lenses[0]);

  lenses.forEach((lens, index) => {
    const btn = document.getElementById(`lens-${index}`);
    if (btn) {
      btn.addEventListener("click", async () => {
        await session.applyLens(lens);
        console.log(`Applied lens ${index}:`, lens.id);
      });
    }
  });
}

init().catch((err) => {
  console.error("Camera Kit init error:", err);
  alert(
    "Check console for CameraKit errors (permissions, CSP, or token issues)."
  );
});
