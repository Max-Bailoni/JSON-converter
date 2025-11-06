const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    form.querySelectorAll('.error-message').forEach(el => el.remove());

    let valid = true;

    const id = form.elements['id'].value.trim();
    const vin = form.elements['vin'].value.trim().toUpperCase();
    const brand = form.elements['brand'].value.trim();
    const model = form.elements['model'].value.trim();
    const dateRegistration = form.elements['dateRegistration'].value;
    const vehicleStatus = form.elements['vehicleStatus'].value;
    const next57a = form.elements['next57a'].value;
    const siteName = form.elements['siteName'].value;

    function showError(inputName, message) {
        const input = form.elements[inputName];
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '0.95em';
        error.textContent = message;
        input.insertAdjacentElement('afterend', error);
    }

    if(!id || isNaN(id)){
        valid = false;
        showError("id", "Please enter a valid number.")
    }
    
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if(!vinRegex.test(vin)){
        valid = false;
        showError("vin", "Please enter a valid VIN (Only letters, numbers - excluding I, O, Q!");
    }

    if(!brand) {
        valid = false;
        showError("brand", "Brand is required!");
    }

    if(!model) {
        valid = false;
        showError("model", "Model is required!");
    }

    if(!dateRegistration) {
        valid = false;
        showError("dateRegistration", "First registration date is required!");
    }

    if(!vehicleStatus) {
        valid = false;
        showError("vehicleStatus", "Vehicle Status must be selected!");
    }

    if(!next57a) {
        valid = false;
        showError("next57a", "Next 57a date is required!");
    }

    if(!siteName) {
        valid = false;
        showError("siteName", "Site name must be selected!");
    }

    if(!valid) {
        return;
    }

    const formData = {};
    const data = new FormData(form);

    data.forEach((value, key) => {
        formData[key] = value;
    });

    const jsonOutput = JSON.stringify(formData, null, 2);

    let jsonContainer = document.getElementById('jsonOutput');
    if(!jsonContainer) {
        jsonContainer = document.createElement('pre');
        jsonContainer.id = 'jsonOutput';
        jsonContainer.style.marginTop = '1rem';
        form.parentNode.appendChild(jsonContainer);
    }

    jsonContainer.textContent = jsonOutput;
})

document.querySelectorAll('#vehicleStatusDropdown + .dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const value = this.getAttribute('data-value');
        const dropdownButton = document.getElementById('vehicleStatusDropdown');
        const hiddenInput = document.getElementById('vehicleStatusInput');

        dropdownButton.textContent = value;
        hiddenInput.value = value;
    });
});

document.querySelectorAll('#siteNameDropdown + .dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const value = this.getAttribute('data-value');
        const dropdownButton = document.getElementById('siteNameDropdown');
        const hiddenInput = document.getElementById('siteNameInput');

        dropdownButton.textContent = value;
        hiddenInput.value = value;
    });
});


const dropdownBtn1 = document.getElementById('vehicleStatusDropdown');
dropdownBtn1.addEventListener('click', () => {
    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn1.setAttribute('aria-expanded', String(!expanded));
});

const dropdownBtn2 = document.getElementById('siteNameDropdown');
dropdownBtn2.addEventListener('click', () => {
    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn2.setAttribute('aria-expanded', String(!expanded));
});