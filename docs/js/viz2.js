const stories = {
  python: `🐍 <strong>Python</strong> was named after the British comedy group <em>Monty Python’s Flying Circus</em>, not the snake! Its creator Guido van Rossum wanted a name that was short, unique, and fun.`,
  java: `☕ <strong>Java</strong> was named after <em>Java coffee</em> from the Indonesian island of Java. It was initially called Oak but renamed for trademark reasons.`,
  cpp: `💾 <strong>C</strong> was named as the successor to the B language, which came from BCPL. It’s simply the next letter in the alphabet.`,
  php: `🐘 <strong>PHP</strong> originally stood for "Personal Home Page", but it was later redefined as <em>PHP: Hypertext Preprocessor</em>, a recursive acronym.`,
  matlab: `📊 <strong>MATLAB</strong> stands for <em>MATrix LABoratory</em>, originally developed to provide easy access to matrix software for engineering applications.`
};

let selected = { snake: false, comedy: false };
let storyShown = {};

function openDoor(language) {

  const allPlanets = document.querySelectorAll(".planet");
  allPlanets.forEach(p => {
    if (p.classList.contains(`planet--${language}`)) {
      p.classList.add("planet--focused");
    } else {
      p.classList.add("planet--dimmed");
    }
  });

  document.querySelector(".planet-orbit").classList.add("focused");

  const modal = document.getElementById("story-modal");
  setTimeout(() => {
    modal.classList.remove("hidden");
    modal.scrollTo(0, 0);
  }, 800);


  document.querySelectorAll(".language-content").forEach(el => el.classList.add("hidden"));

  switch (language) {
    case 'python':
      openPythonStory();
      break;
    case 'java':
      openJavaStory();
      break;
    case 'cpp':
      openCPPStory();
      break;
    case 'php':
      openPHPStory();
      break;
    case 'matlab':
      openMatlabStory();
      break;
  }
}


function openPythonStory() {
  document.getElementById("python-content-py").classList.remove("hidden");

  document.getElementById("feedback-python").className = "question-feedback hidden";
  document.getElementById("feedback-python").innerText = "";

  document.getElementById("python-monty-img").classList.add("hidden");
  const logoInModal = document.getElementById("python-logo-py");
  logoInModal.src = "img/python_snake.png";
  logoInModal.alt = "Python Logo";
  logoInModal.classList.remove("fade-image", "visible");

  storyShown['python'] = false;
  document.getElementById("story-text").innerHTML = stories.python;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('python')");

}

function answerPythonQuestion(isYes) {
  const feedback = document.getElementById("feedback-python");

  if (isYes) {
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nope! Python was named after Monty Python’s Flying Circus.";
  } else {
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! It’s not the snake — it’s the comedy troupe.";
  }

  feedback.classList.remove("hidden");

  const logoInModal = document.getElementById("python-logo-py");
  logoInModal.classList.remove("visible");
  logoInModal.classList.add("fade-image");

  setTimeout(() => {
    logoInModal.src = "img/monty_python.png";
    logoInModal.alt = "Monty Python Comedy Troupe";

    requestAnimationFrame(() => {
      logoInModal.classList.add("visible");
    });
  }, 300);
}

function openJavaStory() {
  document.getElementById("java-content-jv").classList.remove("hidden");
  storyShown['java'] = false;
  document.getElementById("story-text").innerHTML = stories.java;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('java')");

  const oak = document.getElementById("oak-img-jv");
  const coffee = document.getElementById("coffee-img-jv");

  oak.className = "icon-item-jv";
  oak.classList.remove("roll-away-jv", "shake");

  coffee.className = "icon-item-jv hidden";

  const feedback = document.getElementById("feedback-jv");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";
}


function answerJavaQuestion(isYes) {
  const feedback = document.getElementById("feedback-jv");
  const oak = document.getElementById("oak-img-jv");
  const coffee = document.getElementById("coffee-img-jv");

  if (isYes) {
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! Java was originally called Oak.";

    oak.classList.remove("shake");
    void oak.offsetWidth;
    oak.classList.add("shake");

    setTimeout(() => {
      oak.classList.add("roll-away-jv");
    }, 1800);

  } else {
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Oops! That’s actually true — Java was called Oak.";

    oak.classList.remove("shake");
    void oak.offsetWidth;
    oak.classList.add("shake");
  }

  feedback.classList.remove("hidden");

  setTimeout(() => {
    coffee.className = "icon-item-jv slide-in-coffee-jv";
    void coffee.offsetWidth;
    coffee.classList.add("animate");
  }, 2600);
}



function openPHPStory() {
  document.getElementById("php-content-php").classList.remove("hidden");

  document.getElementById("php-text").className = "php-step-a";
  document.getElementById("php-text").innerText = "Personal Home Page";

  const feedback = document.getElementById("feedback-php");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";

  storyShown['php'] = false;
  document.getElementById("story-text").innerHTML = stories.php;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('php')");
}

function answerPHPQuestion(isYes) {
  const feedback = document.getElementById("feedback-php");
  const phpText = document.getElementById("php-text");

  if (isYes) {
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! PHP is a recursive acronym.";

    setTimeout(() => {
      fadeToPHPLetters();
      setTimeout(() => {
        startPHPAnimationLoop();
      }, 1600);
    }, 1000);


  } else {
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Oops! PHP actually is a recursive acronym.";

    phpText.classList.remove("shake");
    void phpText.offsetWidth;
    phpText.classList.add("shake");

    setTimeout(() => {
      startPHPAnimationLoop();
    }, 1000);
  }

  feedback.classList.remove("hidden");
}

function fadeToPHPLetters() {
  const phpText = document.getElementById("php-text");
  phpText.className = "php-step-a";

  phpText.innerHTML = `
    <span class="keep">P</span><span class="fade">e</span><span class="fade">r</span><span class="fade">s</span><span class="fade">o</span><span class="fade">n</span><span class="fade">a</span><span class="fade">l</span>
    &nbsp;
    <span class="keep">H</span><span class="fade">o</span><span class="fade">m</span><span class="fade">e</span>
    &nbsp;
    <span class="keep">P</span><span class="fade">a</span><span class="fade">g</span><span class="fade">e</span>
  `;

  const fades = phpText.querySelectorAll('.fade');
  fades.forEach((span, index) => {
    span.style.transition = "opacity 0.8s ease";
    span.style.opacity = "1";
    setTimeout(() => {
      span.style.opacity = "0";
    }, index * 50);
  });
}

let phpAnimationInterval = null;

function startPHPAnimationLoop() {
  const phpText = document.getElementById("php-text");

  if (phpAnimationInterval) {
    clearInterval(phpAnimationInterval);
  }

  const states = [
    { class: "php-step-b", text: "PHP" },
    {
      class: "php-step-c",
      html: `
      <span class="keep">P</span><span id="php-hp" class="fade-part">HP:</span><span class="keep">H</span><span id="php-yp" class="fade-part">ypertext</span><span class="keep"> P</span><span id="php-rp" class="fade-part">reprocessor</span>
      `
    },
    {
      class: "php-step-d",
      html: `
      <span class="keep">P</span><span id="php-hp" class="fade-part">HP:</span><span class="keep">H</span><span id="php-yp" class="fade-part">ypertext</span><span class="keep"> P</span><span id="php-rp" class="fade-part">reprocessor</span>
      `
    }
  ];


  let current = 0;

  const state = states[0];
  phpText.className = state.class;
  phpText.innerHTML = state.html || state.text;

  phpAnimationInterval = setInterval(() => {
    const state = states[current];
    phpText.className = state.class;
    phpText.innerHTML = state.html || state.text;

    if (state.class === "php-step-d") {
      ["php-hp", "php-yp", "php-rp"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = "0";
      });
    }

    if (state.class === "php-step-c") {
      ["php-hp", "php-yp", "php-rp"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = "1";
      });
    }


    current = (current + 1) % states.length;
  }, 2000);



}

function openCPPStory() {
  document.getElementById("cpp-content-cpp").classList.remove("hidden");

  const feedback = document.getElementById("feedback-cpp");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";

  storyShown['cpp'] = false;
  document.getElementById("story-text").innerHTML = stories.cpp;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('cpp')");
}


function answerCPPQuestion(isYes) {
  const feedback = document.getElementById("feedback-cpp");

  if (isYes) {
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! C came right after B.";
  } else {
    const clock = document.getElementById("cpp-clock-face");
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nope! B came before C — it's just the next letter.";

    clock.classList.remove("shake");
    void clock.offsetWidth;
    clock.classList.add("shake");
  }

  feedback.classList.remove("hidden");
}


function openMatlabStory() {
  document.getElementById("matlab-content-mt").classList.remove("hidden");

  // 重置反馈
  const feedback = document.getElementById("feedback-matlab");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";

  // 重置头像动画
  const matt = document.querySelector(".matt-img");
  matt.classList.remove("shake");

  storyShown['matlab'] = false;
  document.getElementById("story-text").innerHTML = stories.matlab;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('matlab')");

}

function answerMatlabQuestion(isYes) {
  const feedback = document.getElementById("feedback-matlab");
  const matt = document.querySelector(".matt-img");

  if (isYes) {
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nice try! But MATLAB stands for Matrix Laboratory.";

    matt.classList.remove("shake");
    void matt.offsetWidth;
    matt.classList.add("shake");

  } else {
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! It's short for Matrix Laboratory, not Matt's lab.";
  }

  feedback.classList.remove("hidden");
}


function closeModal() {
  document.getElementById("story-modal").classList.add("hidden");
  document.querySelectorAll(".planet").forEach(p => {
    p.classList.remove("planet--focused", "planet--dimmed");
  });
  document.querySelector(".planet-orbit").classList.remove("focused");
  if (phpAnimationInterval) {
    clearInterval(phpAnimationInterval);
    phpAnimationInterval = null;
  }
}


function toggleStory(language) {
  const isNowShown = !storyShown[language];

  Object.keys(storyShown).forEach(lang => {
    storyShown[lang] = false;
  });

  const text = document.getElementById("story-text");
  const btn = document.getElementById("toggle-btn");

  if (isNowShown) {
    storyShown[language] = true;
    text.innerHTML = stories[language];
    text.classList.remove("hidden");
    btn.innerText = "Hide Story";
  } else {
    text.classList.add("hidden");
    btn.innerText = "Show Story";
  }
}




window.addEventListener("load", () => {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: {
      color: "transparent"
    },
    particles: {
      number: {
        value: 280,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#ffffff", "#cceeff", "#88bbff"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.9,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
          sync: false
        }
      },
      size: {
        value: 2.5,
        random: true
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out"
        }
      }
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: ["bubble", "attract"]
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        attract: {
          distance: 150,
          duration: 0.4,
          speed: 1
        },
        bubble: {
          distance: 120,
          size: 4,
          duration: 2,
          opacity: 1
        },
        push: {
          quantity: 4
        }
      }
    },
    detectRetina: true
  });
  const planetContainers = document.querySelectorAll(".planet-container");
  const a = 220;
  const b = 140;

  planetContainers.forEach((container, index) => {
    const angle = (2 * Math.PI / planetContainers.length) * index;
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle);
    const z = 60 * Math.sin(angle);

    const scale = 1 + z / 300;
    container.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
  });


});
