var removeSpace = function (string) {
    var count = 0, //排除首字符的空格
        i = 0, // 慢指针
        j = 0, // 快指针
        length = string.length;
    while (1) {
        while (j < length && string[j] === " ") {
            console.log("我是连续空格")
            j++;
        }
        console.log("duan");

        if (j == length) {
            break;
        }
        if (count) {
            string[i++] = " ";
        }
        while (j < length && string[j] != " ") {
            string[i++] = string[j++];
        }
        count++;
        console.log(string);

    }
    return string.slice(0, i + 1);
}

console.log(removeSpace("  ab  cd  ef  "));



// _ _ _ ab _ _ cd _ _ e _ _ _ 