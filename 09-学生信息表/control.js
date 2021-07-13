const sex = document.getElementById('sex');
const submit = document.getElementById('submit');
const input = document.getElementsByTagName('input');
const tbody = document.getElementById('tbody');
let stus = [];

submit.onclick = () => {
    let obj = {name: input[0].value, age: input[1].value, sex: sex.value, phone: input[2].value };
    stus.push(obj);
    let tr = '';
    stus.forEach((item, index) => {
        tr += `<tr class="item${index}">
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.sex}</td>
            <td>${item.phone}</td>
            <td onclick='del(${index})'>删除</td>
        </tr>`;
    });
    tbody.innerHTML = tr;
    console.log(tr);
}

function del(index) {
    // 从数组中删除
    stus.splice(index, 1);
    // 从DOM中删除
    const res = document.querySelector(".item"+index);
    res.remove();
}