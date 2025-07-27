# Cloudflare Worker自动回复

本项目设置了一个Cloudflare Email Worker，使用Resend API自动回复收到的电子邮件，并将每封电子邮件的记录以JSON文件的形式存储在GitHub存储库中。

##安装程序

1. 安装Wrangler：
```bash
   使用npm安装全局的wrangler
   ```

2. 配置Wrangler：
```bash
牧者登录
   “wrangler secret put RESEND_API_KEY”的中文翻译是“牧马人秘密放入RESEND_API_KEY”
   “wrangler secret put GITHUB_TOKEN”的中文翻译是“使用wrangler工具将Github的API密钥（即GITHUB_TOKEN）放入secrets”
   ```

3. 编辑`wrangler.toml`以设置您的GitHub仓库（`GITHUB_REPO`）和分支（`GITHUB_BRANCH`）。

4.部署：
```bash
npm安装
   使用npm运行部署
   ```

## 工作原理

- 工作人员监听收到的电子邮件事件。
- 分析发送者、主题和正文。
- 通过 GitHub 内容 API，在 GitHub 存储库中的 `emails/` 目录下保存一个 JSON 文件。
- 使用Resend API发送回复。
