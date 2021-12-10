## 基本术语
display: flex 属性 形成 flex container，直接子元素就此成为 flex items，如下图：

![20200613211743]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613211743.png)

区分主轴和交叉轴的概念，当direction改变后，主轴和交叉轴随之改变。

![20200613211759]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613211759.png)

## 属性

### flex container

dispaly:定义一个 flex container **取值：flex || inline-flex**

flex-direction:设置主轴的方向，控制 flex items 的方向  **取值：row, row-reverse,  column, column-reverse 默认值row**

flex-wrap：设置 flex items 是否需要换行（当一行显示不下的时候）**取值：wrap, no-wrap, wrap-reverse  默认值no-wrap**

 justify-content：定义 flex items 在主轴上的分布方式 **取值：flex-start, flex-end, center, space-around, space-between 默认值为flex-start**

> space-around:多余空间在flex items之间平分 space-between：多余的空间平均分配到每个items的左右（理解成左右margin）

align-items: 定义 flex items 在交叉轴上的对齐方式 **取值：flex-start, flex-end, center, baseline stretch 默认值为stretch**

> baseline是基于文字高度；stretch是拉伸到交叉轴高度

align-content:用来定义 flex item 多行显示时，在交叉轴上的分布方式。 其取值和 align-items 相同；

> 注意 strech的拉伸标准是交叉轴上剩余空间的分配

### flex item属性

align-self:改变单个flex item 的交叉轴对齐方式，默认是继承flex container的 align-items属性

 order：定义排列顺序，类比定位属性中的z-index

 flex-grow：用于分配剩余空间的比例

![20200613211951]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613211951.png)

flex-shrink: 空间不足时如何缩放。只要空间不够时，会默认进行缩放 flex-shrink = 1 查看控制台

![20200613212001]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200613212001.png)

因此计算公式为：

实际宽度 = 初始宽度 - 分配的缩放空间

分配的缩放空间 =  (（all  flex item - flex container）  / shrink 总量 ) * 系数

flex-basis：权重高的width属性,用于标识主轴方向上的大小。

### flex 可选值
**单值语法**: 值必须为以下其中之一:
* 一个无单位数( [number](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) ): 它会被当作 [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 的值。
* 一个有效的宽度( [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) )值: 它会被当作  [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 的值。
* 关键字 [none](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex$edit#none) ，auto或initial.

**双值语法**: 第一个值必须为一个无单位数，并且它会被当作  [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)  的值。第二个值必须为以下之一：
* 一个无单位数：它会被当作  [flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)  的值。
* 一个有效的宽度值: 它会被当作  [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)  的值。

**三值语法:**
* 第一个值必须为一个无单位数，并且它会被当作  [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)  的值。
* 第二个值必须为一个无单位数，并且它会被当作   [flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)  的值。
* 第三个值必须为一个有效的宽度值， 并且它会被当作  [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)  的值。
