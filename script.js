document.addEventListener('DOMContentLoaded', () => {
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
      } catch (err) {
        // Cancelado por el usuario
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  });
});