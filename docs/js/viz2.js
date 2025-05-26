const stories = {
  python: `🐍 <strong>Python</strong> was named after the British comedy group <em>Monty Python’s Flying Circus</em>, not the snake! Its creator Guido van Rossum wanted a name that was short, unique, and fun.`,
  java: `☕ <strong>Java</strong> was named after <em>Java coffee</em> from the Indonesian island of Java. It was initially called Oak but renamed for trademark reasons.`,
  c: `💾 <strong>C</strong> was named as the successor to the B language, which came from BCPL. It’s simply the next letter in the alphabet.`,
  php: `🐘 <strong>PHP</strong> originally stood for "Personal Home Page", but it was later redefined as <em>PHP: Hypertext Preprocessor</em>, a recursive acronym.`,
  matlab: `📊 <strong>MATLAB</strong> stands for <em>MATrix LABoratory</em>, originally developed to provide easy access to matrix software for engineering applications.`
};

let selected = { snake: false, comedy: false };
let storyShown = false;

function openDoor(language) {
  document.getElementById("story-modal").classList.remove("hidden");
  document.querySelectorAll(".language-content").forEach(el => el.classList.add("hidden"));

  switch (language) {
    case 'python':
      openPythonStory();
      break;
    case 'java':
      openJavaStoryJv();
      break;
    // case 'c': openCStory(); break;
    case 'php':
      openPHPStory();
      break;
    // case 'matlab': openMatlabStory(); break;
  }
}

function openPythonStory() {
  document.getElementById("python-content-py").classList.remove("hidden");
  selected = { snake: false, comedy: false };
  storyShown = false;

  document.getElementById("snake-symbol-py").innerText = "";
  document.getElementById("comedy-symbol-py").innerText = "";
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("story-text").innerHTML = stories.python;
}

function selectSymbolPython(which) {
  let symbolId = which === 'snake' ? "snake-symbol-py" : "comedy-symbol-py";
  selected[which] = true;
  document.getElementById(symbolId).innerText = which === 'snake' ? "❌" : "✅";
  const el = document.getElementById(symbolId);
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}

function openJavaStoryJv() {
  document.getElementById("java-content-jv").classList.remove("hidden");
  storyShown = false;

  // 清除文字区域
  document.getElementById("story-text").classList.add("hidden");
  document.getElementById("toggle-btn").innerText = "Show Story";
  document.getElementById("story-text").innerHTML = stories.java;


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


function closeModal() {
  document.getElementById("story-modal").classList.add("hidden");
}

function toggleStory() {
  storyShown = !storyShown;
  const text = document.getElementById("story-text");
  const btn = document.getElementById("toggle-btn");
  text.classList.toggle("hidden", !storyShown);
  btn.innerText = storyShown ? "Hide Story" : "Show Story";
}
