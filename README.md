# Action Sheet Reference Implementation

## Table of Contents
- [Overview](#overview)
- [Supported Functionality](#supported-fucntionality)
- [Frameworks/Libraries](#frameworks)
- [Required Development](#required-development)
- [Supported Browsers](#supported-browsers)
- [Support](#support)
- [License](#license)

## Overview  <a name="overview"></a>
This is a reference application for Action Sheet UI support for Mastercard SRCI - Embedded Flows (3rd Party SRCI & Mastercard SRCI).

## Supported Functionality  <a name="supported-fucntionality"></a>

- Demonstrate a slide up DCF experience on mobile devices
- Demonstrate slide left or right Mastercard SRCi on desktop
- Display overlay on checkout - overlay should prevent stacked viewport scrolling issues (overscroll-behavior: contain)
- Provide styling that handles
   - iframe style (i.e. rounded corners for slide-up)
   - hide iframe by default (position off-screen at location to be animated from)
   - animation of iframe in to viewport (triggered by iframe 'load' event)
   - media queries within styling to determine slide-up/in variant
- Trigger iframe animation in to viewport (e.g. add CSS class to iframe) based on iframe 'load' event
- Hide iframe after checkout
- Hide overlay after checkout

## Frameworks/Libraries <a name="frameworks"></a>

- Uses HTML5, CSS3, and JS only (ECMAScript 2016)

## Required Development <a name="required-development"></a>

The reference application contains below sections -

### index.html 
- Add checkout button in checkout container
- Add support iframe/embedded mode in iframe container
```
  <div class="iframe-foreground">
     <iframe class="iframe-checkout" id="checkoutIframe" name="checkout-iframe"></iframe>
   </div>
```
**Note:** In real case scenario, the iframe container will be embedded where the checkout needs to be performed.

### script.js file

- Get the reference of the elements defined in **index.html**
    ```
    const checkoutButton = document.getElementById('checkoutButton')
    const checkoutIframe = document.getElementById('checkoutIframe')
    const iframeContainer = document.getElementById('iframeContainer')
    const iframeBackground = document.getElementById('iframeBackground')
    ```
- **SRC SDK checkout() method**
  
  - Call the checkout() method when checkout button is clicked 
    ```
     checkoutButton.addEventListener('click', async () => {
     });
     ```
  - Start checkout by loading SRC/DCF and displaying in iframe
    ```
    await checkout({ windowRef: checkoutIframe })
    ```
  - Mock SRC SDK checkout method
    ````
    window.addEventListener('message', ({ data }) => {
    if (data === 'CHECKOUT_COMPLETE') resolve()
    })
    ````
  - Simulate SRC checkout method loading SRCi/DCF in to windowRef (iframe)
     ```
     windowRef.setAttribute('src', '/mock-srci.html')
    ```

- **Display/Dismiss iframe**
  
    - Show the iframe once checkout is called
      
      ```
       checkoutIframe.addEventListener('load', showCheckoutIframe, { once: true })
      ```
      ```
       iframeContainer.classList.add('show')
       document.body.classList.add('modal-visible')
       ```
            
    - Dismiss the iframe after checkout is finished and clicking the iframe background also dismisses the iframe

        ```
         iframeBackground.addEventListener('click', dismissCheckoutIframe)
         ```
        
        ```
        iframeContainer.classList.remove('show')
        document.body.classList.remove('modal-visible')
        ```
      
### mock-srci.html
 - Add **Complete Checkout** button
   ```
   <button type="button" id="checkoutCompleteButton">COMPLETE CHECKOUT</button>
    ```

- On click of button **postMessage** is sent to parent window
  ```
   document.getElementById('checkoutCompleteButton').addEventListener('click', () => {
   window.parent.postMessage('CHECKOUT_COMPLETE', '*')
   })
    ```
**Note:** In real case scenario,this will be an actual SRCi/DCF file.

### Run Application

Open index.html file on the browser to run the application.


## Supported Browsers <a name="supported-browsers"></a>

### Desktop browser support
- Chrome :	55 or later
- Safari :	10 or later
- Webkit :	602.1 or later
- Microsoft Edge :	15 or later
- Firefox :	63 or later

### Mobile browser support
- Android : 	v4.4+ API v19 and above
- iOS : 	v10+
- Chrome :	v63+
- Safari :	v11+
- Firefox

## Support <a name="support"></a>
Please send an email to **apisupport@mastercard.com** with any questions or feedback you may have.


## License <a name="license"></a>
<p>Copyright 2021 Mastercard</p>
<p>Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at:</p>
<pre><code>   http://www.apache.org/licenses/LICENSE-2.0
</code></pre>
<p>Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.</p>
