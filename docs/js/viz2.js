const stories = {
  python: `🐍 <strong>Python</strong> was named after the British comedy group <em>Monty Python’s Flying Circus</em>, not the snake! Its creator Guido van Rossum wanted a name that was short, unique, and fun.`,
  java: `☕ <strong>Java</strong> was named after <em>Java coffee</em> from the Indonesian island of Java. It was initially called Oak but renamed for trademark reasons.`,
  c: `💾 <strong>C</strong> was named as the successor to the B language, which came from BCPL. It’s simply the next letter in the alphabet.`,
  php: `🐘 <strong>PHP</strong> originally stood for "Personal Home Page", but it was later redefined as <em>PHP: Hypertext Preprocessor</em>, a recursive acronym.`,
  matlab: `📊 <strong>MATLAB</strong> stands for <em>MATrix LABoratory</em>, originally developed to provide easy access to matrix software for engineering applications.`
};

let selected = { snake: false, comedy: false };
let storyShown = {};

function openDoor(language) {
  const modal = document.getElementById("story-modal");
  modal.classList.remove("hidden");
  modal.scrollTo(0, 0);  // 🔸 自动滚到顶部

  document.querySelectorAll(".language-content").forEach(el => el.classList.add("hidden"));

  switch (language) {
    case 'python':
      openPythonStory();
      break;
    case 'java':
      openJavaStoryJv();
      break;
    case 'c':
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
  storyShown['python'] = false;
  document.getElementById("story-text").innerHTML = stories.python;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('python')");

}

function answerPythonQuestion(isYes) {
  const feedback = document.getElementById("feedback-python");
  const montyImg = document.getElementById("python-monty-img");

  if (isYes) {
    // ❌ 错误答案
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nope! Python was named after Monty Python’s Flying Circus.";
  } else {
    // ✅ 正确答案
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! It’s not the snake — it’s the comedy troupe.";
  }

  feedback.classList.remove("hidden");
  montyImg.classList.remove("hidden");
}

function openJavaStory() {
  document.getElementById("java-content-jv").classList.remove("hidden");
  storyShown['java'] = false;  // 显式初始化
  document.getElementById("story-text").innerHTML = stories.java;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('java')");


  // 初始化图标
  const acorn = document.getElementById("acorn-icon-jv");
  const tm = document.getElementById("tm-icon-jv");
  const coffee = document.getElementById("coffee-icon-jv");

  acorn.className = "icon-item-jv";
  acorn.innerText = "🌰";

  tm.className = "icon-item-jv hidden";
  tm.innerText = "™️";

  coffee.className = "icon-item-jv hidden";
  coffee.innerText = "☕";
  coffee.style.left = "200px";

  // 重置反馈区
  const feedback = document.getElementById("feedback-jv");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";
}

function answerJavaQuestion(isYes) {
  const feedback = document.getElementById("feedback-jv");
  const acorn = document.getElementById("acorn-icon-jv");

  if (isYes) {
    // ✅ 正确答案处理
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! Java was originally called Oak.";

    // 添加颤动动画
    acorn.classList.remove("shake");
    void acorn.offsetWidth; // 强制重新渲染，重新触发动画
    acorn.classList.add("shake");

    // 延迟播放后续动画
    setTimeout(() => {
      const tm = document.getElementById("tm-icon-jv");
      tm.className = "icon-item-jv cover-tm-jv";  // 手动设置完整 class
    }, 1000);


    setTimeout(() => {
      acorn.classList.add("roll-away-jv");
    }, 1800);

    setTimeout(() => {
      const coffee = document.getElementById("coffee-icon-jv");
      coffee.className = "icon-item-jv slide-in-coffee-jv"; // 清楚设置初始 class
      void coffee.offsetWidth; // 强制刷新
      coffee.classList.add("animate");
    }, 2600);


  } else {
    // ❌ 错误答案处理
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Oops! That’s actually true — Java was called Oak.";

    acorn.classList.remove("shake");
    void acorn.offsetWidth;
    acorn.classList.add("shake");
  }

  feedback.classList.remove("hidden");
}

function openPHPStory() {
  document.getElementById("php-content-php").classList.remove("hidden");

  // 初始化动画内容
  document.getElementById("php-text").className = "php-step-a";
  document.getElementById("php-text").innerText = "Personal Home Page";

  // 初始化反馈
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
    // ✅ 正确答案
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! PHP is a recursive acronym.";

    // 开始动画（从 A → B → C → D ...）
    setTimeout(() => {
      fadeToPHPLetters();  // Phase A → B 淡出
      setTimeout(() => {
        startPHPAnimationLoop();  // 然后进入循环 C → D → C ...
      }, 1600);
    }, 1000);


  } else {
    // ❌ 错误答案
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Oops! PHP actually *is* a recursive acronym.";

    phpText.classList.remove("shake");
    void phpText.offsetWidth;
    phpText.classList.add("shake");

    setTimeout(() => {
      startPHPAnimationLoop();
    }, 1000); // 1秒之后再进入循环动画
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
    }, index * 50); // 逐个淡出
  });
}

let phpAnimationInterval = null;

function startPHPAnimationLoop() {
  const phpText = document.getElementById("php-text");

  // 清除旧动画（防止多次点击叠加）
  if (phpAnimationInterval) {
    clearInterval(phpAnimationInterval);
  }

  // 状态切换列表
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

  // 首先从 A → B
  const state = states[0];
  phpText.className = state.class;
  phpText.innerHTML = state.html || state.text;

  // 每 2 秒轮换一次状态
  phpAnimationInterval = setInterval(() => {
    const state = states[current];
    phpText.className = state.class;
    phpText.innerHTML = state.html || state.text;

    // ✨ 加在这里：立即执行某些状态的附加逻辑
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
  document.getElementById("c-content-cpp").classList.remove("hidden");

  // 初始化指针状态（指向 B，即 30deg）
  const hand = document.getElementById("cpp-hand");
  hand.style.transform = "rotate(30deg)";

  // 清空反馈
  const feedback = document.getElementById("feedback-cpp");
  feedback.className = "question-feedback hidden";
  feedback.innerText = "";

  storyShown['c'] = false;
  document.getElementById("story-text").innerHTML = stories.c;
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("toggle-btn").setAttribute("onclick", "toggleStory('c')");

}

function answerCPPQuestion(isYes) {
  const hand = document.getElementById("cpp-hand");
  const feedback = document.getElementById("feedback-cpp");

  if (isYes) {
    // ✅ 正确答案：指针转向 C（60deg）
    hand.style.transform = "rotate(60deg)";
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! C came right after B.";
  } else {
    // ❌ 错误答案：表盘抖一抖
    const clock = document.getElementById("cpp-clock-face");
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nope! B came before C — it's just the next letter.";

    // 抖动动画
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
    // ❌ 错误答案：头像抖动
    feedback.className = "question-feedback incorrect";
    feedback.innerText = "Nice try! But MATLAB stands for Matrix Laboratory.";

    matt.classList.remove("shake");
    void matt.offsetWidth;
    matt.classList.add("shake");

  } else {
    // ✅ 正确答案
    feedback.className = "question-feedback correct";
    feedback.innerText = "Correct! It's short for Matrix Laboratory, not Matt's lab.";
  }

  feedback.classList.remove("hidden");
}


function closeModal() {
  document.getElementById("story-modal").classList.add("hidden");
  if (phpAnimationInterval) {
  clearInterval(phpAnimationInterval);
  phpAnimationInterval = null;
}

}

function toggleStory(language) {
  storyShown[language] = !storyShown[language];
  const text = document.getElementById("story-text");
  const btn = document.getElementById("toggle-btn");
  text.classList.toggle("hidden", !storyShown[language]);
  btn.innerText = storyShown[language] ? "Hide Story" : "Show Story";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("story-modal");
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});


window.addEventListener("load", () => {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: {
      color: "transparent"
    },
    particles: {
      number: {
        value: 700,
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
        value: 0.6,
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
        direction: "none", // ✅ 不指定方向，配合 straight:false 和 random:true 模拟银河盘旋
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
          mode: ["bubble", "attract"]  // ✅ 鼠标悬停发光 + 吸引
        },
        onclick: {
          enable: true,
          mode: "push" // ✅ 点击添加星星
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
          quantity: 4 // 每次点击生成 4 颗星
        }
      }
    },
    detectRetina: true
  });
});


const planets = document.querySelectorAll('.planet');
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2 + 20; // 可调视觉中心高度
const radiusX = 260;  // 横向半径
const radiusY = 80;   // 纵向压缩，制造椭圆感
const maxScale = 1.2;
const minScale = 0.6;

planets.forEach((planet, index) => {
  const angleOffset = (360 / planets.length) * index;
  animatePlanet(planet, angleOffset);
});

function animatePlanet(planet, initialAngle) {
  let angle = initialAngle;

  function update() {
    const rad = angle * Math.PI / 180;

    // 👇 椭圆轨道位置（x/y），仿 3D 投影
    const x = centerX + radiusX * Math.cos(rad);
    const y = centerY + radiusY * Math.sin(rad); // 垂直方向压缩

    // 👇 使用 sin 值映射到缩放（前近后远）
    const scale = minScale + (maxScale - minScale) * (Math.sin(rad) + 1) / 2;

    // 👇 模拟透明度远近感
    const opacity = 0.4 + 0.6 * ((scale - minScale) / (maxScale - minScale));

    // 👇 设置 transform 和视觉层级
    planet.style.transform = `translate(${x - 40}px, ${y - 40}px) scale(${scale})`;
    planet.style.opacity = opacity;
    planet.style.zIndex = Math.round(scale * 100);

    angle = (angle + 0.3) % 360;
    requestAnimationFrame(update);
  }

  update();
}
