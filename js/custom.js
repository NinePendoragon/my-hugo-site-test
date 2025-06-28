window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname   //获取路径
    // const path = window.location.pathname.replace(/\/$/,"");
    // const hideCommentButton = ["/", "/tags/", "/about/"].some(p => path.startsWith(p));
    // const showCommentButton = path === "/tags/" ? false :true;
    // const showCommentButton = !["/","/tags/"].includes(path);  //在[...]的路径下就返回false
    const hidePrefixes = ["/", "/tags/"];
    const showCommentButton = !hidePrefixes.some(p => path === p || path.startsWith("/tags/"));

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

  if(showCommentButton){  //判断是否显示跳转到评论按钮
    [commentBtn].forEach(btn => {
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
    }
  [backBtn].forEach(btn => {
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