const express = require('express');
const path = require('path');
const Mustache = require('mustache');
const fs = require('fs');
const app = express();
const port = process.env.port || 3000;
const config = require('./config');
const { version } = require('./package.json')

const loadTemplate = ({ template, baseDir = './', extension = '.mustache' }) => {
  return fs.readFileSync(`${path.join(baseDir, template)}${extension}`).toString();
};

app.get('/', (req, res) => {
  const template = loadTemplate({ template: 'index' });
  const templateLinks = Object.keys(config).map(templateId => ({
    templateId,
    URL: `/template/${templateId}`
  }));

  const data = {
    pageTitle: `Mustache Dev Server v${version}`,
    title: 'Welcome to Mustache Dev Server!',
    sectionTitle: 'Configured Templates:',
    templateLinks
  };
  res.send(Mustache.render(
    template,
    data
  ));
});

app.get('/template/:templateId', (req, res) => {
  const { templateId } = req.params;
  const templateConfig = config[templateId];
  if (!templateConfig) {
    res.sendStatus(404);
    return;    
  }

  const template = loadTemplate({
    template: templateId,
    ...templateConfig
  });

  const partials = {};
  (templateConfig.partials || []).forEach(partial => {
    const partialConfig = (typeof partial === 'string') ? { template: partial } : partial;
    if (!partialConfig.baseDir) {
      partialConfig.baseDir = templateConfig.baseDir;
    }
    partials[partialConfig.template] = loadTemplate(partialConfig);
  });

  const html = Mustache.render(
    template,
    templateConfig.data,
    partials
  );

  res.send(html);
});

app.listen(port, () => console.log(`Mustache dev server listening at http://localhost:${port}`));