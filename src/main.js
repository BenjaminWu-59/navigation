const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')  //得到之前保存的字符串
const xObject = JSON.parse(x)//将保存的字符串变成对
const hashMap = xObject || [ //xObeject有被储存就执行，没有储存就直接按模组渲染
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'B', url: 'http://www.bilibili.com' }
];
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')//删除 / 开头的内容
}//优化url，使其只显示xxx.com

const render = () => { //渲染一回
  $siteList.find('li:not(.last)').remove()//这一步，将除了last的其他li都删掉了
  hashMap.forEach((node,index) => {
    console.log(index)//拿到节点索引
    const $li = $(`<li>
     <div class="site">
         <div class="logo">${node.logo[0]}</div>
         <div class="link">${simplifyUrl(node.url)}</div>
         <div class="close">
            <svg class="icon">
               <use xlink:href="#icon-close"></use>
            </svg>
         </div>
     </div>   
 </li>`).insertBefore($lastLi)//利用JS在siteList下创建一个hashMap模板，此模板可以在后台创建数组中的属性。此处为渲染。
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡,点击x不再相当于点击整个<li>了 
      hashMap.splice(index, 1)//点击后按所点次序删除一个
      render() //再次渲染
    })///实现：点击close后，不再跳转了
  })
}

render()//调用一下

$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你到添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }    // .on里面是为了让增加页面的提示自动为用户加上‘https://’
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),//新增项的logo为首字母大写
      url: url
    })
    // hashMap.push是为了将用户新加入的url引入<li>模板  
    render()
  })

//到这一步，你点击新增网页输入网址以后，新增的网站就会增加出来了（其样式与acfun相同）

  window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap) //这一步是因为localStorage只能存字符串
  localStorage.setItem('x', string)
} //这是为了打开新网页后，返回时，我们刚刚创建的网页标签还存在，将其模板信息储存起来，返回后继续调用


$(document).on('keypress',(e) => {
  console.log(e)
})