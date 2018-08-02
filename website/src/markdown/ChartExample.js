import React from "react";

export default class ChartExample extends React.Component {
  createMarkup() {
    const md = require("markdown-it")();
    const vis = require("../markdown/plugin");
    const d3 = require("d3");

    const htmlCode = md.use(vis).render(markdownContent, { d3 });
    return { __html: htmlCode };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

const markdownContent = `
# Hello World

I'm **testing**!

## Test

\`\`\`js
console.log('language javascript')
\`\`\`

\`\`\`vis
layout: bar
data: [
  { key: 0, value: 5 },
  { key: 1, value: 4 },
  { key: 2, value: 7 },
  { key: 3, value: 2 },
  { key: 4, value: 4 },
  { key: 5, value: 8 },
  { key: 6, value: 3 },
  { key: 7, value: 6 }
]
\`\`\`
`;
