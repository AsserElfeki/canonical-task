// Function to create a card element
function createCard(title, authorName, thumbnailUrl, post_category, post_tag) {
    //container
    const card = document.createElement('div');
    card.className = 'card';

    //image
    const thumbnail = document.createElement('div');
    thumbnail.className = 'card__thumbnail';
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = thumbnailUrl;
    thumbnailImg.alt = 'Thumbnail';
    thumbnail.appendChild(thumbnailImg);

    //content
    const cardContent = document.createElement('div');
    cardContent.className = 'card__content';
    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;
    const author = document.createElement('p');
    author.textContent = authorName;
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(author);


    const category = document.createElement('h2');
    category.textContent = post_category;
    const tag = document.createElement('p');
    tag.textContent = post_tag;
    cardContent.appendChild(category);
    cardContent.appendChild(tag);

    card.appendChild(thumbnail);
    card.appendChild(cardContent);

    return card;
}

// Function to populate the cards
function populateCards(data) {
    const cardContainer = document.getElementById('cardContainer');

    data.forEach(post => {
        const title = post.title.rendered;
        const authorName = post._embedded.author[0].name
        const thumbnailUrl = post.featured_media;
        const post_category = post._embedded["wp:term"][0][0].name
        const post_tag = post._embedded["wp:term"][1][0].name
        const card = createCard(title, authorName, thumbnailUrl, post_category, post_tag);
        cardContainer.appendChild(card);
    });
}

// Make the AJAX request using Axios
axios.get('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(response => {
        const data = response.data;
        //console.log("data: " , response.data)
        //console.log("a7eeh: ", data[2]._embedded['wp:term'][1][0].name)
        populateCards(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });