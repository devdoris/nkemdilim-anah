document.addEventListener(
  'play',
  function (e) {
    if (e.target.tagName !== 'VIDEO') return;

    document.querySelectorAll('video').forEach(video => {
      if (video !== e.target) {
        video.pause();
      }
    });
  },
  true 
);


const portfolioItems = document.querySelectorAll('.portfolio-item');

const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <span class="modal-close">&times;</span>
  <div class="modal-content-wrapper">
    <img class="modal-content">
    <video class="modal-video" controls playsinline></video>
  </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.modal-content');
const modalVideo = modal.querySelector('.modal-video');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.portfolio-item video').forEach(video => {
  video.addEventListener('click', e => e.stopPropagation());
});

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const video = item.querySelector('video');

    document.querySelectorAll('video').forEach(v => v.pause());

    if (img) {
      modalImg.src = img.src;
      modalImg.style.display = 'block';
      modalVideo.style.display = 'none';
    }

    if (video) {
      modalVideo.src = video.querySelector('source').src;
      modalVideo.style.display = 'block';
      modalImg.style.display = 'none';
      modalVideo.play();
    }

    modal.style.display = 'block';
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = 'none';
  modalVideo.pause();
}
