window.onload = function () {
    let timer = setInterval(get_next, 3000);
    // sz中保存的是cur_li
    let sz = new Array();
    // szdiv中保存的是button_div
    let szdiv = new Array();
    var cur_ul = document.getElementById("banner");
    for (let i = 1; i <= 5; i++) {
        var cur_li = document.createElement("li");
        var cur_img = document.createElement("img");
        // 得到当前图片，并设置为400px*200px
        cur_img.src = "images/" + i + ".jpg";
        cur_img.style.width = "400px";
        cur_img.style.height = "250px";
        cur_li.appendChild(cur_img);

        // 对每个li标签，移入时候清除定时器，移除时设置定时器来获取下一个
        cur_li.onmouseenter = () => {
            clearInterval(timer);
        }
        cur_li.onmouseleave = () => {
            timer = setInterval(get_next, 3000)
        }

        if (i != 5) {
            cur_li.id = 5 - i;
        } else {
            cur_li.id = 5;
        }
        // 将当前li添加到ul中
        cur_ul.appendChild(cur_li);
        sz.push(cur_li);
        sz[sz.length - 1].style.left = "0px";
        // 创建底部的div
        let bottom_div = document.createElement("div");
        bottom_div.style.left = 125 * i + "px";
        bottom_div.name = i;
        // 将底部的button_div装入到数组中
        szdiv.push(bottom_div);
        // 为当前ul添加bottom_div
        cur_ul.appendChild(bottom_div);
    }
    // 创建preImg
    let pre_img = document.createElement("img")
    pre_img.src = "./images/preImg.png";
    pre_img.style.position = "absolute";
    pre_img.style.left = 0;
    pre_img.style.top = 0;
    pre_img.style.bottom = 0;
    pre_img.style.margin = "auto"
    pre_img.style.zIndex = 100;
    cur_ul.appendChild(pre_img);
    // 创建nexImg
    let nex_img = document.createElement("img")
    nex_img.src = "images/nexImg.png";
    nex_img.style.position = "absolute";
    nex_img.style.right = 0;
    nex_img.style.top = 0;
    nex_img.style.bottom = 0;
    nex_img.style.margin = "auto"
    nex_img.style.zIndex = 100;
    cur_ul.appendChild(nex_img);

    // 小图标点击事件，清除定时器，获取前一个，并重新设置定时器
    pre_img.onclick = function () {
        clearInterval(timer);
        get_pre();
        timer = setInterval(get_next, 3000);
    }
    nex_img.onclick = function () {
        clearInterval(timer);
        get_next();
        timer = setInterval(get_next, 3000);
    }
    
    let len = sz.length - 1;
    // 将左边图片不左移
    sz[len - 2].style.left = "0px";
    // 修改居中的图片
    // 将该图片放到最上面
    sz[len - 1].style.zIndex = 100;
    // 将边界左移该图片宽度的一半
    sz[len - 1].style.left = "200px";
    // 放大到原先的1.3倍
    sz[len - 1].style.transform = "scale(1.3)";
    // 将右边图片左移该图片宽度
    sz[len].style.left = "400px";
    // 给当前底部按钮变色
    szdiv[0].style.background = "#e431fc";

    // 为每个底部按钮添加鼠标移入事件
    for (let i = 0; i < szdiv.length; i++) {
        szdiv[i].onmouseenter = function () {
            clearInterval(timer);
            let len1 = sz[len - 1].id;
            let len2 = szdiv[i].name;
            let dis = Math.max(len1, len2) - Math.min(len1, len2);
            if (len1 > len2) {
                while (dis--) {
                    get_pre();
                }
            } else {
                while (dis--) {
                    get_next();
                }
            }
            timer = setInterval(get_next, 3000);
        }
    }

    /**
     * 获取前一个
     */
    function get_pre() {
        // 将队首元素放到队尾
        let give_up = sz[0];
        sz.shift();
        sz.push(give_up);
        // 先将所有的图片尺寸大小和优先级复原
        for (let i = 0; i < sz.length; i++) {
            sz[i].style.zIndex = i;
            sz[i].style.transform = "scale(1)";
        }
        // 然后设置前一个图片的相关属性
        sz[len - 2].style.left = "0px";
        sz[len - 1].style.zIndex = 100
        sz[len - 1].style.left = "200px";
        sz[len - 1].style.transform = "scale(1.3)"
        sz[len - 1].style.opacity = 1;
        sz[len].style.left = "400px";
        sync_szdiv();

    }

    /**
     * 获取后一个图片
     */
    function get_next() {
        // 将队末元素放到队头
        let give_up = sz[len];
        sz.pop();
        sz.unshift(give_up);
        // 先将所有的图片尺寸大小和优先级复原
        for (let i = 0; i < sz.length; i++) {
            sz[i].style.zIndex = i;
            sz[i].style.transform = "scale(1)"

        }
        sz[len - 2].style.left = "0px";
        sz[len - 1].style.zIndex = 100;
        sz[len - 1].style.left = "200px";
        sz[len - 1].style.transform = "scale(1.3)";
        sz[len - 1].style.opacity = 1;
        sz[len].style.left = "400px";
        sync_szdiv();
    }

    /**
     * 通过name和id判断来设置底部按钮的颜色
     * 如果相同就是#e431fc，否则是white
     */
    function sync_szdiv() {
        for (let i = 0; i < szdiv.length; i++) {
            if (szdiv[i].name == sz[len - 1].id)
                szdiv[i].style.background = "#e431fc";
            else
                szdiv[i].style.background = "white";
        }
    }
}