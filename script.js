(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const captions = [
    'Xusuus qurux badan ❤️', 'Daqiiqado mudan in la xafido 🌹', 'Quruxda ku jirta waxyaabaha yaryar ✨',
    'Bog kale oo xusuus mudan 💖', 'Maalin gaar ah, xusuus gaar ah 🎂', 'Xusuuso qalbiga ku nool 💌'
  ];

  // Hide the gentle loading screen once the page is ready.
  window.addEventListener('load', () => setTimeout(() => $('#loader')?.classList.add('done'), 350));

  // Progress line follows the visitor through the page.
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    $('#progress-bar').style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Small, decorative rose petals. They are hidden when reduced motion is requested.
  $$('.petal-field').forEach(field => {
    const total = Number(field.dataset.petals || 12);
    for (let i = 0; i < total; i++) {
      const petal = document.createElement('i');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDelay = `${Math.random() * -18}s`;
      petal.style.animationDuration = `${13 + Math.random() * 13}s`;
      petal.style.setProperty('--drift', `${Math.round(Math.random() * 140 - 70)}px`);
      field.append(petal);
    }
  });

  // Mobile menu closes after choosing a destination or tapping the menu button again.
  const menuToggle = $('#menu-toggle');
  const nav = $('#site-nav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Xir liiska' : 'Fur liiska');
    menuToggle.textContent = open ? '×' : '☰';
  });
  $$('#site-nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰';
  }));

  // Birthday countdown uses the visitor's local calendar and clock. October 28 stays
  // the target throughout the whole birthday day, then advances to the next year.
  const updateCountdown = () => {
    const now = new Date();
    const birthdayToday = now.getMonth() === 9 && now.getDate() === 28;
    $('#birthday-today').hidden = !birthdayToday;
    $('#countdown-box').hidden = birthdayToday;
    if (birthdayToday) return;
    let year = now.getFullYear();
    let target = new Date(year, 9, 28, 0, 0, 0, 0);
    if (now > target) target = new Date(year + 1, 9, 28, 0, 0, 0, 0);
    let seconds = Math.max(0, Math.floor((target - now) / 1000));
    const days = Math.floor(seconds / 86400); seconds %= 86400;
    const hours = Math.floor(seconds / 3600); seconds %= 3600;
    const minutes = Math.floor(seconds / 60); seconds %= 60;
    $('#days').textContent = String(days).padStart(2, '0');
    $('#hours').textContent = String(hours).padStart(2, '0');
    $('#minutes').textContent = String(minutes).padStart(2, '0');
    $('#seconds').textContent = String(seconds).padStart(2, '0');
  };
  updateCountdown(); setInterval(updateCountdown, 1000);

  // Love letter content, revealed paragraph by paragraph.
  const letterParagraphs = [
    'Dhalasho Wacan, Rayan, Boqoradda Qalbigayga ❤️👑🌹',
    'Gacalisadayda Rayan,',
    'Maanta ma aha maalin caadi ah. Waa maalintii dunidu heshay qof qurux badan oo qalbi wanaagsan, qof aan maanta oo keliya u dabaaldegayn dhalashadiisa, balse aan doonayo inuu ogaado sida uu qaali iigu yahay.',
    'Haddii aan heli lahaa kun eray oo aan kuugu sheego waxa aad ii tahay, weli erayadu kuma filnaadeen. Haddii aan heli lahaa kun ubax oo aan kuu keeno, weli ma gaarsiisnaadeen quruxda aan kuu rajaynayo. Haddii aan heli lahaa xiddig kasta oo cirka ku jira, waxaan jeclaan lahaa inaan kuu iftiimiyo waddada farxaddaada.',
    'Rayan, waxaad tahay qof qalbigayga ku leh meel aan cid kale buuxin karin. Magacaaga marka aan arko, qalbigayga waxaa ku soo dhaca dareen qurux badan; marka aan kaa fikiro, waxaan xusuustaa in dunidu weli leedahay waxyaabo mudan in loo mahadnaqo.',
    'Maalinta dhalashadaada, waxaan kuu rajaynayaa farxad aan dhammaan, riyooyin rumooba, guul kasta oo aad hiigsato, iyo nolol ay ka buuxaan nabad, caafimaad iyo barako. Ilaahay ha kuu ilaaliyo qalbigaaga wanaagsan, hana kuu furo albaab kasta oo khayr kuu ah.',
    'Waxaan jeclaan lahaa in sannad kasta oo dhalashadaadu timaaddo aad dib u eegto noloshaada oo aad aragto inta aad kortay, inta aad gaartay, iyo quruxda mustaqbalka kuu diyaarsan.',
    'Waxaan rabaa inaad ogaato hal shay, Rayan: maanta waa maalintaada, laakiin farxadda aan kuu rajaynayo ma aha mid ku eg maanta. Waxaad mudan tahay in lagu qadariyo, lagu ixtiraamo, laguna jeclaado maalin kasta. ❤️',
    'Haddii aan maanta hal hadiyad oo keliya ku siin karo, waxaan jeclaan lahaa inay noqoto inaad naftaada ku aragto indhaha qof kuu rajaynaya wanaag, farxad iyo guul.',
    'Dhalasho wacan, naftayda qaaliga ah. 🌹',
    '28 October — Maalintii uu dunidu heshay Rayan.',
    'Waxaan kuu rajaynayaa sannad cusub oo noloshaada ka mid ah oo ka qurux badan dhammaan kuwii kaa horreeyay.',
    'Dhalasho wacan, Rayan. Waxaad tahay qof qaali ah, maanta, berri iyo maalin kasta. ❤️🎂💌'
  ];
  const paper = $('#letter-paper'), copy = $('#letter-copy');
  let letterTimer;
  const openLetter = () => {
    clearTimeout(letterTimer);
    $('#letter-intro').hidden = true; paper.hidden = false; $('#after-letter').hidden = true;
    $('#reopen-letter').hidden = true; copy.replaceChildren();
    let index = 0;
    const reveal = () => {
      if (index >= letterParagraphs.length) {
        $('.letter-signoff', paper).hidden = false;
        $('#after-letter').hidden = false; $('#reopen-letter').hidden = false;
        return;
      }
      const p = document.createElement('p');
      p.textContent = letterParagraphs[index];
      if ([0, 1, 9, 10, 12].includes(index)) p.classList.add('highlight');
      copy.append(p); index++;
      letterTimer = setTimeout(reveal, 240);
    };
    $('.letter-signoff', paper).hidden = true;
    reveal();
  };
  $('#open-letter').addEventListener('click', openLetter);
  $('#reopen-letter').addEventListener('click', () => { paper.hidden = true; $('#letter-intro').hidden = false; $('#letter-intro').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  $('#replay-letter').addEventListener('click', openLetter);

  // Six reasons reveal independently; all six opened cards reveal the closing note.
  const cards = $$('.reason-card');
  cards.forEach(card => card.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(open));
    card.querySelector('.reason-more').textContent = open ? 'Qalbi ka timid ♥' : 'Taabo si aad u furto +';
    if (cards.every(item => item.classList.contains('open'))) $('#all-reasons-message').hidden = false;
  }));

  // Photo slots use local image paths. Missing files simply retain the honest placeholder.
  const photoCards = $$('.photo-card');
  photoCards.forEach((card, index) => {
    const img = document.createElement('img'); img.src = `images/photo${index + 1}.jpg`;
    img.alt = captions[index]; img.addEventListener('load', () => card.querySelector('.photo-placeholder').prepend(img));
    img.addEventListener('error', () => img.remove());
  });
  let photoIndex = 0;
  const position = () => { $('#gallery-position').textContent = `Sawir ${photoIndex + 1} / ${photoCards.length}`; };
  const movePhoto = amount => { photoIndex = (photoIndex + amount + photoCards.length) % photoCards.length; position(); };
  $('#gallery-prev').addEventListener('click', () => { movePhoto(-1); showLightbox(); });
  $('#gallery-next').addEventListener('click', () => { movePhoto(1); showLightbox(); });
  photoCards.forEach(card => card.addEventListener('click', () => {
    photoIndex = Number(card.dataset.index); position(); showLightbox();
  }));
  const lightbox = $('#lightbox');
  function showLightbox() {
    const content = $('#lightbox-content'); content.replaceChildren();
    const source = `images/photo${photoIndex + 1}.jpg`;
    const img = document.createElement('img'); img.src = source; img.alt = captions[photoIndex];
    img.addEventListener('error', () => {
      content.replaceChildren(); const note = document.createElement('div'); note.className = 'lightbox-placeholder';
      note.innerHTML = `<span>Ku dar sawirkaaga</span><small>images/photo${photoIndex + 1}.jpg</small>`; content.append(note);
    });
    content.append(img); $('#lightbox-caption').textContent = captions[photoIndex];
    if (!lightbox.open) lightbox.showModal();
  }
  $('#lightbox-close').addEventListener('click', () => lightbox.close());
  $('#lightbox-prev').addEventListener('click', () => { movePhoto(-1); showLightbox(); });
  $('#lightbox-next').addEventListener('click', () => { movePhoto(1); showLightbox(); });
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowRight') { movePhoto(1); showLightbox(); }
    if (event.key === 'ArrowLeft') { movePhoto(-1); showLightbox(); }
  });

  // Celebrations use DOM elements and do not need canvas or external libraries.
  const celebrationLayer = $('#celebration-layer');
  function celebrate(amount = 90) {
    const colors = ['#f7a8b8', '#d4af37', '#fff0f3', '#b62849', '#ffffff'];
    for (let i = 0; i < amount; i++) {
      const bit = document.createElement('i'); bit.className = 'confetti-piece';
      bit.style.left = `${Math.random() * 100}%`; bit.style.background = colors[i % colors.length];
      bit.style.setProperty('--duration', `${2.3 + Math.random() * 2.2}s`);
      bit.style.setProperty('--drift', `${Math.round(Math.random() * 220 - 110)}px`);
      bit.style.transform = `rotate(${Math.random() * 180}deg)`; celebrationLayer.append(bit);
      setTimeout(() => bit.remove(), 5000);
    }
    for (let i = 0; i < 14; i++) {
      const heart = document.createElement('i'); heart.className = 'burst-heart'; heart.textContent = Math.random() > .5 ? '♥' : '🌹';
      heart.style.setProperty('--left', `${Math.random() * 100}%`); heart.style.setProperty('--size', `${15 + Math.random() * 20}px`);
      celebrationLayer.append(heart); setTimeout(() => heart.remove(), 2600);
    }
  }
  $('#wish-button').addEventListener('click', event => {
    $('.cake-wrap').classList.add('wished'); $('#wish-message').hidden = false;
    event.currentTarget.disabled = true; event.currentTarget.textContent = 'Rajadaadu ha rumoowdo ❤️'; celebrate(110);
  });
  $('#final-button').addEventListener('click', event => {
    $('#final-reveal').hidden = false; event.currentTarget.hidden = true; celebrate(150);
  });

  // Optional music only begins after the visitor explicitly presses play.
  const audio = $('#background-music'), musicToggle = $('#music-toggle');
  musicToggle.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play(); musicToggle.classList.add('playing');
        musicToggle.setAttribute('aria-label', 'Hakadka geli muusigga'); $('#music-label').textContent = 'Wuu socdaa';
      } catch {
        $('#music-label').textContent = 'Ku dar music-ka';
        musicToggle.setAttribute('aria-label', 'Faylka muusigga lama helin');
        setTimeout(() => { if (audio.paused) { $('#music-label').textContent = 'Muusig'; musicToggle.setAttribute('aria-label', 'Daar muusigga'); } }, 3000);
      }
    } else {
      audio.pause(); musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-label', 'Daar muusigga'); $('#music-label').textContent = 'Muusig';
    }
  });
  audio.addEventListener('error', () => { musicToggle.classList.remove('playing'); });

  // Replaying opening motion is handy for sharing the surprise with someone nearby.
  $('#replay-hero').addEventListener('click', () => {
    const hero = $('#home'); hero.scrollIntoView({ behavior: 'smooth' });
    const content = $('.hero-content'); content.classList.remove('replay'); void content.offsetWidth; content.classList.add('replay');
    celebrate(35);
  });
})();
