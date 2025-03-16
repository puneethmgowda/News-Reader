const API_KEY = "d5536ac9915448798617c2d3a7e9d7d6";  // Your NewsAPI key

async function fetchNews() {
    let topic = document.getElementById("searchInput").value;
    let newsContainer = document.getElementById("newsContainer");
    
    if (topic === "") {
        alert("Please enter a topic!");
        return;
    }

    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        newsContainer.innerHTML = ""; // Clear previous news

        if (data.articles.length === 0) {
            newsContainer.innerHTML = "<p>No news found. Try another topic.</p>";
            return;
        }

        data.articles.slice(0, 6).forEach(article => { // Display only 6 articles
            let newsCard = document.createElement("div");
            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p>Something went wrong. Please try again.</p>";
    }
}
