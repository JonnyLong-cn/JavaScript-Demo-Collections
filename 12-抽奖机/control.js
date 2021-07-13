const start = document.getElementById('start');
const options = document.getElementsByClassName('option');

let timer = null;
const train = [0, 1, 2, 4, 7, 6, 5, 3];
start.onclick = () => {
    let num = 0;
    let lastPos = 0;
    if (timer === null) {
        // 随机数范围是10~50
        const endNum = Math.floor(Math.random() * (10 - 5) + 5);
        timer = setInterval(() => {
            const pos = train[num % 8];
            num++;
            options[lastPos].style.backgroundColor = "";
            options[pos].style.backgroundColor = "lightblue";
            if (num >= endNum) {
                clearInterval(timer);
                start.innerText = "重新刷新";
            }
            lastPos = pos;
        }, 100);
    } else {
        timer = null;
        start.innerText = "开始抽奖";
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = "white";
        }
    }
}