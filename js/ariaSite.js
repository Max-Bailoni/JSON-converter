const siteDropdownBtn = document.getElementById('siteNameDropdown');
const siteListbox = document.getElementById('siteNameList');
const siteOptions = Array.from(siteListbox.querySelectorAll('[role="option"]'));
const siteHiddenInput = document.getElementById('siteNameInput');

let siteOpen = false;
let siteActiveIndex = -1;

function openSiteDropdown(startIndex = 0) {
    siteOpen = true;
    siteListbox.style.display = 'block';
    siteDropdownBtn.setAttribute('aria-expanded', true);
    siteActiveIndex = startIndex;
    setSiteActiveOption();
}

function closeSiteDropdown() {
    siteOpen = false;
    siteListbox.style.display = 'none';
    siteDropdownBtn.setAttribute('aria-expanded', 'false');
    siteDropdownBtn.removeAttribute('aria-activedescendant');
}

siteDropdownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (siteOpen) {
        closeSiteDropdown();
    } else {
        openSiteDropdown(0);
    }
});

siteDropdownBtn.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !siteOpen) {
        e.preventDefault();
        openSiteDropdown(0);
    } else if ((e.key === 'ArrowDown' || e.key === 'Down') && !siteOpen) {
        e.preventDefault();
        openSiteDropdown(0);
    } else if ((e.key === 'ArrowUp' || e.key === 'Up') && !siteOpen) {
        e.preventDefault();
       openSiteDropdown(siteOptions.length-1);
    } else if (siteOpen && (e.key === 'ArrowDown' || e.key === 'Down')) {
        e.preventDefault();
        siteActiveIndex = (siteActiveIndex+1) % siteOptions.length;
        setSiteActiveOption();
    } else if (siteOpen && (e.key === 'ArrowUp' || e.key === 'Up')) {
        e.preventDefault();
        siteActiveIndex = (siteActiveIndex-1+siteOptions.length) % siteOptions.length;
        setSiteActiveOption();
    } else if (siteOpen && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        selectSiteOption();
    } else if (siteOpen && e.key === 'Escape') {
        e.preventDefault();
        closeSiteDropdown();
    }
});

siteOptions.forEach((option, index) => {
    option.addEventListener('mousedown', (e) => {
        e.preventDefault();
        siteActiveIndex = index;
        selectSiteOption();
    });
});

function setSiteActiveOption() {
    siteOptions.forEach((option, index) => {
        option.setAttribute('aria-selected', index === siteActiveIndex ? 'true' : 'false');
    });
    const activeOption = siteOptions[siteActiveIndex];
    if(activeOption) {
        siteDropdownBtn.setAttribute('aria-activedescendant', activeOption.id);
    }
}

function selectSiteOption() {
    const selected = siteOptions[siteActiveIndex];
    if (selected) {
        siteHiddenInput.value = selected.textContent.trim();
        siteDropdownBtn.textContent = selected.textContent.trim();
    }
    closeSiteDropdown();
}
