import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const notes = (props) => {
  const notesMarkdown = props.data.markdownRemark;
  console.log(notesMarkdown);
  const { title } = notesMarkdown.frontmatter;
  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: notesMarkdown.html}}></div>
    </Layout>
  );
}

export default notes;

export const query = graphql`
  query NotesQuery($slug: String!) {
    markdownRemark(fields: { slug: {eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
