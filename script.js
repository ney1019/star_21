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

  // 2. Detección de navegador interno (TikTok, Instagram, Facebook) y sistema operativo
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInApp = /TikTok|BytedanceWebview|musical_ly|Instagram|FBAN|FBAV/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  // 3. Forzar apertura en App Nativa / Navegador Externo
  const socialLinks = document.querySelectorAll('a[data-app]');

  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const app = link.getAttribute('data-app');
      const user = link.getAttribute('data-user');
      const webUrl = link.getAttribute('href');

      // Si estamos en Android (especialmente dentro de TikTok), usamos Android Intents
      if (isAndroid) {
        e.preventDefault();
        let intentUrl = '';

        if (app === 'instagram') {
          intentUrl = `intent://instagram.com/_u/${user}/#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
        } else if (app === 'youtube') {
          intentUrl = `intent://www.youtube.com/${user}#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
        } else if (app === 'facebook') {
          const cleanUrl = webUrl.replace('https://', '');
          intentUrl = `intent://${cleanUrl}#Intent;package=com.facebook.katana;scheme=https;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
        } else if (app === 'tiktok') {
          intentUrl = `intent://www.tiktok.com/@${user}#Intent;package=com.zhiliaoapp.musically;scheme=https;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
        }

        if (intentUrl) {
          window.location.href = intentUrl;
          return;
        }
      }

      // Si estamos en iPhone dentro de un navegador interno, usamos URL Schemes
      if (isIOS && isInApp) {
        let appScheme = '';

        if (app === 'instagram') appScheme = `instagram://user?username=${user}`;
        if (app === 'youtube') appScheme = `youtube://www.youtube.com/${user}`;
        if (app === 'facebook') appScheme = `fb://facewebmodal/f?href=${encodeURIComponent(webUrl)}`;

        if (appScheme) {
          e.preventDefault();
          window.location.href = appScheme;
          // Si no tiene la app instalada, abre el enlace web tras 800ms
          setTimeout(() => {
            window.location.href = webUrl;
          }, 800);
        }
      }
    });
  });

  // 4. Botón de compartir
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