// index.js

// Callbacks
const handleClick = (event) => {
  const id = event.target.dataset.id;
  fetch(`http://localhost:3000/ramens/${id}`)
    .then((response) => response.json())
    .then((ramen) => {
      const detailDiv = document.querySelector("#ramen-detail");
      detailDiv.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}">
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">Restaurant: ${ramen.restaurant}</h3>
        <p>Rating: <span id="rating-display">${ramen.rating}</span></p>
        <p>Comment: <span id="comment-display">${ramen.comment}</span></p>
        <button id="delete">Delete</button>
      `;
      document
        .querySelector("#delete")
        .addEventListener("click", () => deleteRamen(id));
    });
};

const deleteRamen = (id) => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "DELETE",
  }).then(() => {
    document.querySelector(`img[data-id='${id}']`).remove();
    document.querySelector("#ramen-detail").innerHTML = "";
  });
};

const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      image: event.target.image.value,
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      rating: event.target.rating.value,
      comment: event.target["new-comment"].value,
    };
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRamen),
    })
      .then((response) => response.json())
      .then((ramen) => {
        const ramenMenu = document.querySelector("#ramen-menu");
        const img = document.createElement("img");
        img.src = ramen.image;
        img.dataset.id = ramen.id;
        img.addEventListener("click", handleClick);
        ramenMenu.appendChild(img);
        // Reset the form
        form.reset();
      });
  });
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.querySelector("#ramen-menu");
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.dataset.id = ramen.id;
        img.addEventListener("click", handleClick);
        ramenMenu.appendChild(img);
      });
      if (ramens.length > 0) {
        handleClick({ target: ramenMenu.querySelector("img") });
      }
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
