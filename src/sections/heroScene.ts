import * as THREE from "three";

export function initHeroScene(reducedMotion: boolean) {
  const canvas = document.getElementById("heroScene") as HTMLCanvasElement | null;
  const wrap = canvas?.parentElement;
  if (!canvas || !wrap) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const group = new THREE.Group();
  scene.add(group);

  // Wireframe lattice — an icosahedron edge-frame, the closest geometric
  // analogue to "data points resolving into a defined structure."
  const geo = new THREE.IcosahedronGeometry(2.15, 1);
  const wireMat = new THREE.LineBasicMaterial({ color: 0xff7a33, transparent: true, opacity: 0.85 });
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), wireMat);
  group.add(wire);

  // Points sitting at each vertex — the "data" half of the data-to-interface idea
  const ptsMat = new THREE.PointsMaterial({ color: 0x5fd0c0, size: 0.06, transparent: true, opacity: 0.9 });
  const pts = new THREE.Points(geo, ptsMat);
  group.add(pts);

  // faint inner core
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x16315c, transparent: true, opacity: 0.5 });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), coreMat);
  group.add(core);

  let targetX = 0;
  let targetY = 0;

  function resize() {
    const rect = wrap!.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height, 1);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  if (!reducedMotion) {
    window.addEventListener("pointermove", (e) => {
      const rect = wrap!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = ((e.clientX - cx) / rect.width) * 0.6;
      targetY = ((e.clientY - cy) / rect.height) * 0.6;
    });
  }

  let raf = 0;
  function tick() {
    if (!reducedMotion) {
      group.rotation.y += 0.0026;
      group.rotation.x += (targetY - group.rotation.x) * 0.04;
      core.rotation.y -= 0.0014;
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  // pause rendering off-screen to save battery
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!raf) tick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      });
    },
    { threshold: 0.05 }
  );
  io.observe(wrap);
}
