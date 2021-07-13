const ul1 = document.getElementById('ul1');
// ajax获取json数据并放入到DOM中
let xml = new XMLHttpRequest();
xml.open('get', './nav.json', true);
xml.onreadystatechange = () => {
    if (xml.status === 200 && xml.readyState === 4) {
        let data = JSON.parse(xml.responseText).data;
        let li1 = '';
        data.forEach(fir => {
            let li2 = '';
            fir.content.forEach(sec => {
                let li3 = '';
                sec.content.forEach(thi => {
                    li3 += `<li class="li3">
                            <a href="##">${thi}</a>
                        </li>
                        `
                });
                li2 += `<li class="li2">
                            <a href="##">${sec.title}</a>
                            <ul class="ul3">
                                ${li3}
                            </ul>
                        </li>
                        `
            });
            li1 += `<li class="li1">
                            <a href="##">${fir.title}</a>
                            <ul class="ul2">
                                ${li2}
                            </ul>
                        </li>
                        `
        });
        // 插入到DOM树中
        ul1.innerHTML = li1;
        // 显示和隐藏功能
        const one = document.getElementsByClassName('li1');
        const ul2 = document.getElementsByClassName('ul2');
        const two = document.getElementsByClassName('li2');
        const ul3 = document.getElementsByClassName('ul3');
        showAndHidden(one,ul2);
        showAndHidden(two,ul3);
    }
}
xml.send();

/**
 * @param {Array} lis li节点构成的集合
 * @param {Array} uls ul节点构成的集合
 */
function showAndHidden(lis, uls) {
    for (let i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseover = (e) => {
            /*
            e.target指向当前指向的节点
            e.currentTarget指向当前的最父亲节点
            */
            const t = e.currentTarget;
            uls[t.index].style.display = 'block';
        }
        lis[i].onmouseout = (e) => {
            const t = e.currentTarget;
            uls[t.index].style.display = 'none';
        }
    }
}
