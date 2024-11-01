// Function to show modal with a message
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
  
  // Inject Modal HTML into the document body
  document.body.insertAdjacentHTML('beforeend', `
    <div id="custom-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <p id="modal-message"></p>
      </div>
    </div>
  `);
  
  // Inject Modal Styles
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    #custom-modal.fade-out {
      animation: fadeOut 1s forwards;
    }
  
    @keyframes fadeOut {
      100% {
        opacity: 0;
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
