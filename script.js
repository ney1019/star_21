document.addEventListener('DOMContentLoaded', () => {
  // 1. Animación de entrada
  const cards = document.querySelectorAll('.link-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 90 * index);
  });

  // 2. Mostrar guía solo si se abre dentro de TikTok / Instagram
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInApp = /TikTok|BytedanceWebview|musical_ly|Instagram|FBAN|FBAV/i.test(ua);
  const banner = document.getElementById('inAppBanner');

  if (isInApp && banner) {
    banner.style.display = 'block';
    document.body.style.paddingTop = '4.2rem';
  }

  // 3. Botón de compartir
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: '👑 STAR | Tania Rodas',
      text: 'Sígueme en TikTok y en todas mis redes oficiales:',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  });
});