# 日本购物工具箱(Shopping Tool)
本仓库包含了网站[购物工具箱](http://kmt-myh.ddns.net:3001)的前端代码.
This Repo includes codes of the frontend of [Shopping-tool](http://kmt-myh.ddns.net:3001).
## v1.1.0 功能概要 Brief Introduction
1. 价格计算器目前仅支持Mercari网站,后续将持续增加其他网站. <br>Price Calculator only supports Mercari currently. We will continue to add other websites in the future.
2. 新增页面国际邮费表,用户可以快速查看、比较邮费.<br> Added Shipping Price page. Users can view and compare shipping fee quickly.
3. 使用徽章来显示当前商品的售出状态及是否包邮,用户可以一目了然物品状态. <br>In Price Calculator, we use badge to represent the status of item and if the price includes shipping fee. 
4. 新增导航栏,可以自由切换价格计算器和国际邮费表. <br>We added navigator bar, which can navigate users to Price Calcualtor page and Shipping Fee page.



***
## 本地测试 Local test
安装依赖项<br>Install dependencies
```
npm install
```
快速启动,该命令将占用Port 3000<br>Quick start, this command will use port 3000
```
npm start
```
打开浏览器, 输入网址`localhost:3000`即可访问.<br>Open your browser, input `localhost:3000` and then you can access it.

***
## 容器化部署 Containernized Deployment
打包docker image<br>Build docker image
```
docker build -t <image name>:<tag> .
```
例如<br>For example
```
docker build -t shopping-tool-frontend:v1.0.0 .
```

创建容器,此处的port指你想使用的本机端口.<br>Build container, `<Port>` means the port that you want to use on you local machine.
```
docker run -d -p <Port>:80 <image name>:<tag>
```
例如
For example
```
docker run -d -p 3001:80 shopping-tool-frontend:v1.0.0
```
打开浏览器, 输入网址`localhost:3001`即可访问.<br>Open your browser, input `localhost:3001` and then you can access it.
