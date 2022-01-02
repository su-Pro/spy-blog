class MyStack:
    def __init__(self):
        self.items = []

    def is_empty(self) -> bool:
        return len(self.items) == 0

    # def push(self, item):
    #     self.items.append(item)

    def push(self, item):
        self.items.insert(0, item)

    # def pop(self):
    #     return self.items.pop()

    def pop(self):
        return self.items.pop(0)

    # 如何使用切片和解构返回顶部元素呢？
    def peek(self):
        return self.items[len(self.items) - 1]

    def size(self):
        return len(self.items)


stack = MyStack()

stack.push('1')
print(stack.size())
