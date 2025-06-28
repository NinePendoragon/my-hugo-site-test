window.addEventListener("DOMContentLoaded", () => {
  // ⬆ 回到顶部按钮
  const backBtn = document.createElement("button");
  backBtn.textContent = "⬆";
  backBtn.title = "回到顶部";
  backBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // 💬 跳转评论按钮
  const commentBtn = document.createElement("button");
  commentBtn.textContent = "💬";
  commentBtn.title = "查看评论";
  commentBtn.onclick = () => {
    const comment = document.getElementById("comments");
    if (comment) {
      comment.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("未找到评论区 #comments");
    }
  };

  // 放入容器
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
  `;
  [commentBtn, backBtn].forEach(btn => {
    btn.style.cssText = `
      padding: 8px 12px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      background-color: #ecb027;
      color: white;
      cursor: pointer;
      display: none;
    `;
    container.appendChild(btn);
  });

  document.body.appendChild(container);

  // 控制显示
  window.addEventListener("scroll", () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    container.childNodes.forEach(btn => {
      btn.style.display = scrolled > 50 ? "block" : "none";
    });
  });
});