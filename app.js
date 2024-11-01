console.log('Ecommerce project is running!');

// Update Cart Count on the Cart Icon
function updateCartCount() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  } else {
    console.warn("Cart count element not found");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  toggleCheckoutButton();

  // Show modal with message
  function showModal(message) {
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('fade-out');
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
      }, 1000);
    }, 2000);
  }

  // Handle adding items to the cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const product = e.target.closest('.product');
      const productId = product.getAttribute('data-id');
      const productPrice = parseFloat(product.getAttribute('data-price'));
      const productName = product.querySelector('h3').textContent;

      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
      }

      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      toggleCheckoutButton();
      showModal('Product added to cart!');
    });
  });

  // Handle adding items to the wishlist
  document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', (e) => {
      const product = e.target.closest('.product');
      const productId = product.getAttribute('data-id');
      const productPrice = parseFloat(product.getAttribute('data-price'));
      const productName = product.querySelector('h3').textContent;

      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const existingItem = wishlist.find(item => item.id === productId);
      if (!existingItem) {
        wishlist.push({ id: productId, name: productName, price: productPrice });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showModal('Product added to wishlist!');
      } else {
        showModal('Product is already in your wishlist!');
      }
    });
  });

  // Update cart items on the cart page
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let total = 0;

    if (cartItems) {
      cartItems.innerHTML = '';
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button class="increase-quantity">+</button>
          <span class="quantity">${item.quantity || 1}</span>
          <button class="decrease-quantity">-</button>
          <button class="remove-item">Remove</button>
        `;

        li.querySelector('.increase-quantity').addEventListener('click', () => {
          item.quantity += 1;
          saveCart(cart);
          updateCart();
          updateCartCount();
          toggleCheckoutButton();
        });

        li.querySelector('.decrease-quantity').addEventListener('click', () => {
          if (item.quantity > 1) {
            item.quantity--;
          }
          saveCart(cart);
          updateCart();
          updateCartCount();
          toggleCheckoutButton();
        });

        li.querySelector('.remove-item').addEventListener('click', () => {
          cart.splice(index, 1);
          saveCart(cart);
          updateCart();
          updateCartCount();
          toggleCheckoutButton();
        });

        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });

      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  if (document.getElementById('cart-items')) {
    updateCart();
  }

  // Handle checkout button click
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  // Save order to localStorage after payment
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

      if (cart.length === 0) {
        showModal("Your cart is empty. Add items to your cart before proceeding.");
        return;
      }

      const newOrder = {
        date: new Date().toLocaleDateString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      orderHistory.push(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      sessionStorage.setItem('cart', JSON.stringify([])); // Clear the cart
      showModal("Payment processed successfully!");

      setTimeout(() => {
        window.location.href = 'confirmation.html';
      }, 3000);
    });
  }

  // Display order history on order-history.html
  const orderHistoryList = document.getElementById('order-history');
  if (orderHistoryList) {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    if (orderHistory.length > 0) {
      orderHistory.forEach(order => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>Order from ${order.date}</h3>
          <ul>
            ${order.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity || 1}</li>`).join('')}
          </ul>
          <p>Total: $${order.total.toFixed(2)}</p>
        `;
        orderHistoryList.appendChild(li);
      });
    } else {
      document.getElementById('no-orders').style.display = 'block';
    }
  }
  // Load comments from local storage
    // Determine Product ID for Dynamic Comments
    const productSection = document.querySelector('.product');
    const productId = productSection ? productSection.getAttribute('data-id') : null;
    const commentStorageKey = `comments-product-${productId}`;

 // Load comments from localStorage based on Product ID
  function loadComments() {
    const comments = JSON.parse(localStorage.getItem(commentStorageKey)) || [];
    const commentList = document.getElementById('comment-list');
    if(commentList){
    commentList.innerHTML = '';  // Clear any existing comments

    comments.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }
  }

  // Handle comment submission for each product
  const submitCommentButton = document.getElementById('submit-comment');
  if (submitCommentButton) {
    submitCommentButton.addEventListener('click', () => {
      const commentInput = document.getElementById('comment-input');
      const comment = commentInput.value.trim();

      if (comment) {
        const comments = JSON.parse(localStorage.getItem(commentStorageKey)) || [];
        comments.push(comment);
        localStorage.setItem(commentStorageKey, JSON.stringify(comments));
        
        loadComments();  // Refresh comments display
        commentInput.value = '';  // Clear the input field after submission
      }
    });
  }
  function toggleCheckoutButton() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('disabled'); // Add styling class
      } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('disabled');
      }
    }
  }
  // Load comments when page loads
  loadComments();
    // Ensure checkout button is enabled/disabled based on cart on each page load
    toggleCheckoutButton();
});
