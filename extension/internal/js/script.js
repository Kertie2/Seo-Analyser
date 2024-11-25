document.getElementById("analyze-btn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: analyzeSEO,
      },
      (results) => {
        document.getElementById("results").innerHTML = results[0].result;
      }
    );
  });
  
  function analyzeSEO() {
    const metaTags = document.querySelectorAll("meta");
    const h1 = document.querySelector("h1")?.innerText || "Aucun H1 trouvé";
  
    // Analyse des balises Meta
    let metaInfo = "<h2>Balises Meta</h2>";
    metaTags.forEach((tag) => {
      if (tag.name) {
        metaInfo += `<p>${tag.name}: ${tag.content}</p>`;
      }
    });
  
    // Analyse des performances
    const timing = performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
  
    const performanceInfo = `
      <h2>Performances</h2>
      <p>Temps de chargement complet : ${pageLoadTime} ms</p>
      <p>Temps pour DOM Content Loaded : ${domContentLoadedTime} ms</p>
    `;
  
    return `<h2>Analyse de la page</h2>
      <p>H1: ${h1}</p>
      ${metaInfo}
      ${performanceInfo}`;
  }
  
