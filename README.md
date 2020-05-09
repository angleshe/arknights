# 聚光效果

### 实现原理

分离边框层,并使用 mask css 隐藏边框层,通过监听鼠标移入事件修改 mask position 值.

### 技术难点

- 圆形聚光: 通过 radial-gradient: 辐射渐变形成圆形聚光.
- div 点击没有 focus: 设置标签 tabindex 属性为 0
