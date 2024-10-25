const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxwtABP2ctSCcqTP1abdG_8Ugr8UbjRekzqQn645Q5aEqotBL4S1w7xvqVkpFQxk5HQ/exec";

async function fetchReleases() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Unexpected response:", text);
            throw new Error("Received non-JSON response");
        }

        const releases = await response.json();
        console.log("Releases:", releases);
        displayReleases(releases);
    } catch (error) {
        console.error("Failed to fetch releases:", error);
    }
}

function displayReleases(releases) {
    const releasesContainer = document.getElementById("releases-container");

    releases.forEach(release => {
        const releaseElement = document.createElement("div");
        releaseElement.classList.add("release");

        // You can customize the layout here
        releaseElement.innerHTML = `
            <h3>${release["Track Title"]}</h3>
            <p>Artist: ${release.Artist}</p>
            <p>Album: ${release.Album}</p>
            <p>Label Code: ${release["Label Code"]}</p>
            <p>Release Date: ${new Date(release["Release Date"]).toLocaleDateString()}</p>
            <p>Price: $${release.Price}</p>
            <a href="${release["Track URL"]}" target="_blank">Listen to Track</a>
            <img src="${release["Cover Art URL"]}" alt="Cover Art" width="200"/>
        `;

        releasesContainer.appendChild(releaseElement);
    });
}

fetchReleases();
