document.querySelectorAll('.dropdown').forEach(drop => {
      drop.addEventListener('mouseenter', () => {
        const menu = drop.querySelector('.dropdown-menu');
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
      });
      drop.addEventListener('mouseleave', () => {
        const menu = drop.querySelector('.dropdown-menu');
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
      });
    });