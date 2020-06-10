## 那你知道选择性重传算法(SACK)吗?

### “保守乐观”

当发生丢包后，可以选择保守乐观态度，认为只丢失一个报文段，后续的报文没有丢失。如下所示这种情况，只会将报文3进行重传，看似比较合理，但也存在**累积确认 Sequence 序号的问题**,Client 无法告知收到了 Part4。

![20200610130306]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200610130306.png)


### “积极悲观”

积极悲观指的是会重传所有从丢失报文段往后的字段，很明显会浪费带宽，大量丢包场景下效率极低。如下图所示：

![20200610130521]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200610130521.png)

### TCP Selective Acknowledgment

可以在报文中通过设置支持SACK字段，打开选择重传。
![20200610130616]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200610130616.png)


这样发送端就清楚知道只用重传 3 号数据包就可以了，数据包 4已经确认无误被对端收到。这种方式被称为 SACK（Selective Acknowledgment）。

![20200610132935]( https://supyyy-1259673491.cos.ap-beijing.myqcloud.com/2020/pictures20200610132935.png)