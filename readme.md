# readme

克隆以后

## 前端

```shell
npm install
```

```sh
npm run dev
```

可能会报错 ，这是因为版本问题，需要使用 Node.js 14 版本。

## 数据库

![截屏2023-06-18 11.28.09](http://cdn.zhengyanchen.cn/img202306181128516.png)

在后端的resources目录下，打开import_sql.sh

```sh
#!/bin/bash

# MySQL数据库登录信息
username="zychen"
password="zychen"

# SQL文件名
sql_file="vueblog.sql"

# 导入SQL文件到MySQL数据库
mysql -u "$username" -p"$password" -e "source $sql_file"
```

修改成自己的数据库名字和密码，然后运行import_sql.sh，即可注入数据库