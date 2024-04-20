/** @gqlType */
type Accounts = {
/** @gqlField */
userId: string;
/** @gqlField */
type: string;
/** @gqlField */
provider: string;
/** @gqlField */
providerAccountId: string;
/** @gqlField */
refresh_token?: string;
/** @gqlField */
access_token?: string;
/** @gqlField */
expires_at?: number;
/** @gqlField */
token_type?: string;
/** @gqlField */
scope?: string;
/** @gqlField */
id_token?: string;
/** @gqlField */
session_state?: string;
}

