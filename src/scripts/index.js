import { users, posts, suggestUsers } from "./database.js"

function renderPosts(array) {
    const postList = document.querySelector('.post__list');
    const postModal = document.querySelector('.post__modal');

    array.forEach(post => {
        const postItem = document.createElement('li');
        postItem.classList.add('post-item');

        const postCard = document.createElement('div');
        postCard.classList.add('post-card');

        const userImg = document.createElement('img');
        userImg.classList.add('user-img');
        userImg.src = post.img;

        const userContent = document.createElement('div');
        userContent.classList.add('user-content');

        const userName = document.createElement('p');
        userName.classList.add('user-name');
        userName.innerText = post.user;

        const userStack = document.createElement('p');
        userStack.classList.add('user-stack');
        userStack.innerText = post.stack;

        const postContent = document.createElement('div');
        postContent.classList.add('post-content');

        const postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.innerText = post.title;

        const postDescription = document.createElement('p');
        postDescription.classList.add('post-description');
        postDescription.innerText = `${post.text.substring(0, 150)}...`;

        const postButton = document.createElement('div');
        postButton.classList.add('post-button');

        const postOpen = document.createElement('button');
        postOpen.classList.add('post-open');
        postOpen.innerText = 'Abrir Post';
        postOpen.setAttribute('data-id', post.id);
        postOpen.addEventListener('click', () => {
            const modal = createModal(post);
            openModal(modal);
            postModal.appendChild(modal);
        });

        const postLike = document.createElement('div');
        postLike.classList.add('post-like');

        const postSpan = document.createElement('span');
        postSpan.classList.add('post-span', 'button-like');
        postSpan.innerHTML = '<img src="./src/assets/img/like.svg" alt="curtir">';
        postSpan.addEventListener('click', () => {
            postSpan.classList.toggle('liked');
            if (postSpan.classList.contains('liked')) {
                postSpan.innerHTML = '<img src="./src/assets/img/like.svg" alt="Botão de curtido">';
                post.likes++;
            } else {
                postSpan.innerHTML = '<img src="./src/assets/img/liked.svg" alt="Botão de curtir">';
                post.likes--;
            }
            postLikes.innerText = post.likes;
        });

        const postLikes = document.createElement('p');
        postLikes.innerText = post.likes;

        postLike.append(postSpan, postLikes);
        postButton.append(postOpen, postLike);
        postContent.append(postTitle, postDescription, postButton);
        userContent.append(userName, userStack);
        postCard.append(userImg, userContent);
        postItem.append(postCard, postContent);
        postList.append(postItem);
    });

    return postList;
}

renderPosts(posts);

function createModal(post) {
    let postModal = document.querySelector('.post__modal');
    const modalContainer = document.createElement('div');

    modalContainer.classList.add('modal__style');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');

    const userElement = document.createElement('div');
    userElement.classList.add('user__element');

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal__img');

    const modalUser = document.createElement('div');
    modalUser.classList.add('modal__user');

    const modalName = document.createElement('p');
    modalName.classList.add('modal__name');

    const modalStack = document.createElement('p');
    modalStack.classList.add('modal__stack');

    const modalClose = document.createElement('button');
    modalClose.classList.add('modal__close');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal__title');

    const modalDescription = document.createElement('p');
    modalDescription.classList.add('modal__description');

    modalImg.src = post.img;
    modalName.textContent = post.user;
    modalStack.textContent = post.stack;
    modalTitle.textContent = post.title;
    modalDescription.textContent = post.text;
    modalClose.textContent = 'X';
    modalClose.addEventListener('click', () => {
        closeModal(postModal);
        postModal.innerHTML = '';
    });

    userElement.append(modalImg, modalUser);
    modalHeader.append(userElement, modalClose);
    modalUser.append(modalName, modalStack);
    modalContent.append(modalTitle, modalDescription);
    modalContainer.append(modalHeader, modalContent);
    postModal.innerHTML = '';
    postModal.appendChild(modalContainer);

    return postModal;
}

const openModal = (modal) => modal.showModal();

const closeModal = (modal) => modal.close();

function addNewPost() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleInput = form.querySelector('.container__input--title');
        const descriptionInput = form.querySelector('.container__input--description');
        const nameContainer = form.querySelector('.container__name');
        const stackContainer = form.querySelector('.container__stack');
        const imgContainer = form.querySelector('.container__user--img');

        const title = titleInput.value;
        const description = descriptionInput.value;
        const user = nameContainer.textContent;
        const stack = stackContainer.textContent;
        const img = imgContainer.src;

        const newPost = {
            title,
            text: description,
            user,
            stack,
            img,
            likes: 0,
        };
        posts.unshift(newPost);

        titleInput.value = '';
        descriptionInput.value = '';

        const postsList = document.querySelector('.post__list');
        postsList.innerHTML = '';
        renderPosts(posts);
    });
}

addNewPost();

function renderSuggest(array) {
    const suggestions = document.querySelector('.sugges__list');

    array.forEach((user) => {
        const userList = document.createElement('li');
        userList.classList.add('sugges__list--item');

        const userContent = document.createElement('div');
        userContent.classList.add('sugges__list--content');

        const userImg = document.createElement('img');
        userImg.classList.add('sugges__list--img');

        const nameStack = document.createElement('div');
        nameStack.classList.add('sugges__list--nameStack');

        const name = document.createElement('p');
        name.classList.add('sugges__list--name');

        const stack = document.createElement('p');
        stack.classList.add('sugges__list--stack');

        const follow = document.createElement('button');
        follow.textContent = 'Follow';
        follow.classList.add('sugges__list--follow');
        follow.addEventListener('click', () => {
            follow.classList.toggle('btn__following');

            if (follow.classList.contains('btn__following')) {
                follow.textContent = 'Following';
            } else {
                follow.textContent = 'Follow';
            }
        });

        userImg.src = user.img;
        name.textContent = user.user;
        stack.textContent = user.stack;

        nameStack.append(name, stack);
        userContent.append(userImg, nameStack);
        userList.append(userContent, follow);
        suggestions.appendChild(userList);
    });
}

renderSuggest(suggestUsers);

function HeaderTransition() {
    const header = document.querySelector('header');
    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            // Rolar para cima
            header.style.transform = 'translateY(0)';
        } else {
            // Rolar para baixo
            header.style.transform = 'translateY(-100%)';
        }

        prevScrollPos = currentScrollPos;
    });
}

HeaderTransition()