const router = require('koa-router')()

const path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, '../../src/index.template.html'), 'utf-8')

router.prefix('/*')

let distPath = '../public/dist'

const renderer = createBundleRenderer(require(`${distPath}/vue-ssr-server-bundle.json`), {
  runInNewContext: false,
  template: templateHtml,
  clientManifest: require(`${distPath}/vue-ssr-client-manifest.json`)
})

router.get('/', async (ctx, next) => {
  const context = { title:'123test',url: ctx.req.url, pageTitle: 'default-title' }


  // 注意这里也必须返回promise
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, function (err, html) {
      if (err) {
        next();
      }
      ctx.status = 200
      ctx.type = 'text/html; charset=utf-8'
      ctx.body = html
      resolve(html)
    })
  })
})


module.exports = router
