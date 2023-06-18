#!/bin/bash

# MySQL数据库登录信息
username="zychen"
password="zychen"

# SQL文件名
sql_file="vueblog.sql"

# 导入SQL文件到MySQL数据库
mysql -u "$username" -p"$password" -e "source $sql_file"

