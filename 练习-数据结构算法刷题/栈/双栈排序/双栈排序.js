function stackSort(arr) {
  var target = arr;
  var temp = [];
  var min = Number.MIN_VALUE;
  // 将target中的元素倒手到temp中，找到当前最小值。
  while (target.length) {
    var temp1 = target.pop();
    min = temp1 < min ? temp1 : min;
    temp.push(temp1);
  }
  // 目标，留住最小值，将temp中剩余的元素倒手回target。
  while (temp.legnth) {
    var temp2 = temp.pop();
    if (temp2 != min) {
      target.push(temp2);
    }
  }
  temp.push(min);

}
/*
	这样只能做一次，...怎么办...当前over了
	下次再来吧~

*/