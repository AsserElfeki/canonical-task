import { default as axios } from 'axios';


function createHeader(postTag) {
    const header = document.createElement('header');
    header.classList.add('p-card__header', 'u-no-margin--top');
    const category = document.createElement('h5');
    category.textContent = postTag;
    category.classList.add('p-muted-heading', 'u-no-margin--bottom', 'u-no-border--bottom');
    header.appendChild(category);

    return header
}

function createImage(postLink, thumbnailUrl) {

    const imageLink = document.createElement('a');
    imageLink.href = postLink;
    const image = document.createElement('img');
    image.classList.add('p-card-image');
    image.src = thumbnailUrl;
    image.alt = 'Thumbnail';
    image.loading = 'lazy';
    imageLink.appendChild(image);

    return imageLink
}

function createTitle(postTitle, postLink) {
    const title = document.createElement('h3');
    title.classList.add('p-headig--4');
    const titleLink = document.createElement('a');
    titleLink.href = postLink;
    titleLink.textContent = postTitle;
    title.appendChild(titleLink)

    return title
}

function createAuthor(authorName, authorLink, date) {
    const authorContainer = document.createElement('p');
    const author = document.createElement('em');
    const postDate = new Date(date)
    const formattedPostDate = postDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
    author.innerHTML = `By <a href = "${authorLink}">  ${authorName}</a>  on ${formattedPostDate}`;
    authorContainer.appendChild(author);

    return authorContainer
}

function createContent(authorName, authorLink, thumbnailUrl, postTitle, postLink, date) {
    const content = document.createElement('div');
    content.classList.add('post__content', 'p-card__content');

    //Image container
    content.appendChild(createImage(postLink, thumbnailUrl));

    //Title
    content.appendChild(createTitle(postTitle, postLink));

    //Author
    content.appendChild(createAuthor(authorName, authorLink, date));

    return content
}

function createFooter(postCategory) {
    const post_footer = document.createElement('p');
    post_footer.classList.add('p-card__footer', 'blog-p-card__footer');
    post_footer.textContent = postCategory;
    return post_footer;
}


// Function to create a card element
function createCard(postTitle, authorName, authorLink, thumbnailUrl, postCategory, postTag, postLink, date) {
    const card = document.createElement('div');
    card.classList.add('p-card', 'col-4', 'highlight');

    card.appendChild(createHeader(postTag));
    card.appendChild(createContent(authorName, authorLink, thumbnailUrl, postTitle, postLink, date))
    card.appendChild(createFooter(postCategory));

    return card;
}

// Function to populate the cards
function populateCards(data) {
    const cardContainer = document.getElementById('cardContainer');

    data.forEach(post => {
        const title = post.title.rendered;
        const authorName = post._embedded.author[0].name
        const authorLink = post._embedded["author"][0].link
        const thumbnailUrl = post.featured_media;
        const postCategory = post._embedded["wp:term"][0][0].name
        const postTag = post._embedded["wp:term"][1][0].name
        const postLink = post.link
        const date = post.date
        const card = createCard(title, authorName, authorLink, thumbnailUrl, postCategory, postTag, postLink, date);
        cardContainer.appendChild(card);
    });
}

// Make the AJAX request using Axios
axios.get('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(response => {
        const data = response.data;
        //console.log("data: " , response.data)
        populateCards(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });