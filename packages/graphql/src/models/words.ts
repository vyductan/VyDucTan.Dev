import { graphql } from "..";

export const WordsQuery = graphql(`
  query WordsList(
    $offset: Int
    $limit: Int
    $orderBy: WordsOrderBy
    $where: WordsFilters
  ) {
    words(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {
      id
      word
      english
      vietnamese
      examples
      class
      ipaUk
      ipaUs
      cefrLevel
      mastery
      relatedWords
      lastLearnedAt
    }
    # words(limit: 10) {
    #   ...Word
    # }
  }
`);

export const AddWordMutation = graphql(`
  mutation UpdateWord($input: WordsInsertInput!) {
    insertIntoWordsSingle(values: $input) {
      id
    }
  }
`);
