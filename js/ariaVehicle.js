const dropdownBtn = document.getElementById('vehicleStatusDropdown');
const listbox = document.getElementById('vehicleStatusList');
const options = Array.from(listbox.querySelectorAll('[role="option"]'));
const hiddenInput = document.getElementById('vehicleStatusInput');

let open = false;
let activeIndex = -1;

function openDropdown(startIndex = 0) {
    open = true;
    listbox.style.display = 'block';
    dropdownBtn.setAttribute('aria-expanded', true);
    activeIndex = startIndex;
    setActiveOption();
}

function closeDropdown() {
    open = false;
    listbox.style.display = 'none';
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownBtn.removeAttribute('aria-activedescendant');
}

dropdownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (open) {
        closeDropdown();
    } else {
        openDropdown(0);
    }
});

dropdownBtn.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !open) {
        e.preventDefault();
        openDropdown(0);
    } else if ((e.key === 'ArrowDown' || e.key === 'Down') && !open) {
        e.preventDefault();
        openDropdown(0);
    } else if ((e.key === 'ArrowUp' || e.key === 'Up') && !open) {
        e.preventDefault();
       openDropdown(options.length-1);
    } else if (open && (e.key === 'ArrowDown' || e.key === 'Down')) {
        e.preventDefault();
        activeIndex = (activeIndex+1) % options.length;
        setActiveOption();
    } else if (open && (e.key === 'ArrowUp' || e.key === 'Up')) {
        e.preventDefault();
        activeIndex = (activeIndex-1+options.length) % options.length;
        setActiveOption();
    } else if (open && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        selectOption();
    } else if (open && e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
    }
});

options.forEach((option, index) => {
    option.addEventListener('mousedown', (e) => {
        e.preventDefault();
        activeIndex = index;
        selectOption();
    });
});

function setActiveOption() {
    options.forEach((option, index) => {
        option.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
    });
    const activeOption = options[activeIndex];
    if(activeOption) {
        dropdownBtn.setAttribute('aria-activedescendant', activeOption.id);
    }
}

function selectOption() {
    const selected = options[activeIndex];
    if (selected) {
        hiddenInput.value = selected.textContent.trim();
        dropdownBtn.textContent = selected.textContent.trim();
    }
    closeDropdown();
}