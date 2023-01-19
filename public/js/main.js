let bank_obj = document.getElementsByName('bank-slct');
let img_obj = document.getElementsByName('img-slct');
for(let i = 0; i<img_obj.length; i++) {
    img_obj[i].addEventListener('click', () => {
        bank_obj[i].checked = true;
    });
};

function calc() {
    Swal.fire('test');
};