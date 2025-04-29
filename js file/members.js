async function gettingData() {
    try{
        const reponse = await fetch("https://openlibrary.org/search.json?q=book")
        const result = await reponse.json()
        console.log(result);
bookArragement(result)
        
    }catch(error){
        console.error('error', error)
    }
    
}
gettingData()
function bookArragement(result){
    console.log(result);
    
    result.docs.forEach((element) => {
let storydiv = document.createElement('div')
storydiv.innerHTML = `
<div class="card" style="width: 18rem;">
  <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" alt="">

  <div class="card-body">
    <h5 class="card-title">${element.author_name[0]}</h5>
    <p class="card-text">${element.language[0]}.</p>

    <a href="#" class="btn btn-primary">Read</a>
  </div>
</div>
`      

document.getElementById('stories').appendChild(storydiv)
    });
}
async function gettingData() {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=book");
        const result = await response.json();
        console.log(result);
        displayRandomImages(result.docs); // Call the function to display random images
    } catch (error) {
        console.error('error', error);
    }
}

function displayRandomImages(data) {
    // Shuffle the array and pick the first 5 items
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const container = document.getElementById('stories');
    container.innerHTML = ''; // Clear previous content

    selected.forEach((element) => {
        let storydiv = document.createElement('div');
        storydiv.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${element.cover_i ? `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg` : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${element.title || 'No Title'}">
                <div class="card-body">
                    <h5 class="card-title">${element.title || 'No Title Available'}</h5>
                    <p class="card-text">${element.author_name ? `Author: ${element.author_name.join(', ')}` : 'Author: Unknown'}</p>
                    <a href="https://openlibrary.org${element.key}" class="btn btn-primary" target="_blank">View Book</a>
                </div>
            </div>
        `;
        container.appendChild(storydiv);
    });
}

gettingData();