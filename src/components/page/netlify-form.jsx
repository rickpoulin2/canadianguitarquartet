import React, { useEffect, useCallback, useRef } from 'react'
import ReactDOMServer from 'react-dom/server';
import RichText from './richtext'
import Recaptcha from 'react-recaptcha';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

const NetlifyForm = ({ name, submitRef, successHeading, successContent, errorHeading, errorContent, modSubmitData, children }) => {
  const successHead = successHeading == null || successHeading === "" ? "" : `<h4 class="alert-heading">${successHeading}</h4>`
  const errorHead = errorHeading == null || errorHeading === "" ? "" : `<h4 class="alert-heading">${errorHeading}</h4>`
  const successBody = ReactDOMServer.renderToStaticMarkup(<RichText data={successContent} />)
  const errorBody = ReactDOMServer.renderToStaticMarkup(<RichText data={errorContent} />)
  const captcha = <Recaptcha sitekey={RECAPTCHA_KEY} render="explicit" onloadCallback={callback} />
  const thisForm = useRef();
  const origSubmitText = useRef('');

  const updateDropdownValidity = useCallback((e) => {
    if (e.value == null || e.value === "") {
      e.setCustomValidity("required field");
    } else {
      e.setCustomValidity("")
    }
  }, [])

  const handleSelectChange = useCallback((e) => {
    updateDropdownValidity(e.target);
  }, [updateDropdownValidity])

  useEffect(() => {
    if (submitRef && submitRef.current) {
      submitRef.current.onclick = () => thisForm.current.requestSubmit()
      origSubmitText.current = submitRef.current.innerHTML
    }
    thisForm.current.querySelectorAll('select[required]').forEach(e => e.onchange = handleSelectChange)
  }, [submitRef, handleSelectChange]);

  function callback() {
    console.log("captcha ready");
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    form.querySelectorAll('select[required]').forEach(e => updateDropdownValidity(e));
    updateCaptchaValidity();
    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (!isValid) {
      return false;
    }

    console.log(submitRef.current, submitRef.current.innerHTML);
    updateResult(form);
    const formData = new FormData(form);
    if (modSubmitData != null && typeof (modSubmitData) === 'function') {
      modSubmitData(formData)
    }
    formData.append("form-name", form.getAttribute("name"));

    fetch(form.action ? form.action : window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then((r) => {
        if (r == null || !r.ok || r.status !== 200) {
          setTimeout(updateResult, 500, form, false, `Request failed: ${r.status}`);
          console.error(r);
          return;
        }
        setTimeout(updateResult, 500, form, true);
      })
      .catch(error => {
        setTimeout(updateResult, 500, form, false, `Failed: ${error}`);
      });
  }

  function updateCaptchaValidity() {
    const captchaField = document.querySelector('#g-recaptcha > div');
    captchaField.classList.add('form-control');
    const captchaResponse = document.querySelector('[name="g-recaptcha-response"]');
    if (captchaResponse.value == null || captchaResponse.value === "") {
      captchaResponse.setCustomValidity("required field");
      captchaField.classList.remove("is-valid");
      captchaField.classList.add("is-invalid");
    } else {
      captchaResponse.setCustomValidity("");
      captchaField.classList.remove("is-invalid");
      captchaField.classList.add("is-valid");
    }
  }

  function updateResult(form, isSuccess, errorMsg) {
    const resultDiv = form.parentElement.querySelector(".result");
    const submitBtn = submitRef && submitRef.current ? submitRef.current : null;

    if (isSuccess == null) {
      resultDiv.innerHTML = '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span> <span role='status'>Sending...</span>";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.innerHTML = origSubmitText.current;
      submitBtn.disabled = false;
    }
    const clz = isSuccess ? "success" : "danger";
    const heading = isSuccess ? successHead : errorHead;
    const text = isSuccess ? successBody : errorBody;
    resultDiv.innerHTML = `<div class="alert alert-${clz}" role="alert">${heading}${text}</div>`;
    if (isSuccess) {
      form.classList.add("visually-hidden");
      submitBtn.classList.add("visually-hidden");
    }
    if (errorMsg) {
      console.error(errorMsg);
    }
  }

  return (
    <>
      <form name={name} ref={thisForm} data-netlify="true" onSubmit={handleSubmit} noValidate netlify-honeypot="winnie" data-netlify-recaptcha="true">
        <div style={{ display: "none" }}>
          <label htmlFor="winnie">Skip this field if you're human</label>
          <input id="winnie" name="winnie" type="text" />
        </div>
        {children}
        {captcha}
      </form>
      <div className="result"></div>
    </>
  )
}

export default NetlifyForm