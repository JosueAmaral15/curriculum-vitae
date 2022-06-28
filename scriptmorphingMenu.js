/*window.addEventListener('scroll', onScroll);

function onScroll(){
    showNavOnScroll();
}

function showNavOnScroll() {
    if (scrollY > 0)
        navig.classList.add('scroll');
    else   
        navig.classList.remove('scroll');
}*/

function openMenu(){
    document.body.classList.add('menu-expanded');
}

function closeMenu(){
    document.body.classList.remove('menu-expanded');
    if (toggle.checked){
        toggle.checked = false;
    }
}

function verifyCheckbox(){
    if(toggle.checked)
        document.body.classList.add('menu-expanded');
    else
        document.body.classList.remove('menu-expanded');
}

ScrollReveal({
    origin:'top',
    distance:'30px',
    duration:700,
}).reveal(`
    .header-wrapper,
    .card-wrapper,
    .card-text,
    .social-media,
    .checkbox,
    .card,
    .footer
`);