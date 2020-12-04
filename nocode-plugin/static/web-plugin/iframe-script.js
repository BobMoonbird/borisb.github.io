function initModal() {
  document.getElementById("baseInputMdButtonSubmit").onclick = () => {
    miro.board.ui.closeModal({ shouldAdd: true });
  };

  document.getElementById("baseInputMdButtonCancel").onclick = () => {
    miro.board.ui.closeModal({ shouldAdd: false });
  };
}

initModal();
