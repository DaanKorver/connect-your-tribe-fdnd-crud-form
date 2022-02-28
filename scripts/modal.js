class modal {
  constructor() {
    this._modalEl = document.createElement('div')
  }

  init(heading, content, buttons) {
    this._modalEl.classList.add('modal-bg')

    const modalbox = document.createElement('div')
    modalbox.classList.add('modal')

    let buttonHTML = ''
    for (let i = 0; i < buttons.callbacks.length; i++) {
      const btn = document.createElement('button')
      btn.addEventListener('click', buttons.callbacks[i])
      buttonHTML += `<button>${buttons.texts[i]}</button>`
    }

    modalbox.insertAdjacentHTML('afterbegin', `
    
      <h2>${heading}</h2>
      <p>${content}</p>
      <div>${buttonHTML}</div>

    `)

    this._modalEl.insertAdjacentElement('afterbegin', modalbox)
    document.body.insertAdjacentElement('afterbegin', this._modalEl)
  }

}

export default new modal()