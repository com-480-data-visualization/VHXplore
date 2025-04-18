const stories = {
    python: `🐍 <strong>Python</strong> was named after the British comedy group <em>Monty Python’s Flying Circus</em>, not the snake! Its creator Guido van Rossum wanted a name that was short, unique, and fun.`,
    java: `☕ <strong>Java</strong> was named after <em>Java coffee</em> from the Indonesian island of Java. It was initially called Oak but renamed for trademark reasons.`,
    c: `💾 <strong>C</strong> was named as the successor to the B language, which came from BCPL. It’s simply the next letter in the alphabet.`,
    php: `🐘 <strong>PHP</strong> originally stood for "Personal Home Page", but it was later redefined as <em>PHP: Hypertext Preprocessor</em>, a recursive acronym.`,
    matlab: `📊 <strong>MATLAB</strong> stands for <em>MATrix LABoratory</em>, originally developed to provide easy access to matrix software for engineering applications.`,
  };
  
  let selected = {
    snake: false,
    comedy: false,
  };
  let storyShown = false;
  
  function openDoor(language) {
    if (language !== 'python') return;
    document.getElementById("story-modal").classList.remove("hidden");
  
    // 初始化状态
    document.getElementById("snake-symbol").innerText = "";
    document.getElementById("comedy-symbol").innerText = "";
    document.getElementById("story-text").classList.add("hidden");
    document.getElementById("toggle-btn").innerText = "Show Story";
    selected.snake = false;
    selected.comedy = false;
    storyShown = false;
  
    document.getElementById("story-text").innerHTML = `
      🐍 <strong>Python</strong> was named after the British comedy group <em>Monty Python’s Flying Circus</em>, not the snake!
      Its creator Guido van Rossum was reading the published scripts from this comedy group and thought that he needed a name that was short, unique, and slightly mysterious, so he decided to call the language <strong>Python</strong>.
    `;
  }
  
  function closeModal() {
    document.getElementById("story-modal").classList.add("hidden");
  }
  
  function selectSymbol(which) {
    let symbolId = "";
    if (which === 'snake') {
      selected.snake = true;
      symbolId = "snake-symbol";
      document.getElementById(symbolId).innerText = "❌";
    } else if (which === 'comedy') {
      selected.comedy = true;
      symbolId = "comedy-symbol";
      document.getElementById(symbolId).innerText = "✅";
    }
  
    const el = document.getElementById(symbolId);
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }
  
  
  function toggleStory() {
    storyShown = !storyShown;
    const text = document.getElementById("story-text");
    const btn = document.getElementById("toggle-btn");
    if (storyShown) {
      text.classList.remove("hidden");
      btn.innerText = "Hide Story";
    } else {
      text.classList.add("hidden");
      btn.innerText = "Show Story";
    }
  }
  