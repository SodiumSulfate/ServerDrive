const player = new Plyr('#player', {
  ratio: '16:9',
  controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
});

// 夜间模式点击切换逻辑
document.body.addEventListener('click', function (e) {
  // 点击右上角按钮时切换
  if (e.clientX > window.innerWidth - 80 && e.clientY < 80) {
    document.body.classList.toggle('dark-mode');
  }
});
