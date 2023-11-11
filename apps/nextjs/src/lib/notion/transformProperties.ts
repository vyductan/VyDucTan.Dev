import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type 
export const transformProperties = <TRecord extends Record<string, unknown>>(database: QueryDatabaseResponse) => {
const items: TRecord[] = []
  database.results.map(x => {
    const page = x as PageObjectResponse
    page.properties
    items.push({
      page
    })
  })

return {
items: 
}

}
