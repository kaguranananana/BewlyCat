# BewlyCat No Feed 维护说明

本仓库是 BewlyCat 的长期自用 Fork。No Feed 改动只放在 `nofeed` 分支，`main` 用来跟随官方版本。

## 远程仓库与分支

- 官方上游：`https://github.com/keleus/BewlyCat.git`
- `origin`：个人 Fork，用于保存 `main` 和 `nofeed`
- `upstream`：官方 BewlyCat，只用于获取官方更新
- `main`：与 `upstream/main` 保持一致，不加入 No Feed 修改
- `nofeed`：在 `main` 之上维护 No Feed 设置和行为

可用下面的命令确认远程仓库：

```bash
git remote -v
```

## 同步官方更新

先让本地及 Fork 的 `main` 精确跟随官方，再把 No Feed 提交重放到新版本上：

```bash
git fetch upstream

git checkout main
git reset --hard upstream/main
git push origin main --force-with-lease

git checkout nofeed
git rebase main
git push origin nofeed --force-with-lease
```

`reset --hard` 只用于没有自定义提交的 `main`。执行前应确认工作区没有需要保留的未提交修改；个人配置备份由 `.gitignore` 排除，不应加入提交。

## 冲突处理原则

如果 rebase 出现冲突，优先保留新的 upstream 实现，再把小范围的 No Feed 条件重新叠加到新调用链。不要为了保留旧补丁而回退官方代码，也不要把推荐列表改成只靠 CSS 隐藏。

解决每个冲突后继续 rebase：

```bash
git add <已解决的文件>
git rebase --continue
```

完成后运行项目要求的 lint 和类型检查，并在真实扩展环境复验首页、搜索、视频页、动态、收藏、历史、稍后再看及配置导入。
