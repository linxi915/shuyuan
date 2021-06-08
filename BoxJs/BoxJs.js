安装

surge
#安装路径：首页 > 模块 > 安装新模块
# BoxJs 稳定版https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.surge.sgmodule
# BoxJs测试版https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.surge.tf.sgmodule

quantumult x
2021.3.25 发现通过 Rewrite 的方式访问 BoxJs 会导致无法删除备份, 建议改用 HTTP Backend 
HTTP Backend 需要通过 IP+端口 的形式访问，如果你觉得这样不够优雅，可参考 `Rewrite + HTTP Backend (进阶)` 实现域名访问
