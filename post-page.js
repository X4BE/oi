 <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
  <script>
   // Matrix rain effect
    (() => {
      const canvas = document.getElementById('matrix-canvas');
      const ctx = canvas.getContext('2d');

      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*+-=<>?';
      const fontSize = 18;
      const columns = Math.floor(width / fontSize);
      const drops = new Array(columns).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      function animate() {
        draw();
        requestAnimationFrame(animate);
      }
      animate();

      window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      });
    })();

    // Copy and Raw buttons functionality
    const copyBtn = document.getElementById('copy-btn');
    const rawBtn = document.getElementById('raw-btn');
    const codeBlock = document.getElementById('code-block');

    copyBtn.addEventListener('click', () => {
      const codeText = codeBlock.innerText.trim();
      navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      });
    });

    rawBtn.addEventListener('click', () => {
      const codeText = codeBlock.innerText.trim();
      const blob = new Blob([codeText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    });
  </script>
