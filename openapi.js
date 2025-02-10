document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the Art Institute of Chicago API
    fetchArtwork();
  });
  
  function fetchArtwork() {
    fetch('https://api.artic.edu/api/v1/artworks')
      .then(response => response.json())
      .then(data => {
        // Display artwork data in the HTML
        const artworkDiv = document.getElementById('artwork');
        const artistDiv = document.getElementById('artist');
        
        // Example: Grab the first artwork and its artist
        const firstArtwork = data.data[0];
        const artworkTitle = firstArtwork.title;
        const artworkImage = `https://www.artic.edu/iiif/2/${firstArtwork.image_id}/full/843,/0/default.jpg`;
  
        // Use the artwork title and image to display
        artworkDiv.innerHTML = `
          <h2>${artworkTitle}</h2>
          <img src="${artworkImage}" alt="${artworkTitle}">
        `;
  
        // Now fetch the artist info for the first artwork
        const artistId = firstArtwork.artist_id;
        fetchArtist(artistId);
      })
      .catch(error => console.error('Error fetching artwork data:', error));
  }
  
  function fetchArtist(artistId) {
    fetch(`https://api.artic.edu/api/v1/artists/${artistId}`)
      .then(response => response.json())
      .then(data => {
        const artistDiv = document.getElementById('artist');
        const artistName = data.data.name;
        const artistBiography = data.data.biography;
  
        artistDiv.innerHTML = `
          <h3>Artist: ${artistName}</h3>
          <p>${artistBiography}</p>
        `;
      })
      .catch(error => console.error('Error fetching artist data:', error));
      
  }