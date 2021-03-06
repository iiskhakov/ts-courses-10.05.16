type MenuItem = { title:string, items?:MenuItem[] };

function generateItemList(deep:number):MenuItem[] {
    let itemList:MenuItem[] = [];
    let itemsCount:number = Math.floor(Math.random() * 7);
    for (let i = 0; i < itemsCount; i++) {
        itemList.push(generateMenuItem(i, deep));
    }
    return itemList;
}

function generateMenuItem(num:number, deep:number):MenuItem {
    let item:MenuItem = {title: "level_" + String(deep) + "_item_" + num};
    if (deep > 0) {
        let arr = generateItemList(deep - 1);
        if (arr.length > 0)
            item.items = arr;
    }
    return item;
}

function generateMenu(itemList:MenuItem[]):string {
    let res:string = '<ul>';
    for (let item of itemList) {
        res += '<li>';
        if (Array.isArray(item.items)) {
            res += '<a class="title">' + item.title + '</a>';
            res += generateMenu(item.items);
        } else {
            res += item.title;
        }
        res += '</li>';
    }
    res += '</ul>';
    return res;
}

let navMenuList:HTMLElement = document.querySelector('.menu') as HTMLElement;
let maxDeep:number = 7;
let itemList:MenuItem[] = generateItemList(maxDeep);
console.log("itemList: ", itemList);
if (itemList.length > 0) {
    navMenuList.innerHTML = generateMenu(itemList);
    navMenuList.onclick = (e:MouseEvent) => {
        let el = e.target as HTMLElement;
        let classList = el.classList;
        if (classList.contains(`title`)) {
            let parentLi = el.parentNode as HTMLElement;
            parentLi.classList.toggle('menu-open');
        }
    }
} else {
    navMenuList.innerHTML = "The menu was generated, but the number of elements is equal to zero. Please try again.";
}
