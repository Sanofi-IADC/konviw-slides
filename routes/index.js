const handleResponseOfCustomMacro = (req, res, addon, { view, slideScope }) => {
  const pageId = req.query['pageId'],
    pageVersion = req.query['pageVersion'],
    macroId = req.query['macroId'],
    slideId = req.query['slideId']

  const clientKey = req.context.clientKey
  const httpClient = addon.httpClient({
    clientKey: clientKey,
  })

  httpClient.get(
    '/rest/api/content/' +
      pageId +
      '/history/' +
      pageVersion +
      '/macro/id/' +
      macroId,
    function (err, response, contents) {
      if (err || response.statusCode < 200 || response.statusCode > 299) {
        console.log(err)
        res.render(
          '<strong>An error has occurred : ' +
            response.statusCode +
            '</strong>'
        )
      }
      contents = JSON.parse(contents)

      let responseData = {
        body: contents.body,
        parameters_object: contents.parameters,
        parameters_string: JSON.stringify(contents.parameters),
      }

      if (slideScope) {
        responseData = { ...responseData, slideId }
      }

      res.render(view, responseData)
    }
  )
}

export default function routes(app, addon) {
  app.get('/', (req, res) => {
    res.send({
      port: 'test',
      test: 'test2'
    })
    // require('../atlassian-connect.json')
  })

  app.get('/slide', addon.authenticate(),function (req, res) {
    handleResponseOfCustomMacro(req, res, addon, { view: 'slide', slideScope: true })
  })

  app.get('/slideSettings', addon.authenticate(), function (req, res) {
    handleResponseOfCustomMacro(req, res, addon, { view: 'slideSettings', slideScope: false })
  })
}
