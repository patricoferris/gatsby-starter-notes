const path = require('path');
const { createFilePath, createFileNode } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const notesTemplate = path.resolve(`src/templates/notes.js`);

  return new Promise((resolve, reject) => {
    resolve(graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields{
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
    `).then(result => {
        if (result.errors) {
          console.error(results.errors);
          return reject(result.errors);
        }

        const notesTemplate = path.resolve(`./src/templates/notes.js`);
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: notesTemplate,
            context: {
              slug: node.fields.slug,
            }
          })
        })
        return
      })
    )
  });
}
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions
  // Creating a new field for the slug
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node,  getNode , basePath: 'pages'});
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}