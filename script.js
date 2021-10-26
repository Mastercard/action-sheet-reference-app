;(function () {
  const checkoutButton = document.getElementById('checkoutButton')
  const checkoutIframe = document.getElementById('checkoutIframe')
  const iframeContainer = document.getElementById('iframeContainer')
  const iframeBackground = document.getElementById('iframeBackground')

  // call SRC SDK checkout() method when checkout button is clicked
  checkoutButton.addEventListener('click', async () => {
    checkoutIframe.addEventListener('load', showCheckoutIframe, { once: true })

    try {
      // Start checkout by loading SRC/DCF and displaying in iframe
      await checkout({ windowRef: checkoutIframe })
    } catch (error) {
      console.error(error)
    } finally {
      // At this point checkout has finished, so dismiss iframe
      dismissCheckoutIframe()
    }
  })

  // clicking the iframe background dismisses the iframe
  iframeBackground.addEventListener('click', dismissCheckoutIframe)

  function showCheckoutIframe() {
    iframeContainer.classList.add('show')
    document.body.classList.add('modal-visible')
  }

  function dismissCheckoutIframe() {
    iframeContainer.classList.remove('show')
    document.body.classList.remove('modal-visible')
  }

  /****************************************************************************************/
  /** MOCK SRC SDK below here -- code would NOT be duplicated in merchant implementation **/
  /****************************************************************************************/

  // mock SRC SDK checkout method
  function checkout({ windowRef }) {
    return new Promise((resolve) => {
      window.addEventListener('message', ({ data }) => {
        if (data === 'CHECKOUT_COMPLETE') resolve()
      })
      // simulate SRC checkout method loading SRCi/DCF in to windowRef (iframe)
      windowRef.setAttribute('src', '/mock-srci.html')
    })
  }
})()
