let bank_obj = document.getElementsByName('bank-slct');
let img_obj = document.getElementsByName('img-slct');
let __cur = 'kbank';
for(let i = 0; i<img_obj.length; i++) {
    img_obj[i].addEventListener('click', () => {
        bank_obj[i].checked = true;
        __cur = bank_obj[i].value;
    });
};
let info_obj = document.getElementById('info');
info_obj.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        html: `คณิตศาสตร์กับการเงินในชีวิตประจำวัน (ดอกเบี้ยทบต้น)<br>จัดทำโดย<br>นายปรมินทร์ ช่วยพิชัย<br>นางสาวกชพรรณ วงศ์น้อย<br>นางสาวภัทรนันท์ หนูแก้ว<br>ชั้นมัธยมศึกษาปีที่ 5 โรงเรียนสุราษฎร์ธานี<br><span style="font-weight:bolder;">อัตราดอกเบี้ยเป็นข้อมูลจากธนาคารแห่งประเทศไทย ณ วันที่ 4 มกราคม 2565</span>`
    });
});

let input_amount = document.getElementById('amount');
let input_time = document.getElementById('time');

function calc() {
    if(input_amount.value === "" || input_time.value === "" || __cur === "") {
        Swal.fire({
            icon: 'info',
            text: 'Please specify all of information',
        });
    } else if(isNaN(input_amount.value) == true || isNaN(input_time.value) == true || parseInt(Number(input_amount.value)) != input_amount.value || parseInt(Number(input_time.value) != input_time.value)) {
        Swal.fire({icon: 'info', text: 'All information must be an positive integer value.'});
    } else if(input_time.value > 12 || input_time.value < 1) {
        Swal.fire({icon: 'info', text: 'Time must be between 1 to 12'});
    } else {
        $.post(window.location.href, {bank: __cur, amount: input_amount.value, time: input_time.value}, (error) => {}).done((d) => {
            document.getElementById('interest_rate').value = `${d.rate}%`;
            document.getElementById('interest_received').value = `${d.interest_recieved} Baht`;
            document.getElementById('money_received').value = `${d.money_recieved} Baht`;
        });
    };
};